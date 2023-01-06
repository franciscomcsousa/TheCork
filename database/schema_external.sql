drop table if exists cupons;
    create table cupons (
        id integer AUTO_INCREMENT primary key not null,
        email varchar(255) unique not null,
        points integer not null
    );


-- Populate cupons table
insert into cupons (email, points) values ('francisco.m.c.sousa@gmail.com', 300);
insert into cupons (email, points) values ('sara.aguincha@gmail.com', 200);
insert into cupons (email, points) values ('miguel.porfirio@gmail.com', 150);