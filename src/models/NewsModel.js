const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: { 
        type: String, 
        required: true 
    },
    publishedDate: {
        type: Date, 
        required: true 
    },
    source: { 
        type: String, 
        required: true 
    },
});


module.exports = mongoose.model('News', newsSchema);