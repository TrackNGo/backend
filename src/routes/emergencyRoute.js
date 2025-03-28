const express = require('express');
const { reportEmergency, getEmergencies, updateEmergencyStatus, getEmergenciesByBusNumber } = require('../controller/emergencyController');
const router = express.Router();


router.post('/', reportEmergency);


router.get('/', getEmergencies);
router.get('/:busNumber', getEmergenciesByBusNumber);
router.put('/:id', updateEmergencyStatus);

module.exports = router;