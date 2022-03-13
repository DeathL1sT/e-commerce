/* Replace with your SQL commands */
CREATE TABLE categories(
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(100) UNIQUE NOT NULL,
    timestamp timestamp without time zone default (now() at time zone 'pst')
);