const express = require('express');
const route = express.Router();
const { updateBusLocatioin } = require('../controller/busLocationController');

// API to update bus location
route.put('/update-location', updateBusLocatioin);

module.exports = route;