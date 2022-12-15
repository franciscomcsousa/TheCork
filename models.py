import sqlite3
import os
from os import path

ROOT = path.dirname(path.relpath(__file__))

def create_post(name, content):
    con = sqlite3.connect(path.join(ROOT, 'database.db'))
    cur = con.cursor()
    cur.execute('insert into posts (name, content) values(?, ?)', (name, content))
    con.commit()
    con.close()


def get_posts():
    con = sqlite3.connect(path.join(ROOT, 'database.db'))
    cur = con.cursor()
    cur.execute('select * from posts')
    posts = cur.fetchall()
    con.close()
    return posts


def get_all_gift_cards():
    con = sqlite3.connect(path.join(ROOT, 'database.db'))
    cur = con.cursor()
    cur.execute('select * from gift_cards')
    gift_cards = cur.fetchall()
    con.close()
    return gift_cards


def create_gift_card(amount):
    con = sqlite3.connect(path.join(ROOT, 'database.db'))
    cur = con.cursor()
    # verify if the user exists and has enough money
    # cur.execute('select * from users where email = ?', (email, ))
    # user = cur.fetchall()
    # if len(user) == 0:
    #     con.close()
    #     return
    # elif user[0][4] < amount:
    #     con.close()
    #     return
    card_number = os.urandom(32).hex()
    cur.execute('insert into gift_cards (card_number, amount) values(?, ?)', (card_number, amount))
    # update the user's wallet, subtract the amount
    #cur.execute('update users set wallet = ? where email = ?', (user[0][4] - amount, email))
    con.commit()
    con.close()
    
    
def redeem_gift_card(card_number):
    con = sqlite3.connect(path.join(ROOT, 'database.db'))
    cur = con.cursor()
    cur.execute('select * from gift_cards where card_number = ?', (card_number, ))
    gift_card = cur.fetchall()
    #if there is no gift card with that number
    if len(gift_card) == 0:
        con.close()
    cur.execute('delete from gift_cards where card_number = ?', (card_number, ))
    con.commit()
    con.close()
    
    
def create_user(name,email,password):
    con = sqlite3.connect(path.join(ROOT, 'database.db'))
    cur = con.cursor()
    cur.execute("INSERT INTO users (name, email, password, wallet) VALUES (?, ?, ?, ?)", (name, email, password, 0))
    con.commit()
    con.close()
      
        
def get_all_users():
    con = sqlite3.connect(path.join(ROOT, 'database.db'))
    cur = con.cursor()
    cur.execute('select * from users')
    users = cur.fetchall()
    con.close()
    return users

def login(email, password):
    con = sqlite3.connect(path.join(ROOT, 'database.db'))
    cur = con.cursor()
    cur.execute('select * from users where email = ? and password = ?', (email, password))
    user = cur.fetchall()
    con.close()
    return user