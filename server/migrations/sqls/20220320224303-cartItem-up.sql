CREATE TABLE cartItem(
id SERIAL PRIMARY KEY,
sessionId REFERENCES shoppingSession(id),
productId REFERENCES products(id) NOT NULL,
quantity integer NOT NULL,
    created_at timestamp without time zone default (now() at time zone 'pst')
);