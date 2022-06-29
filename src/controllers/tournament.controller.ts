import { Request, Response } from 'express';
import axios from 'axios';
import config from 'config';
import { Tournament } from '../models/tournament.model';

const token = config.get<string>('token');

export async function getAllTournaments(
  req: Request,
  res: Response
): Promise<Response<Tournament[]>> {
  const url = 'https://open.faceit.com/data/v4/search/tournaments';

  try {
    const response = await axios.get(
      `${url}?name=${req.params.name}`, {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    return res.send(response.data);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getTournamentOrganizer(
  req: Request,
  res: Response
): Promise<any> {
  const url = 'https://open.faceit.com/data/v4/organizers';

  try {
    const response = await axios.get(
      `${url}?name=${req.params.id}`, {
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
