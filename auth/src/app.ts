import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';

import { signup } from './routes/signup';
import { login } from './routes/login';
import { logout } from './routes/logout';
import { currentUser } from './routes/current-user';
import { NotFoundError, errorHandler } from '@alotech/common';

const app = express();

app.enable('trust proxy');
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true, //process.env.NODE_ENV !== 'test',
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(login);
app.use(logout);
app.use(signup);
app.use(currentUser);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
