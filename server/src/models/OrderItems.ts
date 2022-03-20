import client from "../config/DB";

export type OrderItemSchema = {
  id?: string;
  orderId: string;
  productId: string;
  quantity: number;
};

export default class OrderItem {
  async index(): Promise<OrderItemSchema[]> {
    try {
      const con = await client.connect();
      const sql = `SLECET * FROM orderItem RETURNING *`;
      const result = await con.query(sql);
      const order = result.rows;
      con.release();
      return order;
    } catch (err) {
      throw new Error(`Can not find order items...`);
    }
  }

  async show(id: string): Promise<OrderItemSchema> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM orderItem Where id=$1 RETURNING *`;
      const result = await con.query(sql, [id]);
      const order = result.rows[0];
      con.release();
      return order;
    } catch (err) {
      throw new Error(`Can not fin this order item id....`);
    }
  }

  async create(o: OrderItemSchema): Promise<OrderItemSchema> {
    try {
      const con = await client.connect();
      const sql = `INSERT INTO orderItem(orderId,productId,quantity) VALUES($1,$2,$3) RETURNING *`;
      const result = await con.query(sql, [o.orderId, o.productId, o.quantity]);
      const order = result.rows[0];
      con.release();
      return order;
    } catch (err) {
      throw new Error(`Can not create this order item id....`);
    }
  }

  async update(id: string, o: OrderItemSchema): Promise<OrderItemSchema> {
    try {
      const con = await client.connect();
      const sql = `UPDATE  orderItem SET orderId=$1 ,productId= $2, quantity=$3 WHERE id=$4 RETURNING *`;
      const result = await con.query(sql, [o.orderId, o.productId, o.quantity]);
      const order = result.rows[0];
      con.release();
      return order;
    } catch (err) {
      throw new Error(`Can not update this order item ....`);
    }
  }

  async delete(id: string): Promise<OrderItemSchema> {
    try {
      const con = await client.connect();
      const sql = `delete * FROM orderItem Where id=$1 RETURNING *`;
      const result = await con.query(sql, [id]);
      const order = result.rows[0];
      con.release();
      return order;
    } catch (err) {
      throw new Error(`Can not delete this order item id....`);
    }
  }
}
