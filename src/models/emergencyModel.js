const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
    busNumber: {
        type: String,
        required: true
    },
    emergencyType: {
        type: String,
        required: true,
        enum: ['Mechanical Failure', 'Medical Emergency', 'Accident', 'Route Blocked', 'Security Issue', 'Other']
    },
    location: {
        latitude: Number,
        longitude: Number
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['reported', 'acknowledged', 'resolved'],
        default: 'reported'
    }
}, { timestamps: true });

module.exports = mongoose.model('Emergency', emergencySchema);