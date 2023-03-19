import axios from "axios";
import config from "config";
import { Request, Response } from "express";

const token = config.get<string>("token");

export async function getMatches(req: Request, res: Response): Promise<any> {
  const url = "https://open.faceit.com/data/v4/players";

  try {
    const response = await axios.get(
      `${url}/${req.params.id}/history?game=csgo&offset=0&limit=10`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.send(response.data);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getMatchDetails(
  req: Request,
  res: Response
): Promise<any> {
  const url = "https://open.faceit.com/data/v4/matches";

  try {
    const response = await axios.get(`${url}/${req.params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.send(response.data);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getMatchStats(req: Request, res: Response): Promise<any> {
  const url = "https://open.faceit.com/data/v4/matches";

  try {
    const response = await axios.get(`${url}/${req.params.id}/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.send(response.data);
  } catch (error: any) {
    throw new Error(error);
  }
}
