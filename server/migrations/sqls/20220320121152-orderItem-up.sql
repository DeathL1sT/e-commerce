/* Replace with your SQL commands */
CREATE TABLE orderItem(
    id SERIAL PRIMARY KEY,
    orderId NOT NULL REFERENCES orders(id),
    productId NOT NULL REFERENCES products(id),
    quantity integer NOT NULL ,
    created_at timestamp without time zone default (now() at time zone 'pst')
);