import { Express } from 'express';
import {
  getFriendsList,
  getPlayerById,
  getUserByNickname,
  getUserHubs,
  getUserStats,
} from './controllers/faceit-user-controller';
import {
  checkUserAuth,
  createUserSessionHandler,
  deleteSessionHandler,
} from './controllers/session.controller';
import {
  getAllTournaments,
  getTournamentDetails,
  getTournamentOrganizer,
} from './controllers/tournament.controller';
import {
  createUserHandler,
  getUserHandler,
} from './controllers/user.controller';
import deserializeUser from './middleware/deserializeUser';
import requireUser from './middleware/requireUser';
import validateResource from './middleware/validateResource';
import { createSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';

function routes(app: Express) {
  // app.get('/api/users', checkAuth, getUsersHandler);
  app.post('/api/user', getUserHandler);
  // app.delete('/api/user', deleteUserHandler);

  app.post(
    '/api/auth/signup',
    [deserializeUser, validateResource(createUserSchema)],
    createUserHandler
  );
  app.post(
    '/api/auth/signin',
    [deserializeUser, validateResource(createSessionSchema)],
    createUserSessionHandler
  );
  app.post(
    '/api/auth/signout',
    [deserializeUser, requireUser],
    deleteSessionHandler
  );
  app.get('/api/auth/signedin', [deserializeUser], checkUserAuth);

  app.get(
    '/api/tournaments/:name',
    [deserializeUser, requireUser],
    getAllTournaments
  );
  app.get(
    '/api/tournaments/organizer/:id',
    [deserializeUser, requireUser],
    getTournamentOrganizer
  );
  app.get(
    '/api/tournaments/:id/details',
    [deserializeUser, requireUser],
    getTournamentDetails
  );

  app.get(
    '/api/nickname/:name',
    [deserializeUser, requireUser],
    getUserByNickname
  );
  app.get('/api/stats/:id', [deserializeUser, requireUser], getUserStats);
  app.get('/api/players/:id', [deserializeUser, requireUser], getPlayerById);
  app.get(
    '/api/friends/:friends',
    [deserializeUser, requireUser],
    getFriendsList
  );

  app.get('/api/hubs/:id', [deserializeUser, requireUser], getUserHubs);

  //app.get('/api/sessions', [deserializeUser, requireUser], getUserSessionsHandler);
  // app.delete('/api/sessions', requireUser, deleteSessionHandler);
}

export default routes;
