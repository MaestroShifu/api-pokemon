import { startServer, app } from './src/infrastructure/server/app';
import { getEnviroment } from './src/infrastructure/config/config';

const env = getEnviroment();

const startProject = startServer(app, +env.PORT);
startProject();
