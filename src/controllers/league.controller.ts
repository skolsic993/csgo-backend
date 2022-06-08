import { Request, Response } from 'express';
import axios from 'axios';
import config from 'config';
import { League } from '../models/league.model';

export async function getAllLeagues(req: Request, res: Response) {
  const key = config.get<string>('key');

  try {
    const response = await axios.get(
      `https://api.pandascore.co/csgo/leagues?token=${key}`
    );

    const parsedLeagues = getParsedLeagues(response.data);

    return res.send(parsedLeagues);
  } catch (error: any) {
    throw new Error(error);
  }
}

function getParsedLeagues(leagues: League[]): League[] {
  return leagues.map((league) => {
    const { id, image_url, name, series, url } = league;

    return {
      id,
      image_url,
      name,
      series,
      url,
    };
  });
}
