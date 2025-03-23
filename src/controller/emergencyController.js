const Emergency = require('../models/emergencyModel');

const reportEmergency = async (req, res, next) => {
  try {
    const { busNumber, emergencyType, latitude, longitude } = req.body;
    
    if (!busNumber || !emergencyType || !latitude || !longitude) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields'
      });
    }

    const emergency = await Emergency.create({
      busNumber,
      emergencyType,
      location: { latitude, longitude },
      status: 'reported'
    });

    res.status(201).json({
      success: true,
      data: emergency
    });
  } catch (error) {
    next(error);
  }
};

const getEmergencies = async (req, res, next) => {
  try {
    const emergencies = await Emergency.find().sort('-createdAt');
    res.status(200).json({
      success: true,
      count: emergencies.length,
      data: emergencies
    });
  } catch (error) {
    next(error);
  }
};

const updateEmergencyStatus = async (req, res, next) => {
  try {
    const emergency = await Emergency.findById(req.params.id);

    if (!emergency) {
      return res.status(404).json({
        success: false,
        error: 'Emergency not found'
      });
    }

    const { status } = req.body;
    
    if (status && ['reported', 'acknowledged', 'resolved'].includes(status)) {
      emergency.status = status;
      await emergency.save();
    }

    res.status(200).json({
      success: true,
      data: emergency
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  reportEmergency,
  getEmergencies,
  updateEmergencyStatus
};