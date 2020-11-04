import { Request, Response, NextFunction } from 'express';
import { UserIface } from '../ifaces';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      loggedUser?: UserIface;
    }
  }
}

export const currentUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserIface;
    req.loggedUser = payload;
  } catch (error) {}

  next();
};
