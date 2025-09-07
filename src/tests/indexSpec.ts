import supertest from 'supertest';
import { app } from '../index.js';

const request = supertest(app);
describe('Test endpoint responses', () => {
  it('Endpoint is running Test', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=200&height=200'
    );
    expect(response.status).toEqual(200);
  });
  it('Query inputs missing Test', async () => {
    const response = await request.get('/api/images?filename=fjord&width=200');
    expect(response.status).toEqual(400);
  });
  it('Wrong Filename Test (Image is missing)', async () => {
    const response = await request.get(
      '/api/images?filename=fjord22&width=200&height=200'
    );
    expect(response.status).toEqual(500);
  });
});
