const express = require('express');
const { reportEmergency, getEmergencies, updateEmergencyStatus } = require('../controller/emergencyController');
const router = express.Router();


router.post('/', reportEmergency);


router.get('/', getEmergencies);
router.put('/:id', updateEmergencyStatus);

module.exports = router;