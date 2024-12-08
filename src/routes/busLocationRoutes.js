const express = require('express');
const route = express.Router();
const { updateBusLocation, getDistance } = require('../controller/busLocationController');

// API to update bus location
route.put('/update-location', updateBusLocation);
route.post('/get-location-distance', getDistance);

module.exports = route;