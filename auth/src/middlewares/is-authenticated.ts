import { Request, Response, NextFunction } from 'express';
import { UnAuthorizedError } from '@alotech/common';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    throw new UnAuthorizedError();
  }

  next();
};
