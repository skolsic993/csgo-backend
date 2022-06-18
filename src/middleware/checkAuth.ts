import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }
  return next();
};

export default checkAuth;
