import client from "../config/DB";

export type UserAddressSchema = {
  id?: string;
  userId: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
  telephone: string;
  mobile: string;
};

export default class UserAddress {
  async index(): Promise<UserAddressSchema[]> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM userAddress RETRNING *`;
      const result = await con.query(sql);
      const user = result.rows;
      con.release();
      return user;
    } catch (err) {
      throw err;
    }
  }

  async show(id: string): Promise<UserAddressSchema> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM userAddress WHERE id=$1 RETRNING *`;
      const result = await con.query(sql, [id]);
      const user = result.rows[0];
      con.release();
      return user;
    } catch (err) {
      throw err;
    }
  }

  async create(u: UserAddressSchema): Promise<UserAddressSchema> {
    try {
      const con = await client.connect();
      const sql = `INSERT INTO userAddress (userId,addressLine1,addressLine2,city,postalCode,country,telephone,mobile) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETRNING *`;
      const result = await con.query(sql, [
        u.userId,
        u.addressLine1,
        u.addressLine2,
        u.city,
        u.postalCode,
        u.country,
        u.telephone,
        u.mobile,
      ]);
      const user = result.rows[0];
      con.release();
      return user;
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, u: UserAddressSchema): Promise<UserAddressSchema> {
    try {
      const con = await client.connect();
      const sql = `UPDATE  userAddress SET userId=$1,addressLine1=$2,addressLine2=$3,city=$4,postalCode=$5,country=$6,telephone=$7,mobile=$8 Where id=$9 RETRNING *`;
      const result = await con.query(sql, [
        u.userId,
        u.addressLine1,
        u.addressLine2,
        u.city,
        u.postalCode,
        u.country,
        u.telephone,
        u.mobile,
        u.id,
      ]);
      const user = result.rows[0];
      con.release();
      return user;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string): Promise<UserAddressSchema> {
    try {
      const con = await client.connect();
      const sql = `DELETE * FROM userAddress WHERE id=$1 `;
      const result = await con.query(sql, [id]);
      const user = result.rows[0];
      con.release();
      return user;
    } catch (err) {
      throw err;
    }
  }
}
