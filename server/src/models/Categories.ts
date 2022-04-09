import client, { DEFAULT_PAGE_SIZE } from "../config/DB";

export type CategorieSchema = {
  id?: string;
  title: string;
  timestamp?: string;
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
      throw new Error(`can not get your data...`);
    }
  }

  async show(id: string): Promise<CategorieSchema> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM categories WHERE id=($1)`;
      const result = await con.query(sql, [id]);
      const categorie = result.rows[0];
      con.release();
      return categorie;
    } catch (err) {
      throw new Error(`Can not find this categorie id...`);
    }
  }

  async update(id: string, c: CategorieSchema): Promise<CategorieSchema> {
    try {
      const con = await client.connect();
      const sql = `UPDATE categories SET title=$1  WHERE id=$2 RETURNING *`;
      const result = await con.query(sql, [c.title, id]);
      const categorie = result.rows[0];
      con.release();
      return categorie;
    } catch (err) {
      throw new Error(`Can not update this categorie data...`);
    }
  }

  async create(c: CategorieSchema): Promise<CategorieSchema> {
    try {
      const con = await client.connect();
      const sql = "INSERT INTO categories(title) VALUES($1) RETURNING *";
      const result = await con.query(sql, [c.title]);
      const categorie = result.rows[0];
      con.release();
      return categorie;
    } catch (err) {
      throw new Error(`Can not create your categorie...`);
    }
  }

  async delete(id: string): Promise<CategorieSchema> {
    try {
      const con = await client.connect();
      const sql = `DELETE FROM categories WHERE id=$1 RETURNING *`;
      const result = await con.query(sql, [id]);
      const categorie = result.rows[0];
      con.release();
      return categorie;
    } catch (err) {
      throw new Error(`Can not delete this categorie...`);
    }
  }
}
