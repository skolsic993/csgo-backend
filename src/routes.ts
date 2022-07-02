import { Express, Request, Response } from 'express';
import {
  checkUserAuth,
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from './controllers/session.controller';
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  getUsersHandler,
} from './controllers/user.controller';
import { createUserSchema } from './schema/user.schema';
import { createSessionSchema } from './schema/session.schema';
import validateResource from './middleware/validateResource';
import requireUser from './middleware/requireUser';
import { getAllLeagues } from './controllers/league.controller';
import { getAllTournaments, getTournamentOrganizer } from './controllers/tournament.controller';
import checkAuth from './middleware/checkAuth';
import deserializeUser from './middleware/deserializeUser';

function routes(app: Express) {
  // app.get('/api/users', checkAuth, getUsersHandler);
  // app.post('/api/user', getUserHandler);
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
  app.post('/api/auth/signout', [deserializeUser, requireUser], deleteSessionHandler);
  app.get('/api/auth/signedin', [deserializeUser], checkUserAuth);

  app.get('/api/tournaments/:name', requireUser, getAllTournaments);
  // app.get('/api/tournaments/organizer/:id', checkAuth, getTournamentOrganizer);

  //app.get('/api/sessions', [deserializeUser, requireUser], getUserSessionsHandler);
  // app.delete('/api/sessions', requireUser, deleteSessionHandler);

  // app.get('/api/leagues', requireUser, getAllLeagues);
  
}

export default routes;
