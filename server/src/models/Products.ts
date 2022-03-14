import client from "../config/DB";

export type ProductSchema = {
  id?: string;
  title: string;
  discreption: string;
  imgUrl: string;
  price: Number;
  categorie_id?: string;
  discount_id?: string;
};

export default class Product {
  async index(): Promise<ProductSchema[]> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM products`;
      const result = await con.query(sql);
      const products = result.rows;
      con.release();
      return products;
    } catch (err) {
      throw new Error(`Can not found products...`);
    }
  }

  async show(id: string): Promise<ProductSchema> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM products WHERE id=$1 RETURNING *`;
      const result = await con.query(sql, [id]);
      const product = result.rows[0];
      con.release();
      return product;
    } catch (err) {
      throw new Error(`Can not find this product id...`);
    }
  }

  async create(p: ProductSchema): Promise<ProductSchema> {
    try {
      const con = await client.connect();
      const sql = `INSERT INTO products(title,discreption,imgUrl,price,categorie_id,discount_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
      const result = await con.query(sql, [p]);
      const product = result.rows[0];
      con.release();
      return product;
    } catch (err) {
      throw new Error(`Can not create this product...`);
    }
  }

  async update(id: string): Promise<ProductSchema> {
    let p: ProductSchema;
    try {
      const con = await client.connect();
      const sql = `UPDATE products SET title=$1,discreption=$2,imgUrl=$3,price=$4,categorie_id=$5,discount_id=$6 WHERE id=$7 RETURNING *`;
      const result = await con.query(sql, [p, id]);
      const product = result.rows[0];
      con.release();
      return product;
    } catch (err) {
      throw new Error(`Can not update your product...`);
    }
  }

  async delete(id: string): Promise<ProductSchema> {
    try {
      const con = await client.connect();
      const sql = `DELETE * FROM products WHERE id=$1 RETURNING *`;
      const result = await con.query(sql, [id]);
      const product = result.rows[0];
      con.release();
      return product;
    } catch (err) {
      throw new Error(`Can not delete your product...`);
    }
  }
}
