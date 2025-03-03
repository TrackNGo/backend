const BusRoute = require('../models/busRouteModel');
const BusLocation = require('../models/busLocationModel');
const axios = require('axios');
const Alert = require('../models/alert');

async function setAlert(req, res) {
    
    const { busNumber, category, description} = req.body

    console.log(busNumber)
    console.log(category)
    console.log(description)

    const newAlert = new Alert({busNumber, category, description})

    const response = await newAlert.save()

    res.status(200).json(response)
}

async function getSearch(req, res) {

    const { busNumber, filterOption } = req.body

    if(filterOption && busNumber) {

        const response = await Alert.find({'busNumber': busNumber,'category':filterOption})

        if(response) {
            res.status(200).json(response)
        }
        else {
            res.status(200).send('No items found under that bus id and category')
        }
    }
    else if(filterOption) {

        const response = await Alert.find({'category':filterOption})

        if(response) {
            res.status(200).json(response)
        }
        else {
            res.status(200).send('No items found under that category')
        }
    }
    else if(busNumber) {

        const response = await Alert.find({'busNumber': busNumber})

        if(response) {
            res.status(200).json(response)
        }
        else {
            res.status(200).send('No items found under that bus id')
        }
    }
    else {
        const response = await Alert.find()

        if(response) {
            res.status(200).json(response)
        }
        else {
            res.status(200).send('No alerts')
        }
    }
    
}

async function getDefaultAlert(req, res) { 

    try {
        const today = new Date();

        // Get the start of today (00:00:00)
        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0);

        // Get the start of the next day (00:00:00 of the next day)
        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        // Find alerts where the date is within today's range
        const response = await Alert.find({
            date: { 
                $gte: startOfDay, 
                $lt: endOfDay 
            }
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    setAlert,
    getSearch,
    getDefaultAlert
}