import { Express, Request, Response } from 'express';
import {
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
import { getAllTournaments } from './controllers/tournament.controller';

function routes(app: Express) {
  app.get('/api/users', getUsersHandler);
  app.post('/api/user', getUserHandler);
  app.delete('/api/user', deleteUserHandler);
  app.post(
    '/api/signup',
    validateResource(createUserSchema),
    createUserHandler
  );
  app.post(
    '/api/signin',
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get('/api/sessions', requireUser, getUserSessionsHandler);
  app.delete('/api/sessions', requireUser, deleteSessionHandler);

  app.get('/api/leagues', requireUser, getAllLeagues);

  app.get('/api/tournaments', requireUser, getAllTournaments);
}

export default routes;
