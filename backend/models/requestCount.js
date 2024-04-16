const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestCountSchema = new Schema({
    count: {
        type: Number,
        default: 0
    },
    lastResetTimestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('RequestCount', requestCountSchema);