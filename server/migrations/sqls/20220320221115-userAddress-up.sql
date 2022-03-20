CREATE TABLE userAddress(
    id SERIAL PRIMARY KEY,
    userId REFERENCES users(id) NOT NULL,
    addressLine1 VARCHAR(100) NOT NULL,
    addressLine2 VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    postalCode VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    telephone VARCHAR(80) NOT NULL,
    mobile VARCHAR(80) NOT NULL,
    created_at timestamp without time zone default (now() at time zone 'pst')
);