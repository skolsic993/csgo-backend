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
