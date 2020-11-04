import express, { Request, Response } from 'express';
import { UnAuthorizedError } from '@alotech/common';
import { User } from '../schemas/user';
import { isAuthenticated } from '../middlewares/is-authenticated';
import { currentUserMiddleware } from '../middlewares/current-user';

const router = express.Router();

router.get(
  '/api/auth/current',
  isAuthenticated,
  currentUserMiddleware,
  async (req: Request, res: Response) => {
    const currentUser = req.loggedUser;
    if (!currentUser) {
      throw new UnAuthorizedError();
    }

    const existingUser = await User.findOne({ username: currentUser.username });
    if (!existingUser) {
      throw new UnAuthorizedError();
    }

    res.status(200).send(existingUser);
  }
);

export { router as currentUser };
