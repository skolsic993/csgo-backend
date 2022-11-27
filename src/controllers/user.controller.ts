import { Request, Response } from 'express';
import { CreateUserInput } from '../schema/user.schema';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
} from '../services/user.service';
import logger from './../utils/logger';
import { createAccessTokens } from './session.controller';

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  try {
    const user = await createUser(req.body, res);
    // const sessionId = res.locals.user.session;
    // res.cookie('express_jwt', '');
    // await deleteSession({ _id: sessionId }, { valid: false });

    const { accessToken } = await createAccessTokens(user, req);

    res.cookie('express_jwt', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return res.send({ user });
  } catch (error) {
    logger.error(error);

    return res.status(409);
  }
}

export async function getUsersHandler(req: Request, res: Response) {
  try {
    const user = await getUsers();

    return res.send(user);
  } catch (error) {
    logger.error(error);

    return res.status(409);
  }
}

export async function getUserHandler(req: Request, res: Response) {
  try {
    const user = await getUser(req.body, res);

    return res.send(user);
  } catch (error) {
    logger.error(error);

    return res.status(409);
  }
}

export async function deleteUserHandler(req: Request, res: Response) {
  try {
    await deleteUser(req.body);

    res.send('No more');

    return res.status(200);
  } catch (error) {
    logger.error(error);

    return res.status(409);
  }
}
