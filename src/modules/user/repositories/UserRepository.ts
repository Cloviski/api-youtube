import { pool } from "../../../mysql";
import { v4 as uuidv4 } from "uuid";
import { hash, compare } from "bcrypt";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { Request, Response } from "express";
import { MysqlError, PoolConnection } from "mysql";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class UserRepository {
  create(request: Request<any, any, UserRequest>, response: Response) {
    const { name, email, password } = request.body;
    pool.getConnection((_err: MysqlError, connection: PoolConnection) => {
      hash(password, 10, (err, hash) => {
        if (err) {
          return response.status(400).json(err);
        }

        connection.query(
          "INSERT INTO users (user_id, name, email, password) VALUES (?,?,?,?)",
          [uuidv4(), name, email, hash],
          (queryError: MysqlError | null, _result: any, _fields: any) => {
            connection.release();
            if (queryError) {
              return response.status(400).json(queryError);
            }
            response.status(200).json({ message: "User created" });
          }
        );
      });
    });
  }

  login(request: Request<any, any, UserRequest>, response: Response) {
    const { email, password } = request.body;
    pool.getConnection((_err: any, connection: any) => {
      connection.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (queryError: MysqlError | null, results: any, _fields: any) => {
          connection.release();
          if (queryError) {
            return response
              .status(400)
              .json({ error: "There's an error on your authentication!" });
          }

          compare(password, results[0].password, (err, result) => {
            if (err) {
              return response
                .status(400)
                .json({ error: "There's an error on your authentication!" });
            }

            if (result) {
              const token = sign(
                {
                  id: results[0].user_id,
                  email: results[0].email,
                },
                process.env.SECRET as string,
                { expiresIn: "1d" }
              );

              return response
                .status(200)
                .json({ token: token, message: "Authentition success" });
            }
          });
        }
      );
    });
  }

  getUser(request: Request, response: Response) {
    const decode = verify(
      request.headers.authorization as string,
      process.env.SECRET as string
    ) as JwtPayload;
    if (decode.email) {
      pool.getConnection((_error, conn) => {
        conn.query(
          "SELECT * FROM users WHERE email=?",
          [decode.email],
          (queryError: MysqlError | null, result: any[], _fields) => {
            conn.release();
            if (queryError) {
              return response.status(400).send({
                user: {
                  error: queryError.message,
                  response: null,
                },
              });
            }

            return response.status(201).send({
              user: {
                name: result[0].name,
                email: result[0].email,
                id: result[0].user_id,
              },
            });
          }
        );
      });
    }
  }
}

export { UserRepository };
