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
      const sql = `SLECET * FROM orders`;
      const result = await con.query(sql);
      const order = result.rows;
      con.release();
      return order;
    } catch (err) {
      throw err;
    }
  }

  async show(id: string): Promise<OrderSchema> {
    try {
      const con = await client.connect();
      const sql = `SELECT orders.*, SUM(orderItem.quantity * products.price) AS total FROM orders INNER JOIN orderItem ON orderIte
      m.orderId = $1 INNER JOIN products ON products.id = orderItem.productId GROUP BY orders.id`;
      const result = await con.query(sql, [id]);
      const order = result.rows[0];
      con.release();
      return order;
    } catch (err) {
      throw err;
    }
  }

  async create(o: OrderSchema): Promise<OrderSchema> {
    try {
      const con = await client.connect();
      const sql = `INSERT INTO orders(userId,total,paymentId) VALUES($1,$2,$3) `;
      const result = await con.query(sql, [o.userId, o.total, o.paymentId]);
      const order = result.rows[0];
      con.release();
      return order;
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, o: OrderSchema): Promise<OrderSchema> {
    try {
      const con = await client.connect();
      const sql = `UPDATE  orders SET userId=$1 ,total= $2 ,paymentId=$3 WHERE id=$4 `;
      const result = await con.query(sql, [o.userId, o.total, o.paymentId]);
      const order = result.rows[0];
      con.release();
      return order;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string): Promise<OrderSchema> {
    try {
      const con = await client.connect();
      const sql = `delete * FROM orders Where id=$1 `;
      const result = await con.query(sql, [id]);
      const order = result.rows[0];
      con.release();
      return order;
    } catch (err) {
      throw err;
    }
  }
}
