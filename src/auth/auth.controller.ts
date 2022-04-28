import { Request, Response, NextFunction } from 'express';

const login = (req: Request, res: Response, next: NextFunction) => {
  const { name, password } = req.body;

  res.send({ message: 'Welcome back!' });
}

export { login }