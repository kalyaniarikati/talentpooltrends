const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeekAus = new Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: String
    },
    blurb: {
        type: String
    },
    url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('SeekAus', SeekAus)