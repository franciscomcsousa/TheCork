import mariadb
import os
from os import path

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

#def connect():
#    return mysql.connector.connect(
#            host =   "192.168.2.4",
#            user = "sirs",
#            passwd = "TimekeeperCookie10!",
#            database = "thecork"
#            )

def create_post(name, content):
    #con = connect() 
    cur = con.cursor()
    data = (name, content)
    query = 'insert into posts (name, content) values (%s, %s)'
    cur.execute(query, data)
    con.commit()
    cur.close()
    #con.close()

def get_posts():
    #con = connect() 
    cur = con.cursor()
    cur.execute('select * from posts')
    posts = cur.fetchall()
    cur.close()
    #con.close()
    return posts


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
    query = 'select * from users where email = %s and password = %s'
    cur.execute(query, data)
    user = cur.fetchall()
    if len(user) == 0:
        cur.close()
        #con.close()
        return
    elif user[0][4] < amount:
        cur.close()
        #con.close()
        return
    card_number = os.urandom(32).hex()
    data = (email, card_number, amount)
    query = 'insert into gift_cards (email, card_number, amount) values(%s, %s, %s)'
    cur.execute(query, data)
    # update the user's wallet, subtract the amount
    new_amount = user[0][4] - amount
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
    query = 'select * from gift_cards where card_number = %s'
    cur.execute(query, data)
    gift_card = cur.fetchall()
    #if there is no gift card with that number
    if len(gift_card) == 0:
        cur.close()
        con.close()
        return
    # if there is a user with that email
    data = (email,)
    query = 'select * from users where email = %s'
    cur.execute(query, data)
    user = cur.fetchall()
    if len(user) == 0:
        cur.close()
        con.close()
        return
    # update the user's wallet, add the amount
    new_amount = user[0][4] + gift_card[0][2]
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
      
        
def get_all_users():
    #con = connect() 
    cur = con.cursor()
    cur.execute('select * from users')
    users = cur.fetchall()
    cur.close()
    #con.close()
    return users

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
