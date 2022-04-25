import client from "../config/DB";

export type UserPaymentSchema = {
  id?: string;
  userId: string;
  paymentType: string;
  provider: string;
  accountNum: string;
  expire: Date;
};

export default class UserPayment {
  async index(): Promise<UserPayment[]> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM userPayment`;
      const result = await con.query(sql);
      const data = result.rows;
      con.release();
      return data;
    } catch (err) {
      throw err;
    }
  }

  async show(id: string): Promise<UserPayment> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM userPayment WHERE id=$1 `;
      const result = await con.query(sql, [id]);
      const data = result.rows[0];
      con.release();
      return data;
    } catch (err) {
      throw err;
    }
  }

  async create(u: UserPaymentSchema): Promise<UserPayment> {
    try {
      const con = await client.connect();
      const sql = `INSERT INTO userPayment (userId,paymentType,provider,accountNum,expire) VALUES($1,$2,$3,$4,$5) `;
      const result = await con.query(sql, [
        u.userId,
        u.paymentType,
        u.provider,
        u.accountNum,
        u.expire,
      ]);
      const data = result.rows[0];
      con.release();
      return data;
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, u: UserPaymentSchema): Promise<UserPayment> {
    try {
      const con = await client.connect();
      const sql = `UPDATE  userPayment SET userId=$1,paymentType=$2,provider=$3,accountNum=$4,expire=$5) WHERE id=$6 RETURNING *`;
      const result = await con.query(sql, [
        u.userId,
        u.paymentType,
        u.provider,
        u.accountNum,
        u.expire,
        u.id,
      ]);
      const data = result.rows[0];
      con.release();
      return data;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string): Promise<UserPayment> {
    try {
      const con = await client.connect();
      const sql = `DELETE * FROM userPayment WHERE id=$1 RETURNING *`;
      const result = await con.query(sql, [id]);
      const data = result.rows[0];
      con.release();
      return data;
    } catch (err) {
      throw err;
    }
  }
}
