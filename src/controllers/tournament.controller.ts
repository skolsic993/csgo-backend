import { Request, Response } from 'express';
import axios from 'axios';
import config from 'config';
import { Tournament } from '../models/tournament.model';

export async function getAllTournaments(
  req: Request,
  res: Response
): Promise<Response<Tournament[]>> {
  const token = config.get<string>('token');
  const url: string = 'https://open.faceit.com/data/v4/search/tournaments'

  try {
    const response = await axios.get(
      `${url}?name=${req.body.name}`, {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    return res.send(response.data);
  } catch (error: any) {
    throw new Error(error);
  }
}

function getParsedTournaments(tournaments: Tournament[]): Tournament[] {
  return tournaments.map((tournament) => {
    const { id, begin_at, end_at, league, teams, matches, live_supported } =
      tournament;

    return {
      id,
      begin_at,
      end_at,
      league,
      teams,
      matches,
      live_supported,
    } as Tournament;
  });
}
