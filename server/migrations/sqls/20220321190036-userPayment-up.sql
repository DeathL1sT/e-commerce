/* Replace with your SQL commands */
CREATE TABLE userPayment(
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES users(id),
    paymentType VARCHAR(100) NOT NULL,
    provider VARCHAR(100) NOT NULL,
    accountNum VARCHAR(255) NOT NULL UNIQUE,
    expire DATE NOT NULL,
    created_at timestamp without time zone default (now() at time zone 'pst')
);