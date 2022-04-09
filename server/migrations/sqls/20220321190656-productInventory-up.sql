/* Replace with your SQL commands */
CREATE TABLE inventory(
id SERIAL PRIMARY KEY,
quantity int,
created_at timestamp without time zone default (now() at time zone 'pst')
);