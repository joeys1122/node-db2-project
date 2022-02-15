const Cars = require('./cars-model');
const router = require('express').Router()

const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware');

router.get('/', (req, res) => {
  Cars.getAll()
    .then(cars => {
      res.json(cars)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error getting cars' });
    });
});

router.get('/:id', checkCarId, (req, res) => {
  Cars.getById(req.params.id)
    .then(car => {
      res.json(car)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error getting error car with specific id'});
    });
});

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res) => {
  Cars.create(req.body)
    .then(car => {
      res.status(201).json(car);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error posting car' });
    });
});

module.exports = router;