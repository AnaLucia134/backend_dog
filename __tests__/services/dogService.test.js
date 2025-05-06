const axios = require('axios');
const dogService = require('../../services/dogService');

jest.mock('axios');

describe('DogService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllBreeds', () => {
    it('should return all breeds', async () => {
      const mockData = {
        message: {
          bulldog: ['boston', 'english'],
          poodle: ['miniature', 'standard']
        },
        status: 'success'
      };
      
      axios.get.mockResolvedValue({ data: mockData });
      
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await dogService.getAllBreeds(req, res);
      
      expect(axios.get).toHaveBeenCalledWith('https://dog.ceo/api/breeds/list/all');
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Network Error';
      axios.get.mockRejectedValue(new Error(errorMessage));
      
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await dogService.getAllBreeds(req, res);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error obteniendo razas' });
    });
  });

  describe('getSubBreeds', () => {
    it('should return sub-breeds for a breed', async () => {
      const breed = 'bulldog';
      const mockData = {
        message: ['boston', 'english'],
        status: 'success'
      };
      
      axios.get.mockResolvedValue({ data: mockData });
      
      const req = { params: { breed } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await dogService.getSubBreeds(req, res);
      
      expect(axios.get).toHaveBeenCalledWith(`https://dog.ceo/api/breed/${breed}/list`);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });
  });

});
