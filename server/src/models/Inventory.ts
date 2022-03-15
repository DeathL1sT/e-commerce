import client from "../config/DB";

export type InventorySchema = {
  id?: string;
  quantity: number;
};

export default class Inventory {
  index = async (): Promise<InventorySchema[]> => {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM inventory RETURNING *`;
      const result = await con.query(sql);
      const inv = result.rows;
      con.release();
      return inv;
    } catch (err) {
      throw new Error(`Can not find any inventory...`);
    }
  };

  show = async (id: string): Promise<InventorySchema> => {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM inventory WHERE id=$1 RETURNING *`;
      const result = await con.query(sql, [id]);
      const inv = result.rows[0];
      con.release();
      return inv;
    } catch (err) {
      throw new Error(`Can not find this inventory id ...`);
    }
  };

  create = async (i: InventorySchema): Promise<InventorySchema> => {
    try {
      const con = await client.connect();
      const sql = `INSERT INTO  inventory (quantity) VALUES($1) RETURNING *`;
      const result = await con.query(sql, [i.quantity]);
      const inv = result.rows[0];
      con.release();
      return inv;
    } catch (err) {
      throw new Error(`Can not create this inventory  ...`);
    }
  };

  update = async (id: string, i: InventorySchema): Promise<InventorySchema> => {
    try {
      const con = await client.connect();
      const sql = `UPDATE inventory SET quantity=$1 WHERE id=$2 RETURNING *`;
      const result = await con.query(sql, [i, id]);
      const inv = result.rows[0];
      con.release();
      return inv;
    } catch (err) {
      throw new Error(`Can not update this inventory id ...`);
    }
  };

  delete = async (id: string): Promise<InventorySchema> => {
    try {
      const con = await client.connect();
      const sql = `DELETE * FROM inventory  WHERE id=$1 RETURNING *`;
      const result = await con.query(sql, [id]);
      const inv = result.rows[0];
      con.release();
      return inv;
    } catch (err) {
      throw new Error(`Can not delete this inventory id ...`);
    }
  };
}
