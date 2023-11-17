import express, { Request, Response, json } from 'express';
import httpStatus from 'http-status';
import 'express-async-errors';
import cors from 'cors';
import { handleApplicationErrors } from './middlewares/error-handling-middleware';

const app = express();

app
  .use(cors())
  .use(json())
  .get('/health', (req: Request, res: Response) => {
    res.status(httpStatus.OK).send("I'm ok!");
  })
  .use(handleApplicationErrors);

export default app;
