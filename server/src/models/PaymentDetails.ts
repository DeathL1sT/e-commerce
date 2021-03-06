import client from "../config/DB";

export type PaymentDeatilsSchema = {
  id?: string;
  orderId: string;
  amount: number;
  provider: string;
  status: string;
};

export default class PaymentDetails {
  async index(): Promise<PaymentDeatilsSchema[]> {
    try {
      const con = await client.connect();
      const sql = `SLECET * FROM paymentDetails `;
      const result = await con.query(sql);
      const pay = result.rows;
      con.release();
      return pay;
    } catch (err) {
      throw err;
    }
  }

  async show(id: string): Promise<PaymentDeatilsSchema> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM paymentDetails Where id=$1 `;
      const result = await con.query(sql, [id]);
      const order = result.rows[0];
      con.release();
      return order;
    } catch (err) {
      throw err;
    }
  }

  async create(p: PaymentDeatilsSchema): Promise<PaymentDeatilsSchema> {
    try {
      const con = await client.connect();
      const sql = `INSERT INTO paymentDetails(orderId,amount,provider,status) VALUES($1,$2,$3,$4) `;
      const result = await con.query(sql, [
        p.orderId,
        p.amount,
        p.provider,
        p.status,
      ]);
      const pay = result.rows[0];
      con.release();
      return pay;
    } catch (err) {
      throw err;
    }
  }

  async update(
    id: string,
    p: PaymentDeatilsSchema
  ): Promise<PaymentDeatilsSchema> {
    try {
      const con = await client.connect();
      const sql = `UPDATE  paymentDetails SET orderId=$1 ,amount= $2 ,provider=$3, status=$4 WHERE id=$5 `;
      const result = await con.query(sql, [
        p.orderId,
        p.amount,
        p.provider,
        p.status,
        p.id,
      ]);
      const pay = result.rows[0];
      con.release();
      return pay;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string): Promise<PaymentDeatilsSchema> {
    try {
      const con = await client.connect();
      const sql = `delete * FROM paymentDetails Where id=$1 `;
      const result = await con.query(sql, [id]);
      const pay = result.rows[0];
      con.release();
      return pay;
    } catch (err) {
      throw err;
    }
  }
}
