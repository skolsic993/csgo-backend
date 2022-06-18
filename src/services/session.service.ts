import { FilterQuery, UpdateQuery } from 'mongoose';
import SessionModel, { SessionDocument } from '../models/session.model';
import { signJwt, verifyJwt } from '../utils/jwt.utils';
import { get } from 'lodash';
import { findUser } from './user.service';
import config from 'config';

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

export async function findSession(
  query: FilterQuery<SessionDocument>
): Promise<SessionDocument> {
  return SessionModel.findOne(query).lean();
}

export default function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.deleteOne(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, 'session')) return 'Access token is not valid!';

  const session = await SessionModel.findById(get(decoded, 'session'));

  if (!session || !session.authentication) return 'Access token is not valid!';

  const user = await findUser({ _id: session.user });

  if (!user) return "Can't find a user!";

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get('accessTokenTime') }
  );

  return accessToken;
}
