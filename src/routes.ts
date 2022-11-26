import { Express } from 'express';
import { getAllLeagues } from './controllers/league.controller';
import {
  checkUserAuth,
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from './controllers/session.controller';
import { getAllTournaments } from './controllers/tournament.controller';
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  getUsersHandler,
} from './controllers/user.controller';
import checkAuth from './middleware/checkAuth';
import requireUser from './middleware/requireUser';
import validateResource from './middleware/validateResource';
import { createSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';

function routes(app: Express) {
  app.get('/api/users', checkAuth, getUsersHandler);
  app.post('/api/user', getUserHandler);
  app.delete('/api/user', deleteUserHandler);

  app.post(
    '/api/auth/signup',
    validateResource(createUserSchema),
    createUserHandler
  );
  app.post(
    '/api/auth/signin',
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.post('/api/auth/signout', checkAuth, deleteSessionHandler);
  app.get('/api/auth/signedin', checkAuth, checkUserAuth);

  app.get('/api/sessions', requireUser, getUserSessionsHandler);
  app.delete('/api/sessions', requireUser, deleteSessionHandler);

  app.get('/api/leagues', requireUser, getAllLeagues);
  app.get('/api/tournaments', requireUser, getAllTournaments);
}

export default routes;
