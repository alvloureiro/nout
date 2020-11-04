import express, { Request, Response } from 'express';

const router = express.Router();

/**
 * Route to put user logs out
 */
router.post('/api/auth/logout', (req: Request, res: Response) => {
  req.session = null;
  res.send({});
});

export { router as logout };
