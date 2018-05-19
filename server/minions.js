const express = require('express');
const minionsRouter = express.Router();

module.exports = minionsRouter;

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);
  if(minion) {
    req.minion = minion;
    next();
  }else {
    res.sendStatus(404);
  }
});

minionsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
  const createdMinion = addToDatabase('minions', req.body);
  if(createdMinion) {
    res.status(201).send(createdMinion);
  }else {
    res.sendStatus(400);
  }
});

minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
  res.send(updateInstanceInDatabase('minions', req.body));
});

minionsRouter.delete('/:minionId', (req, res, next) => {
  if(deleteFromDatabasebyId('minions', req.params.minionId)) {
    res.sendStatus(204);
  }
});

minionsRouter.param('workId', (req, res, next, id) => {
  const work = getFromDatabaseById('work', id);
  if (work) {
    req.work = work;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.get('/:minionId/work', (req, res, next) => {
  const allWork = getAllFromDatabase('work');
  res.send(allWork.filter(work => work.minionId === req.params.minionId));
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
  const newWork = req.body;
  newWork.minionId = req.params.minionId;
  const createdWork = addToDatabase('work', newWork);
  if(createdWork) {
    res.status(201).send(createdWork);
  }else {
    res.sendStatus(400);
  }
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  if(req.params.minionId !== req.body.minionId){
    res.sendStatus(400)
  }else {
    res.send(updateInstanceInDatabase('work', req.body));
  }
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
  if(deleteFromDatabasebyId('work', req.params.workId)) {
    res.sendStatus(204);
  }else {
    res.sendStatus(500);
  }
});
