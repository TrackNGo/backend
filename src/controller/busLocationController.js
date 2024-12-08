const BusLocation = require('../models/busLocationModel');

async function updateBusLocation(req, res) {

    const { busNumber, latitude, longitude, accuracy } = req.body;
    console.log(`lat : ${busNumber}`)
    console.log(`lat : ${latitude}`)
    console.log(`lon : ${longitude}`)
    console.log(`acc : ${accuracy}`)
    try {
        await BusLocation.findOneAndUpdate(
            { 'busNumber':busNumber },
            { $set: { latitude, longitude, lastUpdated: new Date() }},
        );
        res.status(200).send('Location updated');
    } catch (error) {
        res.status(500).send('Error updating location');
    }
}

module.exports = {
    updateBusLocation
}