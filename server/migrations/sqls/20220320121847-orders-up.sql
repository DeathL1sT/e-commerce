/* Replace with your SQL commands */
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    userId NOT NULL REFERENCES users(id),
    total integer,
    paymentId NOT NULL REFERENCES payment(id),
    created_at timestamp without time zone default (now() at time zone 'pst')

);