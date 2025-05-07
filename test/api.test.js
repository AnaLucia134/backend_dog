const request = require('supertest');
const app = require('../index');

describe('Dog API', () => {
  it('GET /api/dogs/breeds should return list of breeds', async () => {
    const res = await request(app).get('/api/dogs/breeds');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBeInstanceOf(Object);
  });
});
