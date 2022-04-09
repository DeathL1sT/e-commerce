/* Replace with your SQL commands */
CREATE TABLE discount(
    id SERIAL PRIMARY KEY ,
    title VARCHAR(100),
    discreption text,
    percent decimal,
    active boolean,
    created_at timestamp without time zone default (now() at time zone 'pst')
);