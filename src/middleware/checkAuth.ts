import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req;

  return next();
};

export default checkAuth;
