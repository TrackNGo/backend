const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['bus-service', 'technical'],
        required: true
    },
    // Common fields
    name: String,
    contact: String,
    // Bus Service specific
    busNumber: String,
    registrationNumber: String,
    routeDetails: String,
    // Technical specific
    email: String,
    issueType: String,
    description: String,
    // Status tracking
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'resolved'],
        default: 'pending'
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', contactSchema);
