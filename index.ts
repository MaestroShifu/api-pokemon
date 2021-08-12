import { startServer, app } from './src/infrastructure/server/app';

const startProject = startServer(app, 3000);
startProject();
