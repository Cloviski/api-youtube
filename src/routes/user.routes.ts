import { Request, Response, Router } from "express";
import { UserRepository } from "../modules/user/repositories/UserRepository";
import { login } from "../middleware/login";

const userRoutes: Router = Router();
const userRepository = new UserRepository();

userRoutes.post("/sign-up", (request: Request, response: Response) => {
  userRepository.create(request, response);
});

userRoutes.post("/sign-in", (request: Request, response: Response) => {
  userRepository.login(request, response);
});

userRoutes.get("/get-user", login, (request: Request, response: Response) => {
  userRepository.getUser(request, response);
});

export { userRoutes };
