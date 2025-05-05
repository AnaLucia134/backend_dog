const axios = require('axios');
const BASE_URL = 'https://dog.ceo/api';

exports.getAllBreeds = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/breeds/list/all`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo razas' });
  }
};

exports.getSubBreeds = async (req, res) => {
  try {
    const { breed } = req.params;
    const response = await axios.get(`${BASE_URL}/breed/${breed}/list`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo subrazas' });
  }
};

exports.getRandomDog = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/breeds/image/random`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo imagen aleatoria' });
  }
};

exports.getMultipleRandomDogs = async (req, res) => {
  try {
    const { n } = req.params;
    const response = await axios.get(`${BASE_URL}/breeds/image/random/${n}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo imágenes aleatorias' });
  }
};

exports.getImagesByBreed = async (req, res) => {
  try {
    const { breed } = req.params;
    const response = await axios.get(`${BASE_URL}/breed/${breed}/images`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo imágenes por raza' });
  }
};

exports.getRandomImageByBreed = async (req, res) => {
  try {
    const { breed } = req.params;
    const response = await axios.get(`${BASE_URL}/breed/${breed}/images/random`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo imagen aleatoria por raza' });
  }
};

exports.getMultipleRandomByBreed = async (req, res) => {
  try {
    const { breed, n } = req.params;
    const response = await axios.get(`${BASE_URL}/breed/${breed}/images/random/${n}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo imágenes por raza' });
  }
};

exports.getImagesBySubBreed = async (req, res) => {
  try {
    const { breed, sub } = req.params;
    const response = await axios.get(`${BASE_URL}/breed/${breed}/${sub}/images`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo imágenes por subraza' });
  }
};

exports.getRandomImageBySubBreed = async (req, res) => {
  try {
    const { breed, sub } = req.params;
    const response = await axios.get(`${BASE_URL}/breed/${breed}/${sub}/images/random`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo imagen aleatoria por subraza' });
  }
};

exports.getMultipleRandomBySubBreed = async (req, res) => {
  try {
    const { breed, sub, n } = req.params;
    const response = await axios.get(`${BASE_URL}/breed/${breed}/${sub}/images/random/${n}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo imágenes aleatorias por subraza' });
  }
};

exports.getRandomDogWithAlt = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/breeds/image/random/alt`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo imagen aleatoria con descripción' });
  }
};
