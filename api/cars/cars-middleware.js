const { getById } = require('./cars-model');
const vinValidator = require('vin-validator');
const db = require('../../data/db-config');

const checkCarId = async (req, res, next) => {
  const car = await getById(req.params.id);

  if (car) {
    next();
  } else {
    res.status(404).json({ message: `car with id ${req.params.id} is not found` });
  }
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;

  if (!vin) {
    res.status(400).json({ message: "vin is missing" });
  } else if (!make) {
    res.status(400).json({ message: "make is missing" });
  } else if (!model) {
    res.status(400).json({ message: "model is missing" });
  } else if (!mileage) {
    res.status(400).json({ message: "mileage is missing" });
  } else {
    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
  const validVin = vinValidator.validate(req.body.vin)

  if (!validVin) {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
  } else {
    next();
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const checkIfExists = await db('cars').where('vin', req.body.vin).first();

  if (checkIfExists === undefined) {
    next()
  } else {
    res.status(400).json({ message: `vin ${req.body.vin} already exists` });
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}