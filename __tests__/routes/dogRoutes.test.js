const request = require('supertest');
const app = require('../../app');
const axios = require('axios');

jest.mock('axios');

describe('Dog Routes', () => {
  describe('GET /api/dogs/breeds', () => {
    it('should return all breeds', async () => {
      const mockData = {
        message: {
          bulldog: ['boston', 'english'],
          poodle: ['miniature', 'standard']
        },
        status: 'success'
      };
      
      axios.get.mockResolvedValue({ data: mockData });
      
      const res = await request(app).get('/api/dogs/breeds');
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith('https://dog.ceo/api/breeds/list/all');
    });
  });

  describe('GET /api/dogs/breed/:breed/subbreeds', () => {
    it('should return sub-breeds for a breed', async () => {
      const breed = 'bulldog';
      const mockData = {
        message: ['boston', 'english'],
        status: 'success'
      };
      
      axios.get.mockResolvedValue({ data: mockData });
      
      const res = await request(app).get(`/api/dogs/breed/${breed}/subbreeds`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith(`https://dog.ceo/api/breed/${breed}/list`);
    });
  });

});
