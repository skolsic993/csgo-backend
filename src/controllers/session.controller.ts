import config from "config";
import { Request, Response } from "express";
import deleteSession, {
  createSession,
  findSession,
} from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJwt } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body.email, req.body.password);

  if (!user) {
    return res.status(401).send("Invalid email or password!");
  }

  const session = await findSession({ user: user._id });

  if (session === null) {
    userLogin(user, req, res);
  } else {
    res.cookie("express_jwt", "");
    await deleteSession({ _id: session._id }, { valid: false });

    userLogin(user, req, res);
  }
}

export async function userLogin(user: any, req: Request, res: Response) {
  const { accessToken, refreshToken } = await createAccessTokens(user, req);

  res.cookie("express_jwt", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.send({ user, accessToken, refreshToken });
}

export async function checkUserAuth(req: Request, res: Response) {
  const userId = res.locals.user;
  const sessions = await findSession({ user: userId });

  return sessions
    ? res.send({
        name: userId.name || null,
        authenticated: sessions?.valid || false,
        nick: userId.nick || null,
      })
    : res.send({ name: null, authenticated: false });
}

export async function createAccessTokens(user: any, req: Request) {
  const session = await createSession(user._id, req.get("user-agent") || "");
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTime") }
  );
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("refreshTokenTime") }
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

  res.cookie("express_jwt", "");
  await deleteSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
