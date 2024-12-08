const mongoose = require('mongoose');

// Define schema for items
const itemSchema = new mongoose.Schema({
    type: { type: String, required: true, enum: ['lost', 'found'] }, // 'lost' or 'found'
    userName: { type: String, required: true },
    dateTime: { type: Date, required: true }, // Date is now required
    busRoute: { type: String, required: true },
    busNumber: { type: String, required: true },
    description: { type: String, required: true },
    contactDetails: { type: String, required: true },
});

// Export the model
module.exports = mongoose.model('Item', itemSchema);
