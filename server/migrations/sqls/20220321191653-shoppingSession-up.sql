/* Replace with your SQL commands */
CREATE TABLE shoppingSession(
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES users(id) NOT NULL,
    total integer NOT NULL,
    created_at timestamp without time zone default (now() at time zone 'pst')
);