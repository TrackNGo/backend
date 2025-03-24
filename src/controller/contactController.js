const Contact = require('../models/ContactModel');

exports.submitBusService = async (req, res) => {
  try {
    const { busNumber, ownerName, ownerContact, registrationNumber, routeDetails } = req.body;
    
    const contact = new Contact({
      type: 'bus-service',
      busNumber,
      name: ownerName,
      contact: ownerContact,
      registrationNumber,
      routeDetails,
      status: 'pending'
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Bus service request submitted. Our admin will contact you soon.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting bus service request'
    });
  }
};

exports.submitTechnicalRequest = async (req, res) => {
  try {
    const { name, email, issueType, description } = req.body;
    
    const contact = new Contact({
      type: 'technical',
      name,
      contact: email,
      issueType,
      description,
      status: 'pending'
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Technical support request submitted successfully.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting technical request'
    });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort('-submittedAt');
    res.status(200).json({
      success: true,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts'
    });
  }
};