const BusLocation = require('../models/busLocationModel');
const axios = require('axios')

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

async function getDistance(req,res) {
    
    const { first, second } = req.body
    console.log('Request received with origins:', first, 'and destinations:', second); // Log the input
    const apiKey = 'AIzaSyAiQ_WJER_3HDCs0B6tH01WPTCzB1COSLA';

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${first.lat},${first.lng}&destinations=${second.lat},${second.lng}&key=${apiKey}&mode=DRIVING`;
    try {
        const response = await axios.get(url);
        console.log(response);
        if(response) {

            const distance = response.data.rows[0].elements[0].distance.value; // Distance in meters
            const duration = response.data.rows[0].elements[0].duration.value; // Distance in meters
            console.log(distance);
            console.log(duration);

            res.status(200).send({distance,duration});
        }
    } catch (error) {
        res.status(500).send('Cannot get distance');
        return null;
    }
}

module.exports = {
    updateBusLocation,
    getDistance
}