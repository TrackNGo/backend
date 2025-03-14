const mongoose = require('mongoose');

const AlertShcema = new mongoose.Schema({

   busNumber: {
        type : String,
        required: true
    },
    category: {
        type : String,
        required: true
    },
    description: {
        type : String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});  


const Alert = mongoose.model('alert', AlertShcema);

module.exports = Alert;