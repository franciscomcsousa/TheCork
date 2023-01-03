from flask import Flask, render_template, request, session, url_for, redirect
from flask_cors import CORS
from models import *
import hashlib
from utils import *

app = Flask(__name__)

CORS(app)

app.secret_key = os.urandom(32) # TODO - what is this? is it related to cookies?

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        pass

    if request.method == 'POST':
        name = request.form['name']
        post = request.form['post']
        create_post(name, post)

    posts = get_posts()
    return render_template('index.html', posts=posts)


@app.route('/gift_cards', methods=['GET', 'POST'])
def gift_cards():
    if request.method == 'GET':
        pass
    
    if request.method == 'POST':
        data = request.get_json()
        email = data['email']
        password = data['password']
        amount = data['amount']
        create_gift_card(int(amount), email, salt_password(get_user_id(email), password))
    return {'200': 'Created Successfully'}


@app.route('/redeem_cards', methods=['GET', 'POST'])
def redeem_cards():
    if request.method == 'GET':
        pass
    # This sections has to be protected from concurrency
    with get_lock('redeem_cards'):
        if request.method == 'POST':
            data = request.get_json()
            card_number = data['card']
            email = data['email']
            redeem_gift_card(card_number, email)
        return {'200': 'Redeemed Successfully'}


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
        create_user(name, email, salt_password(get_next_user_id(), password))
    return {'200': 'Registered Successfully'}


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
    return {'400': 'Not allowed'}


# TODO - password is hashed because its populated from the database with the hash
# password is banana
@app.route('/restaurant', methods=['GET', 'POST'])
def restaurant_profile():
    if request.method == 'GET':
        pass
        
    if request.method == 'POST':
        data = request.get_json()
        email = data['email']
        password = data['password']
        restaurant = get_restaurant_profile(email, hashlib.sha256(password.encode('ascii')).hexdigest())
        print(f"restaurant: {restaurant}")

        if restaurant:
            return {"name": restaurant[0][1],"address": restaurant[0][2],"phone": restaurant[0][3] ,"email": restaurant[0][4],"tables": restaurant[0][6], "disponibility": restaurant[0][7]}
        return {'400': 'User or Password is incorrect'}
    return {'400': 'Not allowed'}


# @app.route('/login', methods=['GET', 'POST'])
# def user_login():
#     if request.method == 'GET':
#         pass
    
#     if request.method == 'POST':
#         email = request.form.get('email')
#         password = request.form.get('password')
#         user = login(email, salt_password(get_user_id(email), password))
#         if user is not None:
#             session['user'] = user
#             return render_template('login.html', posts=user)
#     return render_template('login.html')


# @app.route('/logout')
# def logout():
#     session.pop('logged_in', None)
#     return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True)
