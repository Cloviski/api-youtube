import { verify } from "jsonwebtoken";

const login = (req: any, res: any, next: any) => {
  try {
    //It try to do a thing if it can't do something
    const decode = verify(
      req.headers.authorization,
      process.env.SECRET as string
    ); // Will appear our token uncrypted
    req.user = decode;
    next(); //To continue, in this code is verify if the token is valid
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

export { login };

//This file it'll verify if the user token is correct
