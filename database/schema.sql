drop table if exists gift_cards;
    create table gift_cards(
        id integer primary key AUTO_INCREMENT,
        user_email varchar(255) not null,
        card_number varchar(16) not null,
        amount real not null
    );

drop table if exists users;
    create table users (
        user_id integer AUTO_INCREMENT primary key not null,
        name varchar(255) not null,
        email varchar(255) not null,
        password varchar(255) not null,
        wallet real not null
    );