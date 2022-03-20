CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    userName VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    firstName VARCHAR(80) NOT NULL,
    lastName VARCHAR(80) NOT NULL,
    telephone VARCHAR(80) NOT NULL,
    created_at timestamp without time zone default (now() at time zone 'pst')
);