const express = require('express');
const route = express.Router();
const { getDistance, updateBusLocation } = require('../controller/busLocationController')
const { setBusStatus, checkBusStatus } = require('../controller/conductorController')
const { setAlert } = require('../controller/alertController')

// API to update bus location
route.put('/update-location', updateBusLocation);
route.post('/get-location-distance', getDistance);
route.put('/update-bus-status', setBusStatus);
route.get('/get-bus-status/:busNumber', checkBusStatus);
route.post('/set-bus-alert', setAlert)

module.exports = route;