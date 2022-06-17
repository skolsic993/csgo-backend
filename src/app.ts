import express from 'express';
import config from 'config';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';
import deserializeUser from './middleware/deserializeUser';

const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || config.get<number>('port');

const app = express();
app.use(cookieParser);
app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  })
);
const serverless = require('serverless-http');

app.use(express.json());
app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();

  routes(app);
});

module.exports.handler = serverless(app);
