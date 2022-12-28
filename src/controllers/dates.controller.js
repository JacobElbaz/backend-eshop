const res = require('express/lib/response');
const DatesModel = require('../models/dates.model');

module.exports.getDates = async (req, res) => {
    const dates = await DatesModel.findOne();
    res.send(dates);
}

module.exports.createDates = async () => {
    try {
        const dates = await DatesModel.create({ dates: [] });
        res.status(201).json({ dates: dates._id });
      } catch (err) {
        res.status(200).send({ err })
      }
}

module.exports.addDate = async (req, res) => {
    const _date = req.body.newDate;
    const dates = await DatesModel.findById("628ce3cd1bd3649e20ce77ba");
  
    if (dates) {
        const alreadyExisted = dates.dates.find(
          (date) => new Date(date).getTime() == new Date(_date).getTime()
        );
        if (!alreadyExisted) {
          dates.dates.push(_date);
        }
    
        dates.save();
    
        res.send(dates.dates);
      } else {
        res.status(404);
        throw new Error('Dates not found');
      }
}