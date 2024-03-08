"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const login = (req, res, next) => {
    try {
        const decode = (0, jsonwebtoken_1.verify)(req.headers.authorization, process.env.SECRET);
        req.user = decode;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Not authorized" });
    }
};
exports.login = login;
// Line 2 - It'll try to do a thing if it can't do something
// Line 8 - Will appear our token uncrypted
// Line 10 - To continue, in this code is verify if the token is valid
// This file it'll verify if the user token is correct
