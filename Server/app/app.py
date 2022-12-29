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
        amount = request.form.get('amount')
        email = request.form.get('email')
        password = request.form.get('password')
        create_gift_card(int(amount), email, hashlib.sha256(password.encode()).digest())

    gift_cards = get_all_gift_cards()
    return render_template('gift_cards.html', posts=gift_cards)


@app.route('/redeem_cards', methods=['GET', 'POST'])
def redeem_cards():
    if request.method == 'GET':
        pass
    
    if request.method == 'POST':
        card_number = request.form.get('number')
        email = request.form.get('email')
        redeem_gift_card(card_number, email)

    gift_cards = get_all_gift_cards()
    return render_template('redeem_cards.html', posts=gift_cards)


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


@app.route('/login', methods=['GET', 'POST'])
def user_login():
    if request.method == 'GET':
        pass
    
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = login(email, hashlib.sha256(password.encode()).digest())
        if user is not None:
            session['user'] = user
            return render_template('login.html', posts=user)
    return render_template('login.html')


@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True)
