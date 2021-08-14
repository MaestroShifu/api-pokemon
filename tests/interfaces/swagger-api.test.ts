import request from 'supertest';
import { app } from '../../src/infrastructure/server/app';

describe('View swagger documentation', () => {
  it('View documentation succesfull', (done) => {
    request(app).get('/api-docs/').expect(200, done);
  });
});
