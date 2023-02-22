const express = require('express');
const router = express.Router();
const AnimalService = require('../services/AnimalService');
const db = require('../models');
const animalService = new AnimalService(db);
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

module.exports = router;