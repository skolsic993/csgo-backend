import { Express } from "express";
import { getChampionships } from "./controllers/championship-controller";
import {
  getFriendsList,
  getPlayerById,
  getRanks,
  getUserByNickname,
  getUserHubs,
  getUserStats,
} from "./controllers/faceit-user-controller";
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
    "/api/championships",
    [deserializeUser, requireUser],
    getChampionships
  );
  app.get(
    "/api/tournaments/:id/details",
    [deserializeUser, requireUser],
    getTournamentDetails
  );

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

  app.get("/api/hubs/:id", [deserializeUser, requireUser], getUserHubs);

  app.get("/api/ranks/:id", [deserializeUser, requireUser], getRanks);
}

export default routes;
