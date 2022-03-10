drop database if exists ratings_reviews;
create database ratings_reviews;
\timing
\c ratings_reviews;
create table if not exists reviews (
  id serial,
  product_id int not null,
  rating int not null,
  date date not null,
  summary text not null,
  body varchar(500) not null,
  recommend boolean not null,
  reported boolean not null,
  response varchar(500) not null,
  reviewer_name varchar(100),
  reviewer_email varchar,
  helpfulness int
);
create table if not exists reviews_photos (
  id serial,
  review_id int not null,
  url varchar(500)
);
create table if not exists characteristic_reviews (
  id serial,
  characteristic_id int not null,
  review_id int not null,
  value varchar(100) not null
);
create table if not exists characteristics (
  id serial,
  product_id int not null,
  name varchar(100) not null
);
-- create table if not exists product (
--   id serial,
--   name varchar(200) not null,
--   slogan varchar(200) not null,
--   description varchar(500) not null,
--   category varchar(100) not null,
--   default_price int not null
-- );
create table if not exists meta (
  id serial,
  review_id int,
  helpfulness int
);

COPY reviews FROM '/home/daurham/hackreactor/SDC/SDC-Jake-Ratings-Reviews/csvFiles/reviews-processed.csv' DELIMITER ',' CSV HEADER;
COPY reviews_photos FROM '/home/daurham/hackreactor/SDC/SDC-Jake-Ratings-Reviews/csvFiles/reviews_photos.csv' DELIMITER ',' CSV HEADER;
COPY characteristic_reviews FROM '/home/daurham/hackreactor/SDC/SDC-Jake-Ratings-Reviews/csvFiles/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
COPY characteristics FROM '/home/daurham/hackreactor/SDC/SDC-Jake-Ratings-Reviews/csvFiles/characteristics.csv' DELIMITER ',' CSV HEADER;
-- COPY product FROM '/home/daurham/hackreactor/SDC/SDC-Jake-Ratings-Reviews/csvFiles/product.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE reviews ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);
ALTER TABLE reviews_photos ADD CONSTRAINT reviews_photos_pkey PRIMARY KEY (id);
ALTER TABLE characteristic_reviews ADD CONSTRAINT characteristic_reviews_pkey PRIMARY KEY (id);
ALTER TABLE characteristics ADD CONSTRAINT characteristics_pkey PRIMARY KEY (id);
ALTER TABLE meta ADD CONSTRAINT meta_pkey PRIMARY KEY (id);

ALTER TABLE characteristic_reviews ADD CONSTRAINT characteristic_reviews_review_id_fkey FOREIGN KEY (review_id) REFERENCES reviews(id);
ALTER TABLE reviews_photos ADD CONSTRAINT reviews_photos_review_id_fkey FOREIGN KEY (review_id) REFERENCES reviews(id);

CREATE INDEX reviews_product_id_idx ON reviews (product_id);
CREATE INDEX reviews_photos_review_id_idx ON reviews_photos (review_id);
-- CREATE INDEX reviews_id_idx ON reviews (id);

-- update meta
-- set helpfulness = (select reviews sum(helpfulness) where reviews.reviews_id = meta.reviews_id)
-- where product_id = review_id;
-- select sum(helpfulness)
--   from reviews
-- where product_id = 1;

-- \i serverAPI/database/schema.sql