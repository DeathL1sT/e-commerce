/* Replace with your SQL commands */
CREATE TABLE cartItem(
id SERIAL PRIMARY KEY,
sessionId INTEGER REFERENCES shoppingSession(id),
productId INTEGER REFERENCES products(id) NOT NULL,
quantity integer NOT NULL,
    created_at timestamp without time zone default (now() at time zone 'pst')
);