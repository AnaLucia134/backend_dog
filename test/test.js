const request = require('supertest');
import App from './App';

describe('GET /api/dogs/breeds', () => {
  it('should return list of breeds', async () => {
    const res = await request(app).get('/api/dogs/breeds');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });
});

