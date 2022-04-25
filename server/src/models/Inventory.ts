import client from "../config/DB";

export type InventorySchema = {
  id?: string;
  quantity: number;
};

export default class Inventory {
  async index(): Promise<InventorySchema[]> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM inventory `;
      const result = await con.query(sql);
      const inv = result.rows;
      con.release();
      return inv;
    } catch (err) {
      throw err;
    }
  }

  async show(id: string): Promise<InventorySchema> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM inventory WHERE id=$1 `;
      const result = await con.query(sql, [id]);
      const inv = result.rows[0];
      con.release();
      return inv;
    } catch (err) {
      throw err;
    }
  }

  async create(i: InventorySchema): Promise<InventorySchema> {
    try {
      const con = await client.connect();
      const sql = `INSERT INTO  inventory (quantity) VALUES($1) `;
      const result = await con.query(sql, [i.quantity]);
      const inv = result.rows[0];
      con.release();
      return inv;
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, i: InventorySchema): Promise<InventorySchema> {
    try {
      const con = await client.connect();
      const sql = `UPDATE inventory SET quantity=$1 WHERE id=$2 `;
      const result = await con.query(sql, [i, id]);
      const inv = result.rows[0];
      con.release();
      return inv;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string): Promise<InventorySchema> {
    try {
      const con = await client.connect();
      const sql = `DELETE * FROM inventory  WHERE id=$1 `;
      const result = await con.query(sql, [id]);
      const inv = result.rows[0];
      con.release();
      return inv;
    } catch (err) {
      throw err;
    }
  }
}
