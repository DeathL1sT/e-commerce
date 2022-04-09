/* Replace with your SQL commands */
CREATE TABLE paymentDetails(
    id SERIAL PRIMARY KEY,
    amount integer NOT NULL,
    provider VARCHAR(100) NOT NULL,
    status VARCHAR(100) NOT NULL,
    created_at timestamp without time zone default (now() at time zone 'pst')
);