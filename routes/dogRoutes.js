const express = require('express');
const router = express.Router();
const dogService = require('../services/dogService');

router.get('/breeds', dogService.getAllBreeds);
router.get('/breed/:breed/subbreeds', dogService.getSubBreeds);

router.get('/random', dogService.getRandomDog);
router.get('/random/:n', dogService.getMultipleRandomDogs);
router.get('/random/alt', dogService.getRandomDogWithAlt);

router.get('/breed/:breed/images', dogService.getImagesByBreed);
router.get('/breed/:breed/random', dogService.getRandomImageByBreed);
router.get('/breed/:breed/random/:n', dogService.getMultipleRandomByBreed);

router.get('/breed/:breed/:sub/images', dogService.getImagesBySubBreed);
router.get('/breed/:breed/:sub/random', dogService.getRandomImageBySubBreed);
router.get('/breed/:breed/:sub/random/:n', dogService.getMultipleRandomBySubBreed);

module.exports = router;

