const express = require('express');
const route = express.Router();
const { updateBusLocation } = require('../controller/busLocationController');

// API to update bus location
route.put('/update-location', updateBusLocation);

module.exports = route;