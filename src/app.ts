import express from 'express';
import config from 'config';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';
import deserializeUser from './middleware/deserializeUser';

const cors = require('cors');
const port = process.env.PORT || config.get<number>('port');

const app = express();
app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
});
const serverless = require('serverless-http');

app.use(express.json());
app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();

  routes(app);
});

module.exports.handler = serverless(app);
