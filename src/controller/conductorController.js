const BusModel = require('../models/busModel');

async function setBusStatus(req, res) {

    const { busNumber, setStatus } = req.params;
    console.log(`lat : ${busNumber}`)
    console.log(`lat : ${setStatus}`)
    try {
        await BusModel.findOneAndUpdate(
            { 'busNumber':busNumber },
            { $set: { status:setStatus }},
        );
        res.status(200).send('Updated bus status');
    } catch (error) {
        res.status(500).send('Error updated bus status');
    }
}

module.exports = {
    setBusStatus
}