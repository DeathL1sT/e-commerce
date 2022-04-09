/* Replace with your SQL commands */
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) UNIQUE,
    discreption text,
    imgUrl VARCHAR(255),
    price integer NOT NULL,
    categorie_id INTEGER REFERENCES categories(id),
    inventory_id INTEGER REFERENCES inventory(id),
    discount_id INTEGER REFERENCES discount(id),
    created_at timestamp without time zone default (now() at time zone 'pst')
);