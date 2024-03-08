"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const mysql_1 = require("../../../mysql");
const uuid_1 = require("uuid");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
class UserRepository {
    create(request, response) {
        const { name, email, password } = request.body;
        mysql_1.pool.getConnection((_err, connection) => {
            (0, bcrypt_1.hash)(password, 10, (err, hash) => {
                if (err) {
                    return response.status(400).json(err);
                }
                connection.query("INSERT INTO users (user_id, name, email, password) VALUES (?,?,?,?)", [(0, uuid_1.v4)(), name, email, hash], (queryError, _result, _fields) => {
                    connection.release();
                    if (queryError) {
                        return response.status(400).json(queryError);
                    }
                    response.status(200).json({ message: "User created" });
                });
            });
        });
    }
    login(request, response) {
        const { email, password } = request.body;
        mysql_1.pool.getConnection((_err, connection) => {
            connection.query("SELECT * FROM users WHERE email = ?", [email], (queryError, results, _fields) => {
                connection.release();
                if (queryError) {
                    return response
                        .status(400)
                        .json({ error: "There's an error on your authentication!" });
                }
                (0, bcrypt_1.compare)(password, results[0].password, (err, result) => {
                    if (err) {
                        return response
                            .status(400)
                            .json({ error: "There's an error on your authentication!" });
                    }
                    if (result) {
                        const token = (0, jsonwebtoken_1.sign)({
                            id: results[0].user_id,
                            email: results[0].email,
                        }, process.env.SECRET, { expiresIn: "1d" });
                        return response
                            .status(200)
                            .json({ token: token, message: "Authentition success" });
                    }
                });
            });
        });
    }
    getUser(request, response) {
        const decode = (0, jsonwebtoken_1.verify)(request.headers.authorization, process.env.SECRET);
        if (decode.email) {
            mysql_1.pool.getConnection((_error, conn) => {
                conn.query("SELECT * FROM users WHERE email=?", [decode.email], (queryError, result, _fields) => {
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
                });
            });
        }
    }
}
exports.UserRepository = UserRepository;
