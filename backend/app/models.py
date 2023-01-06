import mariadb
import os
from os import path
import secrets
from utils import aes_encrypt, aes_decrypt, hash_card
from http_response import *


PASS_PATH = '../../secret/database.pass'

with open(PASS_PATH, 'r') as db_pass_file:
    db_pass = db_pass_file.read()
    con = mariadb.connect(
            host = "192.168.11.1",
            user = "sirs",
            password = db_pass,
            port = 3306,
            database = "thecork",
            ssl_key='/etc/mysql/ssl/client-key.pem',
            ssl_cert='/etc/mysql/ssl/client-cert.pem',
            ssl_ca='/etc/mysql/ssl/ca-cert.pem'
            )
    
    con_external = mariadb.connect(
            host = "192.168.11.1",
            user = "sirs",
            password = db_pass,
            port = 3306,
            database = "external",
            ssl_key='/etc/mysql/ssl/client-key.pem',
            ssl_cert='/etc/mysql/ssl/client-cert.pem',
            ssl_ca='/etc/mysql/ssl/ca-cert.pem'
            )

    print("Connected to database")
    
    

def get_all_gift_cards(): 
    cur = con.cursor()
    cur.execute('select * from gift_cards')
    gift_cards = cur.fetchall()
    cur.close()
    return gift_cards


def create_gift_card(amount, email, password):
    cur = con.cursor()
    # verify if the user exists and has correct password
    data = (email, password)
    query = 'select wallet_cipher, wallet_iv from users where email = %s and password = %s'
    cur.execute(query, data)
    wallet_enc = cur.fetchall()
    if not wallet_enc:
        cur.close()
        return USER_DOES_NOT_EXIST_STATUS
    wallet = float(aes_decrypt(wallet_enc[0][0], wallet_enc[0][1]).decode())
    if wallet < amount:
        cur.close()
        return INSUFICIENT_FUNDS_STATUS
    # secrets module is more cryptographically secure than random module
    card_number = secrets.token_hex(8) 
    card_number_hash = hash_card(card_number)
    # for any _enc variable, index 0 is the cipher and index 1 is the iv
    card_number_enc = aes_encrypt(str(card_number))
    amount_enc = aes_encrypt(str(amount))
    data = (email, card_number_hash, card_number_enc[0], card_number_enc[1], amount_enc[0], amount_enc[1])
    query = 'insert into gift_cards (sender_email, card_number_hash, card_number_cipher, card_number_iv, amount_cipher, amount_iv) values(%s, %s, %s, %s, %s, %s)'
    cur.execute(query, data)
    # update the user's wallet, subtract the amount
    new_wallet = wallet - amount
    new_wallet_enc = aes_encrypt(str(new_wallet))
    data = (new_wallet_enc[0], new_wallet_enc[1], email)
    query = 'update users set wallet_cipher = %s, wallet_iv = %s where email = %s'
    cur.execute(query, data)
    con.commit()
    cur.close()
    return OK_STATUS
    
    
def redeem_gift_card(card_number, redeemer_email):
    cur = con.cursor()
    card_number_hash = hash_card(card_number)
    data = (card_number_hash,)
    query = 'select amount_cipher, amount_iv from gift_cards where card_number_hash = %s'
    cur.execute(query, data)
    amount_enc = cur.fetchall()
    # if there is no gift card with that number
    if not amount_enc:
        cur.close()
        return WRONG_CARD_NUMBER_STATUS
    amount = float(aes_decrypt(amount_enc[0][0], amount_enc[0][1]).decode())
    if amount == 0:
        return WRONG_CARD_NUMBER_STATUS
    # if there is a user with that email
    data = (redeemer_email,)
    query = 'select wallet_cipher, wallet_iv from users where email = %s'
    cur.execute(query, data)
    wallet_enc = cur.fetchall()
    if not wallet_enc:
        cur.close()
        return USER_DOES_NOT_EXIST_STATUS
    wallet = float(aes_decrypt(wallet_enc[0][0], wallet_enc[0][1]).decode())
    if not wallet_enc:
        cur.close()
        return CARD_ALREADY_REDDEMED_STATUS
    # update the user's wallet, add the amount
    new_wallet = wallet + amount
    new_wallet_enc = aes_encrypt(str(new_wallet))
    data = (new_wallet_enc[0], new_wallet_enc[1], redeemer_email)
    query = 'update users set wallet_cipher = %s, wallet_iv = %s where email = %s'
    cur.execute(query, data)
    # remove value from the gift card and set redeemer email
    new_amount = 0
    new_amount_enc = aes_encrypt(str(new_amount))
    data = (redeemer_email, new_amount_enc[0], new_amount_enc[1], card_number_hash)
    query = 'update gift_cards set redeemer_email = %s, amount_cipher = %s, amount_iv = %s where card_number_hash = %s'
    cur.execute(query, data)
    con.commit()
    cur.close()
    return OK_STATUS


