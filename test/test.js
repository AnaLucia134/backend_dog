const request = require('supertest');
const app = require('../app');

describe('GET /api/dogs/breeds', () => {
  it('should return list of breeds', async () => {
    const res = await request(app).get('/api/dogs/breeds');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });
});

