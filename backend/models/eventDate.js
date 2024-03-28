const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventDateSchema = new Schema({
    event_name: {
        type: String,
        required: true,
    },
    date: {
        type: String,
    },
});

module.exports = mongoose.model('Info', eventDateSchema);
