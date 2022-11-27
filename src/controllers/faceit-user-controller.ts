import axios from 'axios';
import config from 'config';
import { Request, Response } from 'express';

const token = config.get<string>('token');

export async function getUserByNickname(
  req: Request,
  res: Response
): Promise<any> {
  const url = 'https://open.faceit.com/data/v4/players';

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
  const url = 'https://open.faceit.com/data/v4/players';

  try {
    const response = await axios.get(`${url}/${req.params.id}/stats/csgo`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.send(response.data);
  } catch (error: any) {
    throw new Error(error);
  }
}
