from flask import Flask, render_template, request, session, url_for, redirect
from flask_cors import CORS
from models import *
import hashlib

app = Flask(__name__)

CORS(app)

app.secret_key = os.urandom(32)

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
        print(f"THE AMOUNT NUMBER IS {amount}")
        create_gift_card(int(amount), email, hashlib.sha256(password.encode('ascii')).hexdigest())
    return {'200': 'Created Successfully'}


@app.route('/redeem_cards', methods=['GET', 'POST'])
def redeem_cards():
    if request.method == 'GET':
        pass
    
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
        create_user(name, email, hashlib.sha256(password.encode('ascii')).hexdigest())
    return {'200': 'Registered Successfully'}


@app.route('/login', methods=['GET', 'POST'])
def user_login():
    if request.method == 'GET':
        pass
    
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = login(email, hashlib.sha256(password.encode('ascii')).hexdigest())
        if user is not None:
            session['user'] = user
            return render_template('login.html', posts=user)
    return render_template('login.html')


@app.route('/profile', methods=['GET', 'POST'])
def profile():
    if request.method == 'GET':
        pass
    
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = get_profile(email, hashlib.sha256(password.encode('ascii')).hexdigest())
        # TODO - maybe send differently from models.py
        if user is not None:
            money = user[0][4]
            name = user[0][1]
            return {"name": name,"email": email, "wallet": money}
    
    return {'400': 'User not found'}


@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True)
