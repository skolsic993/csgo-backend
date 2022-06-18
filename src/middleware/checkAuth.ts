import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req;

  res.send(authHeader);

  if ('sa' === undefined) {
    return res.sendStatus(401);
  }

  return next();
};

export default checkAuth;
