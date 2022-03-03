drop database if exists ratings_reviews;

create database ratings_reviews;

\c ratings_reviews;

create table if not exists review (
  id serial primary key,
  product_id int unique not null,
  summary varchar(500) not null,
  recommended int not null,
  body varchar(500) not null,
  date_ date not null,
  response varchar(500) not null,
  reviewer_name int not null,
  helpfulness int not null
);
create table if not exists photos (
  photo_id serial primary key,
  url_ varchar(500) not null
);
create table if not exists recommended (
  id serial primary key,
  false_ int not null,
  true_ int not null
);
create table if not exists characteristics (
  characteristic_id serial primary key,
  characteristic varchar(100) not null,
  characteristic_value varchar(100) not null
);
create table if not exists meta (
  id serial primary key,
  product_id int not null,
  char_id int not null,
  rec_id int not null,
  rating_avg int not null,
  foreign key (product_id)
    references review (product_id),
  foreign key (char_id)
    references characteristics (characteristic_id),
  foreign key (rec_id)
    references recommended (id)
);