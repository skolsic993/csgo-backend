import cookieParser from "cookie-parser";
import express from "express";
import routes from "./routes";
import connect from "./utils/connect";
import logger from "./utils/logger";

const cors = require("cors");
//process.env.PORT || config.get<number>('port')
const port = 1337;

const app = express();
const serverless = require("serverless-http");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
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
