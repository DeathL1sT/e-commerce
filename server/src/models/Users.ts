import client from "../config/DB";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Premission } from "./Premissions";
import { DatabaseError } from "pg";
import UsernameAlreadyExistsError from "../errors/UsernameAlreadyExistsError";
import UserNotFoundError from "../errors/UserNotFoundError";
import InvaildUsernameOrPasswordError from "../errors/InvaildUsernameOrPasswordError";

export type UserSchema = {
  id?: number;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  telephone: string;
  premissions: Premission;
};

export default class User {
  async index(): Promise<UserSchema[]> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM users`;
      const result = await con.query(sql);
      const user = result.rows;
      con.release();
      return user;
    } catch (err) {
      throw err;
    }
  }

  async show(id: number): Promise<UserSchema> {
    const con = await client.connect();
    const sql = `SELECT * FROM users WHERE id=$1`;
    const result = await con.query(sql, [id]);
    if (result.rowCount <= 0) {
      throw new UserNotFoundError();
    }
    const user = result.rows[0];
    con.release();
    return user;
  }

  async create(u: UserSchema): Promise<UserSchema> {
    try {
      const con = await client.connect();
      const sql = `INSERT INTO users(userName,password,firstName,lastName,telephone) VALUES($1,$2,$3,$4,$5) `;
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
      if (err instanceof DatabaseError) {
        if (err.code === "23505") {
          throw new UsernameAlreadyExistsError();
        }
      }

      throw err;
    }
  }

  async update(id: string, u: UserSchema): Promise<UserSchema> {
    try {
      const con = await client.connect();
      const sql = `update  users SET firstName=$1 , lastName=$2 , telephone=$3 WHERE id=$4 `;
      const result = await con.query(sql, [
        u.firstName,
        u.lastName,
        u.telephone,
        u.id,
      ]);
      const user = result.rows[0];
      con.release();
      return user;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string): Promise<UserSchema> {
    try {
      const con = await client.connect();
      const sql = `delete * FROM users WHERE id=$1 `;
      const result = await con.query(sql, [id]);
      const user = result.rows[0];
      con.release();
      return user;
    } catch (err) {
      throw err;
    }
  }

  async login(userName: string, password: string): Promise<string> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE userName=($1)";
      const result = await conn.query(sql, [userName]);
      conn.release();

      if (result.rowCount === 0) {
        throw new InvaildUsernameOrPasswordError();
      }

      const user = result.rows[0] as UserSchema;
      if (!bcrypt.compareSync(password, user.password)) {
        throw new InvaildUsernameOrPasswordError();
      }

      const token = jwt.sign(
        { userId: user.id, prem: user.premissions },
        process.env.SECRET_TOKEN as string,
        { expiresIn: "7d" }
      );

      return token;
    } catch (err) {
      throw err;
    }
  }
}
