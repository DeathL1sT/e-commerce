import client from "../config/DB";

export type ShoppingSessionSchema = {
  id?: string;
  userId: string;
  total: number;
};

export default class ShoppingSession {
  async index(): Promise<ShoppingSessionSchema[]> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM shoppingSession RETURNING *`;
      const result = await con.query(sql);
      const session = result.rows;
      con.release();
      return session;
    } catch (err) {
      throw err;
    }
  }

  async show(id: string): Promise<ShoppingSessionSchema> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM shoppingSession WHERE id=$1 RETURNING *`;
      const result = await con.query(sql, [id]);
      const session = result.rows[0];
      con.release();
      return session;
    } catch (err) {
      throw err;
    }
  }

  async create(s: ShoppingSessionSchema): Promise<ShoppingSessionSchema> {
    try {
      const con = await client.connect();
      const sql = `INSERT INTO  shoppingSession (userId,total) VALUES($1,$2) RETURNING *`;
      const result = await con.query(sql, [s.userId, s.total]);
      const session = result.rows[0];
      con.release();
      return session;
    } catch (err) {
      throw err;
    }
  }

  async update(
    id: string,
    s: ShoppingSessionSchema
  ): Promise<ShoppingSessionSchema> {
    try {
      const con = await client.connect();
      const sql = `UPDATE shoppingSession SET userId=$1,total=$2 WHERE id=$3 RETURNING *`;
      const result = await con.query(sql, [s.userId, s.total, s.id]);
      const session = result.rows[0];
      con.release();
      return session;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string): Promise<ShoppingSessionSchema> {
    try {
      const con = await client.connect();
      const sql = `DELETE * FROM shoppingSession WHERE id=$1 `;
      const result = await con.query(sql, [id]);
      const session = result.rows[0];
      con.release();
      return session;
    } catch (err) {
      throw err;
    }
  }
}
