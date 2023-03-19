import axios from "axios";
import config from "config";
import { Request, Response } from "express";

const token = config.get<string>("token");

export async function getChampionships(
  req: Request,
  res: Response
): Promise<any> {
  const url = "https://open.faceit.com/data/v4/championships?game=csgo";

  try {
    const response = await axios.get(`${url}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.send(response.data);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getChampionshipDetails(
  req: Request,
  res: Response
): Promise<any> {
  const url = "https://open.faceit.com/data/v4/championships";

  try {
    const response = await axios.get(`${url}/${req.params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.send(response.data);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getChampionshipSubscriptions(
  req: Request,
  res: Response
): Promise<any> {
  const url = "https://open.faceit.com/data/v4/championships";

  try {
    const response = await axios.get(
      `${url}/${req.params.id}/subscriptions?offset=0&limit=10`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.send(response.data);
  } catch (error: any) {
    throw new Error(error);
  }
}
