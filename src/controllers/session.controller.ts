import { Request, Response } from 'express';
import updateSession, {
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

  const { accessToken, refreshToken } = await createAccessAndRefreshTokens(
    user,
    req
  );

  res.cookie('express:jwt.sign', accessToken, {
    httpOnly: true,
    sameSite: 'none',
  });

  return res.send({ accessToken, refreshToken });
}

export async function checkUserAuth(req: Request, res: Response) {
  const userId = res.locals.user;
  const sessions = await findSession({ user: userId });

  return sessions
    ? res.send({
        name: userId.name || null,
        authenticated: sessions?.valid || false,
      })
    : res.send({ name: null, authenticated: false });
}

export async function createAccessAndRefreshTokens(user: any, req: Request) {
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

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
