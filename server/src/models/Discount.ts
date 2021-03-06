import client from "../config/DB";

export type DiscountSchema = {
  id?: string;
  title: string;
  discreption: string;
  percent: number;
  active: boolean;
};

export class Discount {
  async index(): Promise<DiscountSchema[]> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM discount `;
      const result = await con.query(sql);
      const discount = result.rows;
      con.release();
      return discount;
    } catch (err) {
      throw err;
    }
  }

  async show(id: string): Promise<DiscountSchema> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM disclount WHERE id=$1 `;
      const result = await con.query(sql, [id]);
      const discount = result.rows[0];
      con.release();
      return discount;
    } catch (err) {
      throw err;
    }
  }

  async create(d: DiscountSchema): Promise<DiscountSchema> {
    try {
      const con = await client.connect();
      const sql = `INSERT INTO discount(title,discreption,percent,active) VALUES($1,$2,$3,$4) `;
      const result = await con.query(sql, [
        d.title,
        d.discreption,
        d.percent,
        d.active,
      ]);
      const discount = result.rows[0];
      con.release();
      return discount;
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, d: DiscountSchema): Promise<DiscountSchema> {
    try {
      const con = await client.connect();
      const sql = `UPDATE discount SET title=$1,discreption=$2,percent=$3,active=$4 WHERE id=$5 `;
      const result = await con.query(sql, [
        d.title,
        d.discreption,
        d.percent,
        d.active,
        id,
      ]);
      const discount = result.rows[0];
      con.release();
      return discount;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string): Promise<DiscountSchema> {
    try {
      const con = await client.connect();
      const sql = `DELETE * FROM discount WHERE id=$1 `;
      const result = await con.query(sql, [id]);
      const discount = result.rows[0];
      con.release();
      return discount;
    } catch (err) {
      throw err;
    }
  }
}
