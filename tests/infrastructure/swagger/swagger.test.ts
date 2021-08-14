import { Swagger } from '../../../src/infrastructure/swagger/swagger';
import { OpenApiValidator } from 'express-openapi-validate';

describe('Swagger', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('Create SwaggerUI config succesfull', (done) => {
    const swaggerUI = Swagger.getSwaggerUI();
    expect(swaggerUI).toHaveProperty('serve');
    expect(swaggerUI).toHaveProperty('setup');
    done();
  });

  it('Create validator swagger', (done) => {
    const swaggerValid = Swagger.getSwaggerValidator();
    expect(swaggerValid).toBeInstanceOf(OpenApiValidator);
    done();
  });
});
