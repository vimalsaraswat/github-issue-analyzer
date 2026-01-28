import express, { NextFunction, Request, Response } from 'express';
import logger from 'jet-logger';

import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import Paths from '@src/common/constants/Paths';
import { RouteError, ValidationError } from '@src/common/utils/route-errors';
import BaseRouter from '@src/routes/apiRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Paths._, BaseRouter);

app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  logger.err(err, true);
  let status: HttpStatusCodes = HttpStatusCodes.BAD_REQUEST;

  if (err instanceof ValidationError) {
    return res.status(err.status).json({
      error: err.message,
      details: err.errors,
    });
  }

  if (err instanceof RouteError) {
    status = err.status;
    res.status(status).json({ error: err.message });
  }
  return next(err);
});

export default app;
