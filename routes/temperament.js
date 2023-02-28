const express = require('express');
const router = express.Router();
const db = require('../models');
const TemperamentService = require('../services/TemperamentService');
const { isAdmin } = require('./authMiddlewares');

const temperamentService = new TemperamentService(db);

router.get('/', isAdmin, async function(req, res, next) {
  try {
    const temperamentsData = await temperamentService.getAll();
    const user = req.user;
    res.render('temperament', { user: user, temperament: temperamentsData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.post('/',  async function(req, res, next) {
  let name = req.body.name;
  await temperamentService.create(name);
  res.end();
});

router.delete('/:id', async function(req, res, next) {
  const id = req.params.id;
  const temperamentService = new TemperamentService(db);

  try {
    const result = await temperamentService.delete(id);
    res.send({ message: result.message });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while deleting the temperament');
  }
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