-- test

Test 1: explain analyze SELECT reviews.*, json_agg(
json_build_object(
'id', reviews_photos.id,
'url', reviews_photos.url
)
) AS photos FROM reviews JOIN reviews_photos
ON reviews.id=reviews_photos.review_id WHERE reviews.product_id=2 GROUP BY reviews.id;

Test 2: SELECT reviews.*, json_agg(
json_build_object(
'id', reviews_photos.id,
'url', reviews_photos.url
)
) AS photos FROM reviews JOIN reviews_photos
ON reviews.id=reviews_photos.review_id WHERE reviews.product_id=2 GROUP BY reviews.id;

Test 3: explain analyze SELECT reviews.*, json_agg(
json_build_object(
'id', reviews_photos.id,
'url', reviews_photos.url
)
) AS photos FROM reviews JOIN reviews_photos
ON reviews.id=reviews_photos.review_id WHERE reviews.product_id=3 GROUP BY reviews.id;

Test 4: SELECT reviews.*, json_agg(
json_build_object(
'id', reviews_photos.id,
'url', reviews_photos.url
)
) AS photos FROM reviews JOIN reviews_photos
ON reviews.id=reviews_photos.review_id WHERE reviews.product_id=3 GROUP BY reviews.id;


Test 1  results:
-- Before Optimizing: 541.097 ms


-- After moving Pkeys into their own area: 515 avg

-- After adding 3 indexes:
-- CREATE INDEX reviews_product_id_idx ON reviews (product_id);
-- CREATE INDEX reviews_id_idx ON reviews (id);
-- CREATE INDEX reviews_photos_review_id_idx ON reviews_photos (review_id);
-- TIME:0.737 msTime: 0.720 ms0.753 ms0.731 ms0.684 ms0.683 ms

-- After adding 2 indexes:
-- CREATE INDEX reviews_product_id_idx ON reviews (product_id);
-- CREATE INDEX reviews_photos_review_id_idx ON reviews_photos (review_id);
-- TIME:Time: 2.087 ms 0.634 ms 0.612 ms 0.645 ms 0.688 ms 0.704 ms

-- After Optimizing: 0.129 ms


psql \
   host=ip-172-31-30-235 \
   port=5432 \
   username=daurham \
   password \
   dbname=ratings_reviews\

psql -h ip-172-31-30-235 -p 5432 -U daurham ratings_reviews
pg_dump -h 3.95.11.89 -Fc -O -U daurham ratings_reviews > dump.sql
-- TODO: Upgrade version of