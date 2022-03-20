import client from "../config/DB";

export type OrderSchema = {
  id?: string;
  userId: string;
  total: number;
  paymentId: string;
};

export default class Orders {
  async index(): Promise<OrderSchema[]> {
    try {
      const con = await client.connect();
      const sql = `SLECET * FROM orders RETURNING *`;
      const result = await con.query(sql);
      const order = result.rows;
      con.release();
      return order;
    } catch (err) {
      throw new Error(`Can not find any orders...`);
    }
  }

  async show(id: string): Promise<OrderSchema> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM orders Where id=$1 RETURNING *`;
      const result = await con.query(sql, [id]);
      const order = result.rows[0];
      con.release();
      return order;
    } catch (err) {
      throw new Error(`Can not fin this order  id....`);
    }
  }

  async create(o: OrderSchema): Promise<OrderSchema> {
    try {
      const con = await client.connect();
      const sql = `INSERT INTO orders(userId,total,paymentId) VALUES($1,$2,$3) RETURNING *`;
      const result = await con.query(sql, [o.userId, o.total, o.paymentId]);
      const order = result.rows[0];
      con.release();
      return order;
    } catch (err) {
      throw new Error(`Can not create your order ....`);
    }
  }

  async update(id: string, o: OrderSchema): Promise<OrderSchema> {
    try {
      const con = await client.connect();
      const sql = `UPDATE  orders SET userId=$1 ,total= $2 ,paymentId=$3 WHERE id=$4 RETURNING *`;
      const result = await con.query(sql, [o.userId, o.total, o.paymentId]);
      const order = result.rows[0];
      con.release();
      return order;
    } catch (err) {
      throw new Error(`Can not update your order  ....`);
    }
  }

  async delete(id: string): Promise<OrderSchema> {
    try {
      const con = await client.connect();
      const sql = `delete * FROM orders Where id=$1 RETURNING *`;
      const result = await con.query(sql, [id]);
      const order = result.rows[0];
      con.release();
      return order;
    } catch (err) {
      throw new Error(`Can not delete your order...`);
    }
  }
}
