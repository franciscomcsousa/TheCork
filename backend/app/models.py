import mariadb
import os
from os import path
import secrets
from utils import aes_encrypt, aes_decrypt
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

def get_all_gift_cards():
    #con = connect() 
    cur = con.cursor()
    cur.execute('select * from gift_cards')
    gift_cards = cur.fetchall()
    cur.close()
    #con.close()
    return gift_cards


def create_gift_card(amount, email, password):
    #con = connect() 
    cur = con.cursor()
    # verify if the user exists and has correct password
    data = (email, password)
    query = 'select wallet_cipher, wallet_iv from users where email = %s and password = %s'
    cur.execute(query, data)
    wallet_enc = cur.fetchall()
    wallet = float(aes_decrypt(wallet_enc[0][0], wallet_enc[0][1]).decode())
    # TODO - is this okay?
    if not wallet_enc[0]:
        cur.close()
        #con.close()
        return {'400': 'User does not exist or password is incorrect'}
    elif wallet < amount:
        cur.close()
        #con.close()
        return {'400': 'Insufficient funds'}
    # secrets module is more cryptographically secure than random module
    card_number = secrets.token_hex(8) 
    amount_enc = aes_encrypt(str(amount))
    data = (email, card_number, amount_enc[0], amount_enc[1])
    query = 'insert into gift_cards (user_email, card_number, amount_cipher, amount_iv) values(%s, %s, %s, %s)'
    cur.execute(query, data)
    # update the user's wallet, subtract the amount
    new_amount = wallet - amount
    new_amount_enc = aes_encrypt(str(new_amount))
    data = (new_amount_enc[0], new_amount_enc[1], email)
    query = 'update users set wallet_cipher = %s, wallet_iv = %s where email = %s'
    cur.execute(query, data)
    con.commit()
    cur.close()
    return {'200': 'Gift Card Created Successfully'}
    #con.close()
    
    
def redeem_gift_card(card_number, email):
    #con = connect() 
    cur = con.cursor()
    data = (card_number,)
    query = 'select amount_cipher, amount_iv from gift_cards where card_number = %s'
    cur.execute(query, data)
    amount_enc = cur.fetchall()
    print(f"amount_enc {amount_enc}")
    amount = float(aes_decrypt(amount_enc[0][0], amount_enc[0][1]).decode())
    # if there is no gift card with that number
    # TODO - the lenght in minimum 1 even if nothing is return, check if its empty
    if not amount_enc[0]:
        cur.close()
        con.close()
        return {'400': 'Gift Card does not exist'}
    # if there is a user with that email
    data = (email,)
    query = 'select wallet_cipher, wallet_iv from users where email = %s'
    cur.execute(query, data)
    wallet_enc = cur.fetchall()
    wallet = float(aes_decrypt(wallet_enc[0][0], wallet_enc[0][1]).decode())
    # TODO - is this okay?
    if not wallet_enc[0]:
        cur.close()
        con.close()
        return {'400': 'User does not exist'}
    # update the user's wallet, add the amount
    new_amount = wallet + amount
    new_amount_enc = aes_encrypt(str(new_amount))
    data = (new_amount_enc[0], new_amount_enc[1], email)
    query = 'update users set wallet_cipher = %s, wallet_iv = %s where email = %s'
    cur.execute(query, data)
    # delete the gift card
    data = (card_number,)
    query = 'delete from gift_cards where card_number = %s'
    cur.execute(query, data)
    con.commit()
    cur.close()
    return {'200': 'Gift Card Redeemed Successfully'}
    #con.close()
    
    
def create_user(name,email,password):
    #con = connect() 
    cur = con.cursor()
    # Verify if the user already exists
    data = (email,)
    query = 'select * from users where email = %s'
    cur.execute(query, data)
    user = cur.fetchall()
    if len(user) > 0:
        cur.close()
        con.close()
        return USER_ALREADY_EXISTS_STATUS
    
    # Create the user
    base_amount = 200
    enc = aes_encrypt(str(base_amount))
    data = (name, email, password, enc[0], enc[1])
    query = 'insert into users (name, email, password, wallet_cipher, wallet_iv) values (%s, %s, %s, %s, %s)'
    cur.execute(query, data)
    con.commit()
    cur.close()
    return OK_STATUS
    #con.close()


def get_user_id(email):
    #con = connect() 
    cur = con.cursor()
    data = (email,)
    query = 'select user_id from users where email = %s'
    cur.execute(query, data)
    user = cur.fetchall()
    cur.close()
    #con.close()
    return user[0][0]
      
      
def get_next_user_id():
    #con = connect() 
    cur = con.cursor()
    query = 'select auto_increment from information_schema.tables where table_name = \'users\' and table_schema = database();'
    cur.execute(query)
    user = cur.fetchall()
    cur.close()
    #con.close()
    return user[0][0]
       
        
def get_all_users():
    #con = connect() 
    cur = con.cursor()
    cur.execute('select * from users')
    users = cur.fetchall()
    cur.close()
    #con.close()
    return users


def get_profile(email, password):
    #con = connect() 
    cur = con.cursor()
    data = (email, password)
    query = 'select name, email, wallet_cipher, wallet_iv from users where email = %s and password = %s'
    cur.execute(query, data)
    # user_raw is a mixed of the encrypted wallet and regular fields
    user_raw = cur.fetchall()
    user = [user_raw[0][0], user_raw[0][1]]

    wallet_enc = [user_raw[0][2], user_raw[0][3]]
    wallet = float(aes_decrypt(wallet_enc[0], wallet_enc[1]).decode())
    user.append(wallet)

    data = (email,)
    query = 'select card_number, amount_cipher, amount_iv from gift_cards where user_email = %s'
    cur.execute(query, data)
    enc_cards = cur.fetchall()
    cards = []
    # Decrypt all of the gift card values (var named amount)
    for enc_card in enc_cards:
        cards.append([enc_card[0], aes_decrypt(enc_card[1], enc_card[2]).decode()])
    cur.close()
    #con.close()
    return [user, cards]


def get_restaurant_profile(email, password):
    cur = con.cursor()
    data = (email, password)
    query = 'select * from restaurants where email = ? and password = ?'
    cur.execute(query, data)
    restaurant = cur.fetchall()
    cur.close()
    return restaurant


def login(email, password):
    #con = connect() 
    cur = con.cursor()
    data = (email, password)
    query = 'select * from users where email = %s and password = %s'
    cur.execute(query, data)
    user = cur.fetchall()
    cur.close()
    #con.close()
    return user
