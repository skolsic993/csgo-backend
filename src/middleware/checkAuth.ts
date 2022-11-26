import { Request, Response, NextFunction } from 'express';
import config from 'config';

import jwt from 'jsonwebtoken';

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.express_jwt;

  if (!token) {
    return res.send({ name: null, authenticated: false });
  }

  jwt.verify(
    token,
    config.get<string>('privateKey'),
    { algorithms: ['RS256'] },
    (error: any, decodedToken: any) => {
      res.locals.user = decodedToken;
    }
  );
  return next();
};

export default checkAuth;
