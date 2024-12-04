const express = require('express');
const router = express.Router();
const { getRoute, getBusLocation, getLocationCodeSearchByName, getBus} = require('../controller/busUserController');

// API to fetch all bus locations
router.post('/searchFor-buses', getBus);

// API to fetch all bus locations
router.post('/getSpecific-busRoute', getRoute);

// API to fetch all bus locations
router.get('/getBus-locations/:busNumber', getBusLocation);

// Get location code by searching 
router.post('/getLocationCode-searchByName', getLocationCodeSearchByName);

// Get route paths 
//route.post('/get-route', all_function.get_route);

module.exports = router;