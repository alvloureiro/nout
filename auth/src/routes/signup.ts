import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, BadRequestError } from '@alotech/common';
import { User } from '../schemas/user';
import jwt from 'jsonwebtoken';

type SessionObject = CookieSessionInterfaces.CookieSessionObject;

const router = express.Router();

/**
 * Route to handle all requests to register a new user over database
 *
 * @param
 */
router.post(
  '/api/auth/signup',
  [
    body('username').isString().notEmpty().withMessage('Username could not be empty'),
    body('email').isEmail().withMessage('Email must be valid!'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 10 })
      .withMessage('Password should be between 4 and 10 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, email, password, profile } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new BadRequestError('Invalid credentials, username already in use!');
    }

    const user = User.build({ username, email, password });
    await user.save();

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

    res.status(201).send(user);
  }
);

export { router as signup };
