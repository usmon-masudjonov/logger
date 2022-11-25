import express, { Express, Request, Response } from "express";
import correlationIdMiddleware from "../middlewares/correlation-id";
import asyncWrap from "express-async-wrap";
import logger from "../logger";
import morgan from "morgan";
import correlatedRequest from "../utils/correlated-request";

export function startApp(): Express {
  const app: Express = express();

  app.use(correlationIdMiddleware);
  app.use([
    morgan(`:method :url`, {
      stream: {
        write: (text) => logger.info(text.trim()),
      },
      immediate: true,
    }),
    morgan(
      `:method :status :url (:res[content-length] bytes) :response-time ms`,
      {
        stream: {
          write: (text) => logger.info(text.trim()),
        },
        immediate: false,
      }
    ),
  ]);

  app.get(
    "/",
    asyncWrap(async (req: Request, res: Response) => {
      logger.info(`The request has been received`);

      correlatedRequest.requestPromise({
        url: "http://localhost:3001",
        method: "GET",
      });

      res.sendStatus(200);
    })
  );

  return app;
}
