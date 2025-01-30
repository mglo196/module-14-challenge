import { Router, Request, Response } from 'express';

const apiRouter = Router();

// Example of a protected API route
apiRouter.get('/protected', (req: Request, res: Response) => {
  // `req.user` is populated by the `authenticateToken` middleware
  res.json({ message: `Hello ${req.user?.username}, this is a protected API route!` });
});

// Other routes...
apiRouter.get('/public', (req: Request, res: Response) => {
  res.json({ message: 'This is a public API route.' });
});

export default apiRouter;

