import { startServer, app } from './src/infrastructure/server/app';
import config from './src/infrastructure/config/config';

const startProject = startServer(app, +config.PORT);
startProject();
