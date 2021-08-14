import { RequestHandler } from 'express';
import { OpenApiValidator } from 'express-openapi-validate';
import swaggerUi from 'swagger-ui-express';
import createDebug from 'debug';
import path from 'path';
import fs from 'fs';

const debug = createDebug('Server:Swagger');

interface ISwaggerUI {
  serve: typeof swaggerUi.serve;
  setup: RequestHandler;
}

export class Swagger {
  public static getSwaggerUI(): ISwaggerUI {
    const OAS = this.getOAS();
    return {
      serve: swaggerUi.serve,
      setup: swaggerUi.setup(OAS)
    };
  }

  public static getSwaggerValidator(): OpenApiValidator {
    const OAS = this.getOAS();
    return new OpenApiValidator(OAS);
  }

  private static getOAS() {
    const path = this.getPathOAS();
    const OAS = this.getFileToStringOAS(path);
    return OAS;
  }

  private static getPathOAS() {
    return path.join(path.dirname(__filename), '../../../static/open_api.json');
  }

  private static getFileToStringOAS(path: string) {
    const fileOpenApi = fs.readFileSync(path, 'utf-8');
    debug('Succesfull load OAS %j');
    return JSON.parse(fileOpenApi);
  }
}
