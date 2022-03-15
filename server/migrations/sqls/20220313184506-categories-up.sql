/* Replace with your SQL commands */
CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) UNIQUE NOT NULL,
    created_at timestamp without time zone default (now() at time zone 'pst')
);