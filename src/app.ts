import express from 'express';
import config from 'config';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';
import deserializeUser from './middleware/deserializeUser';
import cookieParser from 'cookie-parser';

const cors = require('cors');
const port = process.env.PORT || config.get<number>('port');

const app = express();
const serverless = require('serverless-http');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: "GET, POST, DELETE"
  }),
  cookieParser()
);

app.use(express.json());

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();

  routes(app);
});

module.exports.handler = serverless(app);
