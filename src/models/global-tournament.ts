export interface GlobalTournament {
  tournament_id: string;
  name: string;
  featured_image: string;
  game_id: string;
  region: string;
  status: string;
  custom: boolean;
  invite_type: string;
  prize_type: string;
  total_prize: string;
  team_size: number;
  min_skill: number;
  max_skill: number;
  match_type: string;
  organizer_id: string;
  whitelist_countries: string[];
  membership_type: string;
  number_of_players: number;
  number_of_players_joined: number;
  number_of_players_checkedin: number;
  number_of_players_participants: number;
  anticheat_required: boolean;
  started_at: number;
  subscriptions_count: number;
  faceit_url: string;
}
