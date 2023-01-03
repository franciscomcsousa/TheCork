from flask import Flask, render_template, request, session, url_for, redirect
from flask_cors import CORS
from models import *
import hashlib
from utils import *

app = Flask(__name__)

CORS(app)

app.secret_key = os.urandom(32) # TODO - what is this? is it related to cookies?

@app.route('/gift_cards', methods=['GET', 'POST'])
def gift_cards():
    if request.method == 'GET':
        pass
    
    if request.method == 'POST':
        data = request.get_json()
        email = data['email']
        password = data['password']
        amount = data['amount']
        response = create_gift_card(int(amount), email, salt_password(get_user_id(email), password))
    return response


@app.route('/redeem_cards', methods=['GET', 'POST'])
def redeem_cards():
    if request.method == 'GET':
        pass
    # This section has to be protected from concurrency
    with get_lock('redeem_cards'):
        if request.method == 'POST':
            data = request.get_json()
            card_number = data['card']
            email = data['email']
            response = redeem_gift_card(card_number, email)
        return response


@app.route('/register', methods=['GET', 'POST'])
def register_user():
    if request.method == 'GET':
        pass
    
    if request.method == 'POST':
        data = request.get_json()
        name = data['name']
        email = data['email']
        password = data['password']
        # TODO - This is not protected perhaps
        response = create_user(name, email, salt_password(get_next_user_id(), password))
    return response


@app.route('/profile', methods=['GET', 'POST'])
def profile():
    if request.method == 'GET':
        pass
    
    if request.method == 'POST':
        data = request.get_json()
        email = data['email']
        password = data['password']
        info = get_profile(email, salt_password(get_user_id(email), password))
        
        user = info[0][0]
        cards = info[1]
        # TODO - maybe send differently from models.py
        # TODO - it will probbly only show 1 card even if there are more
        if user:
            if cards:
                return {"name": user[1],"email": user[2], "wallet": user[4], "cards": cards}
            return {"name": user[1],"email": user[2], "wallet": user[4]}
    return {'400': 'User or Password is incorrect'}


# @app.route('/restaurants', methods=['GET', 'POST'])
# def restaurants():
#     if request.method == 'GET':
#         pass
    
#     if request.method == 'POST':
#         data = request.get_json()
#         email = data['email']
#         password = data['password']
#         # restaurants = get_restaurants(email, salt_password(get_user_id(email), password))
#         return {"restaurants": restaurants}
#     return {'400': 'User not found'}


@app.route('/login', methods=['GET', 'POST'])
def user_login():
    if request.method == 'GET':
        pass
    
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = login(email, salt_password(get_user_id(email), password))
        if user is not None:
            session['user'] = user
            return {'200': 'User logged in'}
        else:
            return {'400': 'User or Password is incorrect'}


@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True)
