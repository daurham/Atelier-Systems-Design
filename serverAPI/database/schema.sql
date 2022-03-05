drop database if exists ratings_reviews;

create database ratings_reviews;
\timing
\c ratings_reviews;

create table if not exists reviews (
  id serial primary key,
  product_id int not null,
  rating int not null,
  date date not null,
  summary varchar(500) not null,
  body varchar(500) not null,
  recommend boolean not null,
  reported boolean not null,
  response varchar(500) not null,
  reviewer_name varchar(100),
  reviewer_email varchar,
  helpfulness int
);

create table if not exists reviews_photos (
  id serial primary key,
  review_id int not null,
  url varchar(500)
);

create table if not exists characteristic_reviews (
  id serial primary key,
  characteristic_id int not null,
  review_id varchar(100) not null,
  value varchar(100) not null
);
create table if not exists characteristics (
  id serial primary key,
  product_id int not null,
  name varchar(100) not null
);
create table if not exists product (
  id serial primary key,
  name varchar(200) not null,
  slogan varchar(200) not null,
  description varchar(500) not null,
  category varchar(100) not null,
  default_price int not null
);

COPY reviews FROM '/home/daurham/hackreactor/SDC/SDC-Jake-Ratings-Reviews/csvFiles/reviews-processed.csv' DELIMITER ',' CSV HEADER;
COPY reviews_photos FROM '/home/daurham/hackreactor/SDC/SDC-Jake-Ratings-Reviews/csvFiles/reviews_photos.csv' DELIMITER ',' CSV HEADER;
COPY characteristic_reviews FROM '/home/daurham/hackreactor/SDC/SDC-Jake-Ratings-Reviews/csvFiles/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
COPY characteristics FROM '/home/daurham/hackreactor/SDC/SDC-Jake-Ratings-Reviews/csvFiles/characteristics.csv' DELIMITER ',' CSV HEADER;
COPY product FROM '/home/daurham/hackreactor/SDC/SDC-Jake-Ratings-Reviews/csvFiles/product.csv' DELIMITER ',' CSV HEADER;

explain (analyze) select * from reviews where id=1 limit 5;

-- Set the count of all recommend trues into recommended table true_ col
-- Set the count of all recommend falses into recommended table false_ col
-- Select sum ()
-- get the average value of all the ratings and assign it to the meta tables ratingAvg col
-- update recommended
-- set false_ = sum( //operation// )
-- where

-- Commands:
-- \dt+  shows db tables and their size

-- Load schema:
-- psql ratings_reviews -U postgres -f serverAPI/database/schema.sql
-- \i serverAPI/database/schema.sql