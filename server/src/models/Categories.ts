import client, { DEFAULT_PAGE_SIZE } from "../config/DB";

export type CategorieSchema = {
  id?: number;
  title: string;
};

export class Categories {
  async index(
    page?: number,
    pageSize: number = DEFAULT_PAGE_SIZE
  ): Promise<CategorieSchema[]> {
    try {
      page ??= 1;
      const sql = `SELECT * FROM categories ${
        page >= 1 && "OFFSET $1 LIMIT $2"
      }`;

      const con = await client.connect();
      const result = await con.query(sql, [(page - 1) * pageSize, pageSize]);
      const categorie = result.rows;
      con.release();
      return categorie;
    } catch (err) {
      throw err;
    }
  }

  async show(id: number): Promise<CategorieSchema> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM categories WHERE id=($1)`;
      const result = await con.query(sql, [id]);
      const categorie = result.rows[0];
      con.release();
      return categorie;
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, c: CategorieSchema): Promise<CategorieSchema> {
    try {
      const con = await client.connect();
      const sql = `UPDATE categories SET title=$1  WHERE id=$2 RETURNING *`;
      const result = await con.query(sql, [c.title, id]);
      const categorie = result.rows[0];
      con.release();
      return categorie;
    } catch (err) {
      throw err;
    }
  }

  async create(c: CategorieSchema): Promise<CategorieSchema> {
    try {
      const con = await client.connect();
      const sql = `INSERT INTO categories (title) VALUES ($1) RETURNING *`;
      const result = await con.query(sql, [c.title]);
      const categorie = result.rows[0];
      con.release();
      return categorie;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: number): Promise<CategorieSchema> {
    try {
      const con = await client.connect();
      const sql = `DELETE FROM categories WHERE id=$1 `;
      const result = await con.query(sql, [id]);
      const categorie = result.rows[0];
      con.release();
      return categorie;
    } catch (err) {
      throw err;
    }
  }
}
