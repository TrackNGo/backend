const express = require('express');
const route = express.Router();
const { getRoute, getBusLocation, getLocationCodeSearchByName, getBus} = require('../controller/busUserController');

// API to fetch all bus locations
route.post('/searchFor-buses', getBus);

// API to fetch all bus locations
route.post('/getSpecific-busRoute', getRoute);

// API to fetch all bus locations
route.get('/getBus-locations/:busId', getBusLocation);

// Get location code by serching 
route.post('/getLocationCode-searchByName', getLocationCodeSearchByName);

// Get route paths 
//route.post('/get-route', all_function.get_route);

module.exports = route;