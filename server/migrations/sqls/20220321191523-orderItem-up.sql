/* Replace with your SQL commands */
CREATE TABLE orderItem(
    id SERIAL PRIMARY KEY,
    orderId INTEGER REFERENCES orders(id) NOT NULL ,
    productId INTEGER REFERENCES products(id) NOT NULL ,
    quantity integer NOT NULL ,
    created_at timestamp without time zone default (now() at time zone 'pst')
);