drop table if exists gift_cards;
    create table gift_cards(
        id integer primary key AUTO_INCREMENT,
        sender_email varchar(255) not null,
        redeemer_email varchar(255) default '' not null,
        card_number_hash varchar(64) not null,
        card_number_cipher varchar(64) not null,
        card_number_iv varchar(64) not null,
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
        available_seats integer not null,
        availability boolean not null
    );

drop table if exists reservations;
    create table reservations(
        id integer AUTO_INCREMENT primary key not null,
        restaurant_name varchar(255) not null,
        restaurant_email varchar(255) not null,
        user_email varchar(255) not null,
        people_count integer not null,
        status boolean not null
    );

-- Populate the restaurants table
-- Banana as password
insert into restaurants (name, address, phone, email, password, available_seats, availability) values ('La Pizzeria', 'Rotunda das oliveiras', '913456111', 'laPizzeria@gmail.com', 'b493d48364afe44d11c0165cf470a4164d1e2609911ef998be868d46ade3de4e', 50, 1);
insert into restaurants (name, address, phone, email, password, available_seats, availability) values ('La Pasta', 'Rua alves redol', '913444555', 'laPasta@gmail.com', 'b493d48364afe44d11c0165cf470a4164d1e2609911ef998be868d46ade3de4e', 30, 1);
insert into restaurants (name, address, phone, email, password, available_seats, availability) values ('Taco Bell', 'Av Amarela', '913254555', 'tacoBell@gmail.com', 'b493d48364afe44d11c0165cf470a4164d1e2609911ef998be868d46ade3de4e', 40, 1);
insert into restaurants (name, address, phone, email, password, available_seats, availability) values ('Pizza Hut', 'Rotunda azul', '913440355', 'pizzaHut@gmail.com', 'b493d48364afe44d11c0165cf470a4164d1e2609911ef998be868d46ade3de4e', 10, 1);