def redeem_user_points(redeemed_points, email):
    cur = con.cursor()
    cur_external = con_external.cursor()
    # verify if the user exists and has correct password
    data = (email,)
    query = 'select wallet_cipher, wallet_iv from users where email = %s'
    cur.execute(query, data)
    wallet_enc = cur.fetchall()
    if not wallet_enc:
        cur.close()
        return USER_DOES_NOT_EXIST_STATUS
    wallet = float(aes_decrypt(wallet_enc[0][0], wallet_enc[0][1]).decode())    
    if not wallet_enc:
        cur.close()
        cur_external.close()
        return USER_DOES_NOT_EXIST_STATUS
    
    # verify if the user has enough points
    data = (email,)
    query = 'select points from cupons where email = %s'
    cur_external.execute(query, data)
    points = cur_external.fetchall()
    points = points[0]
    
    if not points or points[0] < redeemed_points:
        cur.close()
        cur_external.close()
        return INSUFICIENT_POINTS_STATUS

    points = int(points[0])
    new_amount = wallet + (redeemed_points / 20)
    new_amount_enc = aes_encrypt(str(new_amount))
    data = (new_amount_enc[0], new_amount_enc[1], email)
    query = 'update users set wallet_cipher = %s, wallet_iv = %s where email = %s'
    cur.execute(query, data)
    
    data = (points - redeemed_points, email)
    query = 'update cupons set points = %s where email = %s'
    cur_external.execute(query, data)
    
    con.commit()
    con_external.commit()
    cur.close()
    cur_external.close()
    return OK_STATUS
    
    
def create_user(name,email,password):
    cur = con.cursor()
    # Verify if the user already exists
    data = (email,)
    query = 'select * from users where email = %s'
    cur.execute(query, data)
    user = cur.fetchall()
    if len(user) > 0:
        cur.close()
        return USER_ALREADY_EXISTS_STATUS
    
    # Create the user
    base_amount = 200
    enc = aes_encrypt(str(base_amount))
    data = (name, email, password, enc[0], enc[1])
    query = 'insert into users (name, email, password, wallet_cipher, wallet_iv) values (%s, %s, %s, %s, %s)'
    cur.execute(query, data)
    con.commit()
    return OK_STATUS


def get_user_id(email):
    cur = con.cursor()
    data = (email,)
    query = 'select user_id from users where email = %s'
    cur.execute(query, data)
    user = cur.fetchall()
    cur.close()
    if not user:
        return USER_DOES_NOT_EXIST_STATUS
    return user[0][0]
      
      
def get_next_user_id():
    cur = con.cursor()
    query = 'select auto_increment from information_schema.tables where table_name = \'users\' and table_schema = database();'
    cur.execute(query)
    user = cur.fetchall()
    cur.close()
    if not user:
        return USER_DOES_NOT_EXIST_STATUS
    return user[0][0]
       
def get_all_users():
    cur = con.cursor()
    cur.execute('select * from users')
    users = cur.fetchall()
    cur.close()
    return users

def get_profile(email, password):
    cur = con.cursor()
    data = (email, password)
    query = 'select name, email, wallet_cipher, wallet_iv from users where email = %s and password = %s'
    cur.execute(query, data)
    # user_raw is a mixed of the encrypted wallet and regular fields
    user_raw = cur.fetchall()
    if not user_raw:
        cur.close()
        return WRONG_LOGIN_INFO_STATUS
    
    user = [user_raw[0][0], user_raw[0][1]]
    wallet_enc = [user_raw[0][2], user_raw[0][3]]
    wallet = float(aes_decrypt(wallet_enc[0], wallet_enc[1]).decode())
    user.append(wallet)

    data = (email,)
    query = 'select card_number_hash, card_number_cipher, card_number_iv, amount_cipher, amount_iv, redeemer_email from gift_cards where sender_email = %s'
    cur.execute(query, data)
    enc_sent_cards = cur.fetchall()
    sent_cards = []
    # Decrypt all of the gift card values (var named amount)
    for enc_card in enc_sent_cards:
        sent_cards.append([aes_decrypt(enc_card[1], enc_card[2]).decode(), aes_decrypt(enc_card[3], enc_card[4]).decode(), enc_card[5]])
    data = (email,)
    query = 'select card_number_hash, card_number_cipher, card_number_iv, amount_cipher, amount_iv, sender_email from gift_cards where redeemer_email = %s'
    cur.execute(query, data)
    enc_redeemed_cards = cur.fetchall()
    redeemed_cards = []
    for enc_card in enc_redeemed_cards:
        redeemed_cards.append([aes_decrypt(enc_card[1], enc_card[2]).decode(), aes_decrypt(enc_card[3], enc_card[4]).decode(), enc_card[5]])
        
    data = (email,)
    query = 'select restaurant_name, people_count, status from reservations where user_email = %s'
    cur.execute(query, data)
    reservations = cur.fetchall()
    
    cur.close()
    return [user, sent_cards, redeemed_cards, reservations]


