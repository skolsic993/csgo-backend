import { Request, Response } from 'express';
import updateSession, {
  createSession,
  findSessions,
} from '../services/session.service';
import { validatePassword } from '../services/user.service';
import { signJwt } from '../utils/jwt.utils';
import config from 'config';

export async function createUserSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body.email, req.body.password);

  if (!user) {
    return res.status(401).send('Invalid email or password!');
  }

  const { accessToken } = await createAccessAndRefreshTokens(user, req);
  const { refreshToken } = await createAccessAndRefreshTokens(user, req);

  return res.send({ accessToken, refreshToken });
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
  const sessions = await findSessions({ user: userId, authentication: true });

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
