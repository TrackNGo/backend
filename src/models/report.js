// models/Report.js
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    busNumber: {
        type: String,
        required: true,
    },
    issueType: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reportedAt: {
        type: Date,
        default: Date.now,
    },
    contactDetails: {
        type: String, 
        required: false,
    },
});
 
const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
