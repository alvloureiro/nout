# Common library

A Typescript simple library with some basics implementation to errors and middlewares.

# How to install

```sh
$ yarn add @alotech/common
```

# How to use

```ts
import express from 'express';
import { errorHandler, NotFoundError } from '@alotech/common';

const app = express();
app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);
app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
```

Above one example of how to use the errorHandler and throw a custom NotFoundError();

## Validate request example

#### Notice this use `express-validator`

```ts
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, BadRequestError } from '@alotech/common';
const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid!'),
    body('password').trim().notEmpty().withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    ...
    ...
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }
    ...
    ...
  }
);

...

```

# Errors

- BadRequestError
- DatabaseConnectionError
- NotAuthorizedError
- NotFoundError
- RequestValidationError

# Middlewares

- errorHandler
