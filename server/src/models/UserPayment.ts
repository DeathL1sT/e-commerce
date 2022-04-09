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
      const sql = `SELECT * FROM userPayment RETURNING *`;
      const result = await con.query(sql);
      const data = result.rows;
      con.release();
      return data;
    } catch (err) {
      throw new Error(`Can not find paymment data...`);
    }
  }

  async show(id: string): Promise<UserPayment> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM userPayment WHERE id=$1 RETURNING *`;
      const result = await con.query(sql, [id]);
      const data = result.rows[0];
      con.release();
      return data;
    } catch (err) {
      throw new Error(`Can not find paymment data for this user...`);
    }
  }

  async create(u: UserPaymentSchema): Promise<UserPayment> {
    try {
      const con = await client.connect();
      const sql = `INSERT INTO userPayment (userId,paymentType,provider,accountNum,expire) VALUES($1,$2,$3,$4,$5) RETURNING *`;
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
      throw new Error(`Can not create paymment data for this user...`);
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
      throw new Error(`Can not update paymment data for this user...`);
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
      throw new Error(`Can not delete paymment data for this user...`);
    }
  }
}
