"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const login = (req, res, next) => {
    try {
        //It'll try to do a thing if it can't do something
        const decode = (0, jsonwebtoken_1.verify)(req.headers.authorization, process.env.SECRET); // Will appear our token uncrypted
        req.user = decode;
        next(); //To continue, in this code is verify if the token is valid
    }
    catch (error) {
        return res.status(401).json({ message: "Not authorized" });
    }
};
exports.login = login;
//This file it'll verify if the user token is correct
