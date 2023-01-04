import mariadb
import os
from os import path
import secrets
from utils import aes_encrypt, aes_decrypt

con = mariadb.connect(
        host = "192.168.11.1",
        user = "sirs",
        password = "TimekeeperCookie10!",
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
    query = 'select wallet from users where email = %s and password = %s'
    cur.execute(query, data)
    user_wallet = cur.fetchall()
    if len(user_wallet) == 0:
        cur.close()
        #con.close()
        return {'400': 'User does not exist or password is incorrect'}
    elif user_wallet[0][0] < amount:
        cur.close()
        #con.close()
        return {'400': 'Insufficient funds'}
    # secrets module is more cryptographically secure than random module
    card_number = secrets.token_hex(8) 
    cipher = aes_encrypt(str(amount))
    data = (email, card_number, cipher[0], cipher[1])
    query = 'insert into gift_cards (user_email, card_number, amount_cipher, amount_iv) values(%s, %s, %s, %s)'
    cur.execute(query, data)
    # update the user's wallet, subtract the amount
    new_amount = user_wallet[0][0] - amount
    data = (new_amount, email)
    query = 'update users set wallet = %s where email = %s'
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
    amount_cipher = cur.fetchall()
    amount = aes_decrypt(amount_cipher[0], amount_cipher[1])
    #if there is no gift card with that number
    if len(amount) == 0:
        cur.close()
        con.close()
        return {'400': 'Gift Card does not exist'}
    # if there is a user with that email
    data = (email,)
    query = 'select wallet from users where email = %s'
    cur.execute(query, data)
    user_wallet = cur.fetchall()
    if len(user_wallet) == 0:
        cur.close()
        con.close()
        return {'400': 'User does not exist'}
    # update the user's wallet, add the amount
    new_amount = user_wallet[0][0] + amount
    data = (new_amount, email)
    query = 'update users set wallet = %s where email = %s'
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
    data = (name, email, password, 50)
    query = 'insert into users (name, email, password, wallet) values (%s, %s, %s, %s)'
    cur.execute(query, data)
    con.commit()
    cur.close()
    return {'200': 'User Created Successfully'}
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
    query = 'select * from users where email = %s and password = %s'
    cur.execute(query, data)
    user = cur.fetchall()
    data = (email,)
    query = 'select card_number, amount_cipher, amount_iv from gift_cards where user_email = %s'
    cur.execute(query, data)
    cipher_cards = cur.fetchall()
    cards = []
    # Decrypt all of the gift card values (var named amount)
    for cipher_card in cipher_cards:
        cards.append([cipher_card[0], aes_decrypt(cipher_card[1], cipher_card[2]).decode()])
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


# def login(email, password):
#     #con = connect() 
#     cur = con.cursor()
#     data = (email, password)
#     query = 'select * from users where email = %s and password = %s'
#     cur.execute(query, data)
#     user = cur.fetchall()
#     cur.close()
#     #con.close()
#     return user
