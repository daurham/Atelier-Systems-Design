drop database if exists ratings_reviews;
create database ratings_reviews;
\timing
\c ratings_reviews;
create table if not exists reviews (
  id serial,
  product_id int,
  rating int,
  date date,
  summary text,
  body varchar,
  recommend boolean,
  reported boolean,
  reviewer_name varchar,
  reviewer_email varchar,
  response varchar,
  helpfulness int
);
create table if not exists reviews_photos (
  id serial,
  review_id int,
  url varchar
);
-- create table if not exists characteristic_reviews (
--   id serial,
--   characteristic_id int,
--   review_id int,
--   value varchar
-- );
-- create table if not exists characteristics (
--   id serial,
--   product_id int,
--   name varchar
-- );
-- create table if not exists product (
--   id serial,
--   name varchar,
--   slogan varchar,
--   description varchar,
--   category varchar,
--   default_price int
-- );
-- create table if not exists meta (
--   id serial,
--   review_id int,
--   helpfulness int
-- );

\COPY reviews FROM '/home/ubuntu/SDC-Jake-Ratings-Reviews/serverAPI/database/csv/reviews-processed.csv' DELIMITER ',' CSV HEADER;
\COPY reviews_photos FROM '/home/ubuntu/SDC-Jake-Ratings-Reviews/serverAPI/database/csv/reviews_photos.csv' DELIMITER ',' CSV HEADER;

-- COPY reviews FROM '/home/daurham/hackreactor/SDC/SDC-Jake-Ratings-Reviews/csvFiles/reviews-processed.csv' DELIMITER ',' CSV HEADER;
-- COPY reviews_photos FROM '/home/daurham/hackreactor/SDC/SDC-Jake-Ratings-Reviews/csvFiles/reviews_photos.csv' DELIMITER ',' CSV HEADER;
-- COPY characteristic_reviews FROM '/home/daurham/hackreactor/SDC/SDC-Jake-Ratings-Reviews/csvFiles/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
-- COPY characteristics FROM '/home/daurham/hackreactor/SDC/SDC-Jake-Ratings-Reviews/csvFiles/characteristics.csv' DELIMITER ',' CSV HEADER;

-- For An EC2 Ubuntu Instance:
-- \COPY reviews FROM 'csv/reviews-processed.csv' DELIMITER ',' CSV HEADER;
-- \COPY reviews_photos FROM 'csv/reviews_photos.csv' DELIMITER ',' CSV HEADER;
-- \COPY characteristic_reviews FROM 'csv/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
-- \COPY characteristics FROM 'csv/characteristics.csv' DELIMITER ',' CSV HEADER;

-- COPY product FROM '/home/daurham/hackreactor/SDC/SDC-Jake-Ratings-Reviews/csvFiles/product.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE reviews ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);
ALTER TABLE reviews_photos ADD CONSTRAINT reviews_photos_pkey PRIMARY KEY (id);
-- ALTER TABLE characteristic_reviews ADD CONSTRAINT characteristic_reviews_pkey PRIMARY KEY (id);
-- ALTER TABLE characteristics ADD CONSTRAINT characteristics_pkey PRIMARY KEY (id);
-- ALTER TABLE meta ADD CONSTRAINT meta_pkey PRIMARY KEY (id);

ALTER TABLE reviews_photos ADD CONSTRAINT reviews_photos_review_id_fkey FOREIGN KEY (review_id) REFERENCES reviews(id);
-- ALTER TABLE characteristic_reviews ADD CONSTRAINT characteristic_reviews_review_id_fkey FOREIGN KEY (review_id) REFERENCES reviews(id);

CREATE INDEX reviews_product_id_idx ON reviews (product_id);
CREATE INDEX reviews_photos_review_id_idx ON reviews_photos (review_id);
-- CREATE INDEX reviews_id_idx ON reviews (id);

--    update meta
-- set helpfulness = (select reviews sum(helpfulness) where reviews.reviews_id = meta.reviews_id)
-- where product_id = review_id;
-- select sum(helpfulness)
--   from reviews
-- where product_id = 1;

--    reload the schema.sql locally:
-- \i serverAPI/database/schema.sql


--    RELOAD DB remotely:
-- \i /home/ubuntu/SDC-Jake-Ratings-Reviews/serverAPI/database/schema.sql


-- LOAD CSVFiles:
-- /syntax/  scp -i <pem file path> <csv file path> ubuntu@<ec2 instance>:~ <file path where to import in ec2 server>
-- scp -i /mnt/c/Users/Jake/Desktop/sdc/hr.pem /hackreactor/SDC/SDC-Jake-Ratings-Reviews/csvFiles ubuntu@3.95.11.89:~ /SDC-Jake-Ratings-Reviews/csvFiles



-- /syntax/ scp -i ~/Desktop/amazon.pem ~/Desktop/MS115.fa  ubuntu@ec2-54-166-128-20.compute-1.amazonaws.com:~/data/
-- /example/ scp -i ~/Documents/Hack\ Reactor/sdc-aws/sdcServer-awslaunch/sdcServer.pem ~/Documents/Hack\ Reactor/SEI/sdc/Project-Nimble/csv/features.csv ubuntu@ec2-54-215-185-245.us-west-1.compute.amazonaws.com:~/Project-Nimble/db

-- icp -i -r /hackreactor/SDC/SDC-Jake-Ratings-Reviews/csvFiles

--    From inside my instances database, I need to run the copy command:
-- \COPY reviews FROM '/home/ubuntu/SDC-Jake-Ratings-Reviews/serverAPI/database/csv/reviews-processed.csv' DELIMITER ',' CSV HEADER;

-- /home/ubuntu/SDC-Jake-Ratings-Reviews/serverAPI/database/csv

