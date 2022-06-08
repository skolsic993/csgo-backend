import { Request, Response } from 'express';
import axios from 'axios';
import config from 'config';
import { Tournament } from '../models/tournament.model';

export async function getAllTournaments(
  req: Request,
  res: Response
): Promise<Response<Tournament[]>> {
  const key = config.get<string>('key');

  try {
    const response = await axios.get(
      `https://api.pandascore.co/csgo/tournaments?token=${key}`
    );

    const parsedTournaments = getParsedTournaments(response.data);

    return res.send(parsedTournaments);
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
