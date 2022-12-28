const router = require('express').Router();
const datesController = require('../controllers/dates.controller');

router.get('/', datesController.getDates);
router.post('/', datesController.createDates);
router.put('/', datesController.addDate);

module.exports =router;