import { Request, Response } from 'express';
import logger from './../utils/logger';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
} from '../services/user.service';
import { CreateUserInput } from '../schema/user.schema';

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  try {
    const user = await createUser(req.body, res);

    return res.send(user);
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
    const user = await getUser(req.body);

    return res.send(user);
  } catch (error) {
    logger.error(error);

    return res.status(409);
  }
}

export async function deleteUserHandler(req: Request, res: Response) {
  try {
    await deleteUser(req.body);

    res.send('No mroe');

    return res.status(200);
  } catch (error) {
    logger.error(error);

    return res.status(409);
  }
}
