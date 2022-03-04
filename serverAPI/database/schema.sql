drop database if exists ratings_reviews;

create database ratings_reviews;

\c ratings_reviews;

create table if not exists review (
  id serial primary key,
  product_id int not null,
  rating int not null,
  date_ date not null,
  summary varchar(500) not null,
  body varchar(500) not null,
  recommend boolean not null,
  reported boolean not null,
  response varchar(500) not null,
  reviewer_name varchar(100),
  reviewer_email varchar(100),
  helpfulness int
);

create table if not exists photos (
  id serial primary key,
  review_id int not null,
  url varchar(500)
);

create table if not exists recommended (
  id serial primary key,
  false_ int,
  true_ int
);

create table if not exists characteristics_reviews (
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
create table if not exists meta (
  id serial primary key,
  product_id int not null,
  char_id int not null,
  rec_id int not null,
  rating_avg int,
  foreign key (product_id)
    references review (product_id),
  foreign key (char_id)
    references characteristics (id),
  foreign key (rec_id)
    references recommended (id)
);

COPY review FROM '/hackreactor/SDC/SDC-Jake-Ratings-Reviews/serverAPI/csvFiles/reviews.csv' DELIMITER ',' CSV HEADER;
COPY photos FROM '/hackreactor/SDC/SDC-Jake-Ratings-Reviews/serverAPI/csvFiles/reviews_photos.csv' DELIMITER ',' CSV HEADER;
COPY characteristics FROM '/hackreactor/SDC/SDC-Jake-Ratings-Reviews/serverAPI/csvFiles/characteristics.csv' DELIMITER ',' CSV HEADER;
COPY characteristic_reviews FROM '/hackreactor/SDC/SDC-Jake-Ratings-Reviews/serverAPI/csvFiles/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
COPY reviews_photos FROM '/hackreactor/SDC/SDC-Jake-Ratings-Reviews/serverAPI/csvFiles/reviews_photos.csv' DELIMITER ',' CSV HEADER;

-- psql ratings_reviews -U postgres -f schema.sql
-- Set the count of all recommend trues into recommended table true_ col
-- Set the count of all recommend falses into recommended table false_ col
-- Select sum ()
-- get the average value of all the ratings and assign it to the meta tables ratingAvg col

