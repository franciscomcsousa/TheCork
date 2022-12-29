drop table if exists posts;
    create table posts(
        id integer primary key autoincrement,
        name text not null,
        content text not null
    );

drop table if exists gift_cards;
    create table gift_cards(
        id integer primary key AUTO_INCREMENT,
        user_email text not null foreign key references users(email),
        card_number integer not null,
        amount real not null
    );

drop table if exists users;
    create table users (
        user_id integer AUTO_INCREMENT primary key not null,
        name text not null,
        email text not null unique,
        password text not null,
        wallet real not null
    );
