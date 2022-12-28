const mongoose = require('mongoose');

const datesSchema = mongoose.Schema({
    dates: [{ type: Date }],
});

module.exports = mongoose.model('dates', datesSchema);