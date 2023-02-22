const express = require('express');
const router = express.Router();
const db = require('../models');
const SpeciesService = require('../services/SpeciesService');

const speciesService = new SpeciesService(db);


router.get('/', async function(req, res, next) {
  try {
    const speciesData = await speciesService.getAll();
    res.render('species', { user: null, species: speciesData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.post('/', async function(req, res, next) {
  let name = req.body.name;
  await speciesService.create(name);
  res.end();
});

router.delete('/:id', async function(req, res, next) {
  const id = req.params.id;
  await speciesService.delete(id);
  res.end();
});


router.put('/:id', async function(req, res, next) {
  const id = req.params.id;
  const name = req.body.name;
  try {
    const result = await speciesService.update(id, name);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;