def get_restaurant_profile(email, password):
    cur = con.cursor()
    
    data = (email, password)
    query = 'select * from restaurants where email = %s and password = %s'
    cur.execute(query, data)
    restaurant_data = cur.fetchall()
    if not restaurant_data:
        cur.close()
        return RESTAURANT_IS_NOT_RESGISTERED_STATUS
    
    restaurant = [restaurant_data[0][1], restaurant_data[0][2], restaurant_data[0][3], restaurant_data[0][4], restaurant_data[0][6], restaurant_data[0][7]]
    
    data = (email,)
    query = 'select id, user_email, people_count, status from reservations where restaurant_email = %s'
    cur.execute(query, data)
    reservations = cur.fetchall()
    cur.close()
    return [restaurant, reservations]


def change_availability(restaurant_name, availability):
    cur = con.cursor()
    data = (restaurant_name,)
    query = 'select * from restaurants where name = %s'
    cur.execute(query, data)
    restaurant = cur.fetchall()
    
    if not restaurant:
        cur = con.cursor()
        return RESTAURANT_DOES_NOT_EXIST_STATUS
    
    data = (availability, restaurant_name)
    query = 'update restaurants set availability = %s where name = %s'
    cur.execute(query, data)
    con.commit()
    cur.close()
    return OK_STATUS


def book_table(restaurant_name, user_email, people_count):
    cur = con.cursor()
    
    data = (user_email,)
    query = 'select * from users where email = %s'
    cur.execute(query, data)
    user = cur.fetchall()
    if not user:
        cur.close()
        return USER_DOES_NOT_EXIST_STATUS
    
    data = (restaurant_name,)
    query = 'select email, available_seats from restaurants where name = %s'
    cur.execute(query, data)
    restaurant_info = cur.fetchall()
    
    # Check if the restaurant exists 
    if len(restaurant_info) == 0:
        cur.close()
        return RESTAURANT_DOES_NOT_EXIST_STATUS
    
    if  restaurant_info[0][1] < int(people_count):
        cur.close()
        return RESTAURANT_IS_FULL_STATUS
    
    data = (restaurant_name, restaurant_info[0][0], user_email, people_count)
    query = 'insert into reservations (restaurant_name, restaurant_email, user_email, people_count, status) values (%s, %s, %s, %s, false)'
    cur.execute(query, data)
    
    # Update the restaurant's table count
    data = (people_count, restaurant_name)
    query = 'update restaurants set available_seats = available_seats - %s where name = %s'
    cur.execute(query, data)
    
    con.commit()
    cur.close()
    return OK_STATUS


def change_availability(restaurant_name, availability):
    cur = con.cursor()
    data = (restaurant_name,)
    query = 'select * from restaurants where name = %s'
    cur.execute(query, data)
    restaurant = cur.fetchall()
    
    if not restaurant:
        cur = con.cursor()
        return RESTAURANT_DOES_NOT_EXIST_STATUS
    
    data = (availability, restaurant_name)
    query = 'update restaurants set availability = %s where name = %s'
    cur.execute(query, data)
    con.commit()
    cur.close()
    return OK_STATUS


def update_reservation_status(reservation_id, status):
    cur = con.cursor()
    
    data = (reservation_id, )
    query = 'select * from reservations where id = %s'
    cur.execute(query, data)
    reservation = cur.fetchall()
    
    if not reservation:
        cur.close()
        return RESERVATION_DOES_NOT_EXIST_STATUS
    
    data = (status, reservation_id)
    query = 'update reservations set status = %s where id = %s'
    cur.execute(query, data)
    con.commit()
    cur.close()
    return OK_STATUS
