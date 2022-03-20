CREATE TABLE userPayment(
    id SERIAL PRIMARY KEY,
    userId REFERENCES users(id),
    paymentType VARCHAR(100) NOT NULL,
    provider VARCHAR(100) NOT NULL,
    accountNum integer NOT NULL UNIQUE,
    expire DATE NOT NULL,
    created_at timestamp without time zone default (now() at time zone 'pst')
);