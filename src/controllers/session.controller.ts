import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import deleteSession, {
  createSession,
  findSession,
} from '../services/session.service';
import { validatePassword } from '../services/user.service';
import { signJwt } from '../utils/jwt.utils';
import config from 'config';

export async function createUserSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body.email, req.body.password);

  if (!user) {
    return res.status(401).send('Invalid email or password!');
  }

  const session = await findSession({ user: user._id });

  if(session === null) {
    const { accessToken, refreshToken } = await createAccessTokens(
      user,
      req
    );
  
    res.cookie('express_jwt', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
  
    return res.send({ accessToken, refreshToken });
  } else {
    res.send('You are already logged in!');
  }
}

export async function checkUserAuth(req: Request, res: Response) {
  const userId = res.locals.user;
  const sessions = await findSession({ user: userId });

  return sessions ?
    res.send({
      name: userId.name || null,
      authenticated: sessions?.valid || false,
    })
  : res.send({ name: null, authenticated: false });
  
}

export async function createAccessTokens(user: any, req: Request) {
  const session = await createSession(user._id, req.get('user-agent') || '');
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get('accessTokenTime') }
  );
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get('refreshTokenTime') }
  );

  return {
    accessToken,
    refreshToken,
  };
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const sessions = await findSession({ user: userId, authentication: true });

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  res.cookie('express_jwt', '');
  await deleteSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
