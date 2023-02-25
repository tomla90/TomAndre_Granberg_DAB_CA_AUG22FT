const express = require('express');
const router = express.Router();
const AnimalService = require('../services/AnimalService');
const AdoptionService = require('../services/AdoptionService');
const db = require('../models');
const animalService = new AnimalService(db);
const adoptionService = new AdoptionService(db);
const calculateAge = require('../public/js/animals');

router.get('/', async function (req, res, next) {
  try {
    const animalsData = await animalService.getAll();
    res.render('animals', { user: null, animals: animalsData, calculateAge });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.post('/:id', async function (req, res, next) {
    const animalId = req.params.id;
    const userId = req.body.userId;
    const adoptionDate = new Date();
    if (!animalId) {
      return res.status(400).send({ error: 'Invalid animal ID' });
    }
    await adoptionService.adoptAnimal(animalId, userId, adoptionDate);
    res.end();
});

router.delete('/:id', async function (req, res, next) {
  const animalId = req.params.id;
  await adoptionService.deleteAnimalAdoption(animalId);
  res.end();
});

module.exports = router;