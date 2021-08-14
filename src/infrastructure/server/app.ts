import express, { Express, urlencoded, json } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import createDebug from 'debug';
import { startDataBase } from '../orm/database';
import { getRoutesSwagger } from '../../interfaces/routers/swagger-routes';
import { getRoutesAuth } from '../../interfaces/routers/auth-routes';
import { parserFormatError } from '../middlewares/parser-error';

const debug = createDebug('Server:App');
const swagger = getRoutesSwagger();
const authRouter = getRoutesAuth();

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

app.use(swagger);
app.use(authRouter);

app.use(parserFormatError);

const startServer =
  (server: Express, port: number) => async (): Promise<void> => {
    await startDataBase();
    server.listen(port, () => {
      debug('Start server in port: %s', port);
    });
  };

export { startServer, app };
