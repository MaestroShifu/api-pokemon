import express, { Express, urlencoded, json } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import createDebug from 'debug';
import { startDataBase } from '../orm/database';
import { getRoutesSwagger } from '../../interfaces/routers/swagger-routes';

const debug = createDebug('Server:app');
const swagger = getRoutesSwagger();

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

app.use(swagger);

const startServer =
  (server: Express, port: number) => async (): Promise<void> => {
    await startDataBase();
    server.listen(port, () => {
      debug('Start server in port: %s', port);
    });
  };

export { startServer, app };
