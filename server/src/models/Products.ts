import client, { DEFAULT_PAGE_SIZE } from "../config/DB";

export type ProductSchema = {
  id?: string;
  title: string;
  discreption: string;
  imgUrl: string;
  price: Number;
  categorie_id: string;
  inventory_id: string;
  discount_id?: string;
};

export default class Product {
  async index(
    page?: number,
    pageSize: number = DEFAULT_PAGE_SIZE
  ): Promise<ProductSchema[]> {
    try {
      page ??= 1;
      const sql = `SELECT * FROM products ${page >= 1 && "OFFSET $1 LIMIT $2"}`;

      const con = await client.connect();

      const result = await con.query(sql, [(page - 1) * pageSize, pageSize]);
      const products = result.rows;
      con.release();
      return products;
    } catch (err) {
      throw err;
    }
  }

  async show(id: string): Promise<ProductSchema> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM products WHERE id=$1`;
      const result = await con.query(sql, [id]);
      const product = result.rows[0];
      con.release();
      return product;
    } catch (err) {
      throw err;
    }
  }

  async create(p: ProductSchema): Promise<ProductSchema> {
    try {
      const con = await client.connect();
      const sql = `INSERT INTO products(title,discreption,imgUrl,price,categorie_id,inventory_id,discount_id) VALUES ($1,$2,$3,$4,$5,$6,$7) `;
      const result = await con.query(sql, [
        p.title,
        p.discreption,
        p.imgUrl,
        p.price,
        p.categorie_id,
        p.inventory_id,
        p.discount_id,
      ]);
      const product = result.rows[0];
      con.release();
      return product;
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, p: ProductSchema): Promise<ProductSchema> {
    try {
      const con = await client.connect();
      const sql = `UPDATE products SET title=$1,discreption=$2,imgUrl=$3,price=$4,categorie_id=$5,inventory_id=$6,discount_id=$7 WHERE id=$8 `;
      const result = await con.query(sql, [
        p.title,
        p.discreption,
        p.imgUrl,
        p.price,
        p.categorie_id,
        p.inventory_id,
        p.discount_id,
        id,
      ]);
      const product = result.rows[0];
      con.release();
      return product;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string): Promise<ProductSchema> {
    try {
      const con = await client.connect();
      const sql = `DELETE * FROM products WHERE id=$1 `;
      const result = await con.query(sql, [id]);
      const product = result.rows[0];
      con.release();
      return product;
    } catch (err) {
      throw err;
    }
  }
}
