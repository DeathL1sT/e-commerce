/* Replace with your SQL commands */
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    userId  INTEGER REFERENCES users(id) NOT NULL,
    total integer,
    paymentId  INTEGER REFERENCES paymentDetails(id) NOT NULL,
    created_at timestamp without time zone default (now() at time zone 'pst')

);