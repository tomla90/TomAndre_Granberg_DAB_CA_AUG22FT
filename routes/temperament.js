const express = require('express');
const router = express.Router();
const db = require('../models');
const TemperamentService = require('../services/TemperamentService');

const temperamentService = new TemperamentService(db);

router.get('/', async function(req, res, next) {
  try {
    const temperamentsData = await temperamentService.getAll();
    res.render('temperament', { user: null, temperament: temperamentsData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.post('/', async function(req, res, next) {
  let name = req.body.name;
  await temperamentService.create(name);
  res.end();
});

router.delete('/:id', async function(req, res, next) {
  const id = req.params.id;
  await temperamentService.delete(id);
  res.end();
});

router.put('/:id', async function(req, res, next) {
  const id = req.params.id;
  const name = req.body.name;
  try {
    const result = await temperamentService.update(id, name);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;