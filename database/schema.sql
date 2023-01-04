drop table if exists gift_cards;
    create table gift_cards(
        id integer primary key AUTO_INCREMENT,
        user_email varchar(255) not null,
        card_number varchar(16) not null,
        amount_cipher varchar(32) not null,
        amount_iv varchar(32) not null
    );

drop table if exists users;
    create table users (
        user_id integer AUTO_INCREMENT primary key not null,
        name varchar(255) not null,
        email varchar(255) unique not null,
        password varchar(255) not null,
        wallet_cipher varchar(32) not null,
        wallet_iv varchar(32)
    );

drop table if exists restaurants;
    create table restaurants(
        id integer AUTO_INCREMENT primary key not null,
        name varchar(255) not null,
        address varchar(255) not null,
        phone varchar(9) not null,
        email varchar(255) not null,
        password varchar(255) not null,
        tables integer not null,
        availability boolean not null
    );

drop table if exists reservations;
    create table reservations(
        id integer AUTO_INCREMENT primary key not null,
        restaurant_name varchar(255) not null,
        user_email varchar(255) not null,
        people_count integer not null
    );

-- Populate the restaurants table
-- banana as password
insert into restaurants (name, address, phone, email, password, tables, availability) values ('La Pizzeria', 'Rotunda das oliveiras', '913456111', 'mogulmobil@gmail.com', 'b493d48364afe44d11c0165cf470a4164d1e2609911ef998be868d46ade3de4e', 10, 1);
insert into restaurants (name, address, phone, email, password, tables, availability) values ('La Pasta', 'Rua alves redol', '913444555', 'cocozilde@gmail.com', 'b493d48364afe44d11c0165cf470a4164d1e2609911ef998be868d46ade3de4e', 20, 1);
