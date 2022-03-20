import client from "../config/DB";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
export type UserSchema = {
  id?: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  telephone: string;
};

export default class User {
  async index(): Promise<UserSchema[]> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM users RETRNING *`;
      const result = await con.query(sql);
      const user = result.rows;
      con.release();
      return user;
    } catch (err) {
      throw new Error(`Can not find any user info`);
    }
  }

  async show(id: string): Promise<UserSchema> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM users WHERE id=$1 RETRNING *`;
      const result = await con.query(sql, [id]);
      const user = result.rows[0];
      con.release();
      return user;
    } catch (err) {
      throw new Error(`Can not find any user info`);
    }
  }

  async create(u: UserSchema): Promise<UserSchema> {
    try {
      const con = await client.connect();
      const sql = `INSERT INTO users(userName,password,firstName,lastName,telephone) VALUES($1,$2,$3,$4,$5) RETRNING *`;
      const hash = bcrypt.hashSync(
        u.password,
        +(process.env.SALT_ROUND as string)
      );
      const result = await con.query(sql, [
        u.userName,
        hash,
        u.firstName,
        u.lastName,
        u.telephone,
      ]);
      const user = result.rows[0];
      con.release();
      return user;
    } catch (err) {
      throw new Error(`Can not create this user ....`);
    }
  }

  async update(id: string, u: UserSchema): Promise<UserSchema> {
    try {
      const con = await client.connect();
      const sql = `update  users SET password=$1 , firstName=$2 , lastName=$3 , telephone=$4 WHERE id=$5 RETRNING *`;
      const result = await con.query(sql, [
        u.password,
        u.firstName,
        u.lastName,
        u.telephone,
        u.id,
      ]);
      const user = result.rows[0];
      con.release();
      return user;
    } catch (err) {
      throw new Error(`Can not update  user info`);
    }
  }

  async delete(id: string): Promise<UserSchema> {
    try {
      const con = await client.connect();
      const sql = `delete * FROM users WHERE id=$1 RETRNING *`;
      const result = await con.query(sql, [id]);
      const user = result.rows[0];
      con.release();
      return user;
    } catch (err) {
      throw new Error(`Can not delete  user info....`);
    }
  }

  async login(userName: string, password: string): Promise<string> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE userName=($1)";
      const result = await conn.query(sql, [userName]);
      conn.release();

      if (result.rowCount === 0) {
        throw new Error("invalid user name or password");
      }

      const user = result.rows[0] as UserSchema;
      if (!bcrypt.compareSync(password, user.password)) {
        throw new Error("invalid email or password");
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.SECRET_TOKEN as string,
        { expiresIn: "7d" }
      );

      return token;
    } catch (err) {
      throw new Error("invalid email or password");
    }
  }
}
