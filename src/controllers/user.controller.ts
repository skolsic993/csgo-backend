import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import deleteSession, { findSession } from "../services/session.service";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
} from "../services/user.service";
import logger from "./../utils/logger";
import { createAccessTokens, userLogin } from "./session.controller";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body, res);

    const { accessToken } = await createAccessTokens(user, req);

    res.cookie("express_jwt", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    const session = await findSession({ user: user });

    if (session === null) {
      userLogin(user, req, res);
    } else {
      res.cookie("express_jwt", "");
      await deleteSession({ _id: session._id }, { valid: false });

      userLogin(user, req, res);
    }
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

    res.send("No more");

    return res.status(200);
  } catch (error) {
    logger.error(error);

    return res.status(409);
  }
}
