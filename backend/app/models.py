import mariadb
import os
from os import path
import secrets
from utils import aes_encrypt, aes_decrypt

ROOT = path.dirname(path.relpath(__file__))

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
    print(f"user_wallet: {user_wallet}")
    if len(user_wallet) == 0:
        cur.close()
        #con.close()
        return
    elif user_wallet[0][0] < amount:
        cur.close()
        #con.close()
        return
    # secrets module is more cryptographically secure than random module
    card_number = secrets.token_hex(8) 
    print(card_number)
    data = (email, card_number, amount)
    query = 'insert into gift_cards (user_email, card_number, amount) values(%s, %s, %s)'
    cur.execute(query, data)
    # update the user's wallet, subtract the amount
    new_amount = user_wallet[0][0] - amount
    data = (new_amount, email)
    query = 'update users set wallet = %s where email = %s'
    cur.execute(query, data)
    con.commit()
    cur.close()
    #con.close()
    
    
def redeem_gift_card(card_number, email):
    #con = connect() 
    cur = con.cursor()
    data = (card_number,)
    query = 'select card_number from gift_cards where card_number = %s'
    cur.execute(query, data)
    gift_card_number = cur.fetchall()
    print(f"gift_card: {gift_card_number}")
    #if there is no gift card with that number
    if len(gift_card_number) == 0:
        cur.close()
        con.close()
        return
    # if there is a user with that email
    data = (email,)
    query = 'select wallet from users where email = %s'
    cur.execute(query, data)
    user_wallet = cur.fetchall()
    if len(user_wallet) == 0:
        cur.close()
        con.close()
        return
    # update the user's wallet, add the amount
    new_amount = user_wallet[0] + gift_card_number[0]
    data = (new_amount, email)
    query = 'update users set wallet = %s where email = %s'
    cur.execute(query, data)
    # delete the gift card
    data = (card_number,)
    query = 'delete from gift_cards where card_number = %s'
    cur.execute(query, data)
    con.commit()
    cur.close()
    #con.close()
    
    
def create_user(name,email,password):
    #con = connect() 
    cur = con.cursor()
    data = (name, email, password, 50)
    query = 'insert into users (name, email, password, wallet) values (%s, %s, %s, %s)'
    cur.execute(query, data)
    con.commit()
    cur.close()
    #con.close()


def get_user_id(email):
    #con = connect() 
    cur = con.cursor()
    data = (email,)
    query = 'select user_id from users where email = %s'
    cur.execute(query, data)
    user = cur.fetchall()
    cur.close()
    print(f"user {user}")
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
    query = 'select card_number, amount from gift_cards where user_email = %s'
    cur.execute(query, data)
    cards = cur.fetchall()
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
