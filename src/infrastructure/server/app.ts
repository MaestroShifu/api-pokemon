import express, { Express, urlencoded, json } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import createDebug from 'debug';
import { startDataBase } from '../orm/database';

const debug = createDebug('Server:app');
const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

const startServer =
  (server: Express, port: number) => async (): Promise<void> => {
    server.listen(port, () => {
      debug('Start server in port: %s', port);
    });
    await startDataBase();
  };

export { startServer, app };
