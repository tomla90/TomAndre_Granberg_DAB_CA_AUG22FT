const express = require('express');
const router = express.Router();
const db = require('../models');
const SpeciesService = require('../services/SpeciesService');
const { isAdmin } = require("./authMiddlewares");

const speciesService = new SpeciesService(db);

router.get('/', isAdmin, async function(req, res, next) {
  try {
    const speciesData = await speciesService.getAll();
    const user = req.user;
    res.render('species', { user, species: speciesData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.post('/', isAdmin, async function(req, res, next) {
  let name = req.body.name;
  await speciesService.create(name);
  res.end();
});

router.delete('/:id', isAdmin, async function(req, res, next) {
  const id = req.params.id;
  const speciesService = new SpeciesService(db);

  try {
    const result = await speciesService.delete(id);
    if (result.error) {
      res.status(400).send(result.error);
    } else {
      res.send({ message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while deleting the species');
  }
});

router.put('/:id', isAdmin, async function(req, res, next) {
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