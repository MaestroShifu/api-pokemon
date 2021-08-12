import express, { Express, urlencoded, json } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import createDebug from 'debug';

const debug = createDebug('Server:app');
const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

const startServer = (server: Express, port: number) => (): void => {
  server.listen(port, () => {
    debug('Start server in port: %s', port);
  });
};

export { startServer, app };
