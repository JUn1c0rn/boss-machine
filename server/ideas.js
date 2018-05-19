const express = require('express');
const ideasRouter = express.Router();

module.exports = ideasRouter;

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase
} = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);
  if(idea) {
    req.idea = idea;
    next();
  }else {
    res.sendStatus(404);
  }
});

ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const createdIdea = addToDatabase('ideas', req.body);
  if(createdIdea) {
    res.status(201).send(createdIdea);
  }else {
    res.sendStatus(400);
  }
});

ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea);
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
  res.send(updateInstanceInDatabase('ideas', req.body));
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
  if(deleteFromDatabasebyId('ideas', req.params.ideaId)) {
    res.sendStatus(204);
  }
});
