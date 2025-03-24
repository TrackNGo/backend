const express = require('express');
const contactController = require('../controller/contactController');
const router = express.Router();

router.post('/bus-service', contactController.submitBusService);
router.post('/technical', contactController.submitTechnicalRequest);
router.get('/', contactController.getAllContacts);

module.exports = router;