import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: string | JwtPayload;
}

const login = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const decode: string | JwtPayload = verify(
      req.headers.authorization as string,
      process.env.SECRET as string
      ); 
      req.user = decode;
      next(); 
    } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

export { login };

// Line 2 - It'll try to do a thing if it can't do something
// Line 8 - Will appear our token uncrypted
// Line 10 - To continue, in this code is verify if the token is valid
// This file it'll verify if the user token is correct
