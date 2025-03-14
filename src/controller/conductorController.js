const BusModel = require('../models/busModel');

async function setBusStatus(req, res) {

    const { busNumber, setStatus } = req.body;
    // console.log(`lat : ${busNumber}`)
    // console.log(`lat : ${setStatus}`)
    try {
        const busStatusDetails = await BusModel.findOneAndUpdate(
            { 'busNumber':busNumber },
            { $set: { status:setStatus }},
        );
        res.status(200).send(busStatusDetails);
    } catch (error) {
        res.status(500).send('Error updated bus status');
    }
}

async function checkBusStatus(req, res) {

    const busNumber = req.params.busNumber;
    console.log(busNumber)
    try {
        const response = await BusModel.findOne(
            { 'busNumber':busNumber },
        );
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send('Error updated bus status');
    }
}

async function conductorLogIn(req, res) {

    const [busNumber, password] = req.body
}

module.exports = {
    setBusStatus,
    checkBusStatus,
    conductorLogIn
}