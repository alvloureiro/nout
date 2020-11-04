import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { validateRequest, BadRequestError } from '@alotech/common';
import { User } from '../schemas/user';
import { HashPassword } from '../services/hash-password';

const router = express.Router();

type SessionObject = CookieSessionInterfaces.CookieSessionObject;

/**
 * Route to handle an previous recorded user
 *
 * @param
 */
router.post(
  '/api/auth/login',
  [
    body('username').isString().notEmpty().withMessage('username must be provided'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('password should be between 4 and 10 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw new BadRequestError('Invalid Credentials!');
    }

    const passwordMatch = await HashPassword.compare(user.password, password);
    if (!passwordMatch) {
      throw new BadRequestError('Password did not match');
    }

    // generate jwt
    const userJwt = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    const curSession: SessionObject = {
      jwt: userJwt,
    };

    req.session = curSession;

    res.status(200).send(user);
  }
);

export { router as login };
