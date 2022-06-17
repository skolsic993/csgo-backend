import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  console.log(token);
  return next();
};

export default checkAuth;