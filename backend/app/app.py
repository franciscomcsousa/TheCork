from flask import Flask, make_response, render_template, request, session, url_for, redirect
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
    # This section has to be protected from concurrency
    with get_lock('gift_cards'):
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
    with get_lock('gift_cards'):
        if request.method == 'POST':
            data = request.get_json()
            card_number = data['card']
            redeemer_email = data['redeemer_email']
            response = redeem_gift_card(card_number, redeemer_email)
        return response

@app.route('/redeem_points', methods=['GET', 'POST'])
def redeem_points():
    if request.method == 'GET':
        pass
    # This section has to be protected from concurrency
    with get_lock('gift_cards'):
        if request.method == 'POST':
            data = request.get_json()
            email = data['email']
            password = data['password']
            amount = data['amount']
            response = redeem_user_points(int(amount), email, salt_password(get_user_id(email), password))
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
        status = create_user(name, email, salt_password(get_next_user_id(), password))
        # TODO - also pass as param the status message :facepalm: 
        return make_response({"status":status}, status)
    return make_response({"status":'Not allowed'}, 400)


@app.route('/profile', methods=['GET', 'POST'])
def profile():
    if request.method == 'GET':
        pass
    
    if request.method == 'POST':
        data = request.get_json()
        email = data['email']
        password = data['password']
        info = get_profile(email, salt_password(get_user_id(email), password))
        
        if len(info) == 0:
            return {'400': "User and/or Password is incorrect"}
        
        user = info[0]
        sent_cards = info[1]
        redeemed_cards = info[2]
        
        return {"name": user[0],"email": user[1], "wallet": user[2], "sent_cards": (sent_cards if len(sent_cards) > 0 else []),\
             "redeemed_cards": (redeemed_cards if len(redeemed_cards) > 0 else [])}
        #if len(user) > 0:
        #if len(cards) > 0:
        #    return {"name": user[0],"email": user[1], "wallet": user[2], "sent_cards": sent_cards}
        #return {"name": user[0],"email": user[1], "wallet": user[2], "cards": []}
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
        
        if restaurant:
            return {"name": restaurant[0][1],"address": restaurant[0][2],"phone": restaurant[0][3] ,"email": restaurant[0][4],"available_seats": restaurant[0][6], "availability": restaurant[0][7]}
        return {'400': 'User or Password is incorrect'}
    return {'400': 'Not allowed'}


@app.route('/login', methods=['GET', 'POST'])
def user_login():
    if request.method == 'GET':
        pass
  
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = login(email, salt_password(get_user_id(email), password))
        if user is not None:
            return {'200': 'User successfully logged in'}
    return {'400': 'User or Password is incorrect'}


@app.route('/book', methods=['GET', 'POST'])
def book():
    if request.method == 'GET':
        pass
    
    if request.method == 'POST':
        data = request.get_json()
        restaurant_name = data['restaurant_name']
        user_email = data['user_email']
        people_count = data['people_count']
        status = book_table(restaurant_name, user_email, people_count)
        return {'200': status}
    return {'400': 'Not allowed'}





if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True)
