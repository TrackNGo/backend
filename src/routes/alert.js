const express = require('express');
const route = express.Router();
const { setAlert } = require('../controller/alertController')
const { getSearch } = require('../controller/alertController')
const { getDefaultAlert } = require('../controller/alertController')

// API to update bus location
route.post('/set-bus-alert', setAlert)
route.post('/get-alert/search-by-filtering', getSearch)
route.get('/get-alert/by-default-date', getDefaultAlert)

module.exports = route;