import client from "../config/DB";

export type CartItemSchema = {
  id?: string;
  sessionId: string;
  productId: string;
  quantity: number;
};

export class CartItem {
  async index(): Promise<CartItemSchema[]> {
    try {
      const con = await client.connect();
      const sql = `SELECT * From cartItem `;
      const result = await con.query(sql);
      const cart = result.rows;
      con.release();
      return cart;
    } catch (err) {
      throw err;
    }
  }

  async show(id: string): Promise<CartItemSchema> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM cartItem WHERE id=($1)`;
      const result = await con.query(sql, [id]);
      const cart = result.rows[0];
      con.release();
      return cart;
    } catch (err) {
      throw err;
    }
  }

  async create(c: CartItemSchema): Promise<CartItemSchema> {
    try {
      const con = await client.connect();
      const sql = `INSERT INTO cartItem (sessionId,productId,quantity) VALUES ($1,$2,$3) `;
      const result = await con.query(sql, [
        c.sessionId,
        c.productId,
        c.quantity,
      ]);
      const cart = result.rows[0];
      con.release();
      return cart;
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, c: CartItemSchema): Promise<CartItemSchema> {
    try {
      const con = await client.connect();
      const sql = `UPDATE  cartItem SET sessionId=$1,productId=$2,quantity=$3 WHERE id=$4 `;
      const result = await con.query(sql, [
        c.sessionId,
        c.productId,
        c.quantity,
        c.id,
      ]);
      const cart = result.rows[0];
      con.release();
      return cart;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string): Promise<CartItemSchema> {
    try {
      const con = await client.connect();
      const sql = `delete * FROM cartItem WHERE id=($1)`;
      const result = await con.query(sql, [id]);
      const cart = result.rows[0];
      con.release();
      return cart;
    } catch (err) {
      throw err;
    }
  }
}
