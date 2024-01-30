"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const UserRepository_1 = require("../modules/user/repositories/UserRepository");
const login_1 = require("../middleware/login");
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
const userRepository = new UserRepository_1.UserRepository();
userRoutes.post("/sign-up", (request, response) => {
  userRepository.create(request, response);
});
userRoutes.post("/sign-in", (request, response) => {
  userRepository.login(request, response);
});
userRoutes.get("/get-user", login_1.login, (request, response) => {
  userRepository.getUser(request, response);
});
