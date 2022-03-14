/* Replace with your SQL commands */
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) UNIQUE,
    discreption text,
    imgUrl VARCHAR(255),
    price integer NOT NULL,
    categorie_id int REFERENCES categories(id),
    discount_id int REFERENCES discount(id),
    timestamp timestamp without time zone default (now() at time zone 'pst')
);