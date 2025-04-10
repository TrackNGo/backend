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
    const today = new Date();
  
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);
  
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const emergencies = await Emergency.find({$and : [{status:'reported'}, { updatedAt: { $gte: startOfDay, $lt: endOfDay }}]}).sort('-createdAt');
    res.status(200).json({
      success: true,
      count: emergencies.length,
      data: emergencies
    });
  } catch (error) {
    next(error);
  }
};

const getEmergenciesByBusNumber = async (req, res, next) => {
  const busNumber = req.params.busNumber;
  const today = new Date();

  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);


  try {
    const emergencies = await Emergency.find({ $and: [{ busNumber: busNumber }, { updatedAt: { $gte: startOfDay, $lt: endOfDay }}, {status:'reported'}] }).sort('-createdAt');
    res.status(200).json({ emergencies });
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

    emergency.status = 'resolved';
    await emergency.save();

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
  updateEmergencyStatus,
  getEmergenciesByBusNumber
};