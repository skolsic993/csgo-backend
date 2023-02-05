import { League } from './league.model';
import { Match } from './match.model';
import { Serie } from './serie.model';
import { Team } from './team.model';

export interface Tournament {
  id: number;
  begin_at: string;
  end_at: string;
  league: League;
  live_supported: boolean;
  serie: Serie;
  teams: Team[];
  matches: Match[];
}
