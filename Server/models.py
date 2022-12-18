import sqlite3
import os
from os import path

ROOT = path.dirname(path.relpath(__file__))

def create_post(name, content):
    con = sqlite3.connect(path.join(ROOT, 'database.db'))
    cur = con.cursor()
    data = (name, content)
    query = 'insert into posts (name, content) values (?, ?)'
    cur.execute(query, data)
    con.commit()
    cur.close()
    con.close()


def get_posts():
    con = sqlite3.connect(path.join(ROOT, 'database.db'))
    cur = con.cursor()
    cur.execute('select * from posts')
    posts = cur.fetchall()
    cur.close()
    con.close()
    return posts


def get_all_gift_cards():
    con = sqlite3.connect(path.join(ROOT, 'database.db'))
    cur = con.cursor()
    cur.execute('select * from gift_cards')
    gift_cards = cur.fetchall()
    cur.close()
    con.close()
    return gift_cards


def create_gift_card(amount, email, password):
    con = sqlite3.connect(path.join(ROOT, 'database.db'))
    cur = con.cursor()
    # verify if the user exists and has correct password
    data = (email, password)
    query = 'select * from users where email = ? and password = ?'
    cur.execute(query, data)
    user = cur.fetchall()
    if len(user) == 0:
        cur.close()
        con.close()
        return
    elif user[0][4] < amount:
        cur.close()
        con.close()
        return
    card_number = os.urandom(32).hex()
    data = (card_number, amount)
    query = 'insert into gift_cards (card_number, amount) values(?, ?)'
    cur.execute(query, data)
    # update the user's wallet, subtract the amount
    new_amount = user[0][4] - amount
    data = (new_amount, email)
    query = 'update users set wallet = ? where email = ?'
    cur.execute(query, data)
    con.commit()
    cur.close()
    con.close()
    
    
def redeem_gift_card(card_number, email):
    con = sqlite3.connect(path.join(ROOT, 'database.db'))
    cur = con.cursor()
    data = (card_number,)
    query = 'select * from gift_cards where card_number = ?'
    cur.execute(query, data)
    gift_card = cur.fetchall()
    #if there is no gift card with that number
    if len(gift_card) == 0:
        cur.close()
        con.close()
        return
    # if there is a user with that email
    data = (email,)
    query = 'select * from users where email = ?'
    cur.execute(query, data)
    user = cur.fetchall()
    if len(user) == 0:
        cur.close()
        con.close()
        return
    # update the user's wallet, add the amount
    new_amount = user[0][4] + gift_card[0][2]
    data = (new_amount, email)
    query = 'update users set wallet = ? where email = ?'
    cur.execute(query, data)
    # delete the gift card
    data = (card_number,)
    query = 'delete from gift_cards where card_number = ?'
    cur.execute(query, data)
    con.commit()
    cur.close()
    con.close()
    
    
def create_user(name,email,password):
    con = sqlite3.connect(path.join(ROOT, 'database.db'))
    cur = con.cursor()
    data = (name, email, password, 0)
    query = 'insert into users (name, email, password, wallet) values (?, ?, ?, ?)'
    cur.execute(query, data)
    con.commit()
    cur.close()
    con.close()
      
        
def get_all_users():
    con = sqlite3.connect(path.join(ROOT, 'database.db'))
    cur = con.cursor()
    cur.execute('select * from users')
    users = cur.fetchall()
    cur.close()
    con.close()
    return users

def login(email, password):
    con = sqlite3.connect(path.join(ROOT, 'database.db'))
    cur = con.cursor()
    data = (email, password)
    query = 'select * from users where email = ? and password = ?'
    cur.execute(query, data)
    user = cur.fetchall()
    cur.close()
    con.close()
    return user