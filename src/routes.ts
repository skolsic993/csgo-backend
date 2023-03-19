import { Express } from "express";
import {
  getChampionshipDetails,
  getChampionships,
  getChampionshipSubscriptions,
} from "./controllers/championship-controller";
import {
  getFriendsList,
  getPlayerById,
  getRanks,
  getUserByNickname,
  getUserHubs,
  getUserStats,
} from "./controllers/faceit-user-controller";
import { getMatchDetails, getMatches } from "./controllers/matches-controller";
import {
  checkUserAuth,
  createUserSessionHandler,
  deleteSessionHandler,
} from "./controllers/session.controller";
import {
  getAllTournaments,
  getTournamentDetails,
  getTournamentOrganizer,
  getTournaments,
} from "./controllers/tournament.controller";
import {
  createUserHandler,
  getCurrentUser,
  getUserHandler,
} from "./controllers/user.controller";
import deserializeUser from "./middleware/deserializeUser";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  //Auth
  app.post("/api/user", getUserHandler);

  app.post(
    "/api/auth/signup",
    [deserializeUser, validateResource(createUserSchema)],
    createUserHandler
  );
  app.post(
    "/api/auth/signin",
    [deserializeUser, validateResource(createSessionSchema)],
    createUserSessionHandler
  );
  app.post(
    "/api/auth/signout",
    [deserializeUser, requireUser],
    deleteSessionHandler
  );
  app.get("/api/auth/signedin", [deserializeUser], checkUserAuth);

  //Tournament
  app.get("/api/tournaments", [deserializeUser, requireUser], getTournaments);
  app.get(
    "/api/tournaments/:name",
    [deserializeUser, requireUser],
    getAllTournaments
  );
  app.get(
    "/api/tournaments/organizer/:id",
    [deserializeUser, requireUser],
    getTournamentOrganizer
  );
  app.get(
    "/api/tournaments/:id/details",
    [deserializeUser, requireUser],
    getTournamentDetails
  );

  //Championship
  app.get(
    "/api/championships",
    [deserializeUser, requireUser],
    getChampionships
  );
  app.get(
    "/api/championships/:id/details",
    [deserializeUser, requireUser],
    getChampionshipDetails
  );
  app.get(
    "/api/championships/:id/subscriptions",
    [deserializeUser, requireUser],
    getChampionshipSubscriptions
  );

  //Matches
  app.get("/api/matches/:id", [deserializeUser, requireUser], getMatches);
  app.get(
    "/api/matches/:id/details",
    [deserializeUser, requireUser],
    getMatchDetails
  );

  //Faceit Account
  app.get("/api/me", [deserializeUser, requireUser], getCurrentUser);
  app.get(
    "/api/nickname/:name",
    [deserializeUser, requireUser],
    getUserByNickname
  );
  app.get("/api/stats/:id", [deserializeUser, requireUser], getUserStats);
  app.get("/api/players/:id", [deserializeUser, requireUser], getPlayerById);
  app.get(
    "/api/friends/:friends",
    [deserializeUser, requireUser],
    getFriendsList
  );

  //Hubs
  app.get("/api/hubs/:id", [deserializeUser, requireUser], getUserHubs);

  //Ranks
  app.get("/api/ranks/:id", [deserializeUser, requireUser], getRanks);
}

export default routes;
