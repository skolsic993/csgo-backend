import { League } from './league.model';
import { Tournament } from './tournament.model';

export interface Serie {
  id: number;
  begin_at: string;
  end_at: string;
  league: League;
  tournaments: Tournament;
  winner_id: number;
  year: number;
}
