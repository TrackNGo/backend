const mongoose = require('mongoose');

const Alert = new mongoose.Schema({

    busNumber: {
        type : String,
        required: true
    },
    category: {
        type : String,
        required: true
    },
    decription: {
        type : String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}); 


const alert = mongoose.model('alert', Alert);

module.exports = alert;