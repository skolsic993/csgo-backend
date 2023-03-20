import axios from "axios";
import { Request, Response } from "express";
import config from "./../config/default";

const token = config?.token;

export async function getUserByNickname(
  req: Request,
  res: Response
): Promise<any> {
  const url = "https://open.faceit.com/data/v4/players";

  try {
    const response = await axios.get(`${url}?nickname=${req.params.name}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.send(response.data);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getUserStats(req: Request, res: Response): Promise<any> {
  const url = "https://open.faceit.com/data/v4/players";

  try {
    const response = await axios.get(`${url}/${req.params.id}/stats/csgo`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.send(response.data);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getRanks(req: Request, res: Response): Promise<any> {
  const url = "https://open.faceit.com/data/v4/rankings/games/csgo/regions";

  try {
    const response = await axios.get(`${url}/${req.params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.send(response.data);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getPlayerById(req: Request, res: Response): Promise<any> {
  const url = "https://open.faceit.com/data/v4/players";

  try {
    const response = await axios.get(`${url}/${req.params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.send(response.data);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getFriendsList(
  req: Request,
  res: Response
): Promise<any> {
  const url = "https://open.faceit.com/data/v4/players";
  const ids = req.params.friends.split("&&");

  try {
    let friendsList: any = await Promise.all(
      ids.map(async (id: string) => {
        const response = await axios.get(`${url}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
      })
    );

    return res.send(friendsList);
  } catch (error: any) {
    throw new Error(error);
  }
}
