const express = require('express');
const router = express.Router();
const Item = require('../models/item');  // Import the Item model

// Submit a lost or found item
router.post('/submit', async (req, res) => {
  try {
    const { type, userName, dateTime, busRoute, busNumber, description, contactDetails } = req.body;

    // Validation of 'type' field
    if (!['lost', 'found'].includes(type)) {
      return res.status(400).json({ error: "Invalid type. Must be 'lost' or 'found'." });
    }

    // Create a new Item
    const newItem = new Item({
      type,
      userName,
      dateTime,  // date is included directly
      busRoute,
      busNumber,
      description,
      contactDetails,
    });

    // Save the item to the database
    const savedItem = await newItem.save();
    console.log(savedItem)
    // Return the saved item as response
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all items (lost or found) based on type
router.get('/:type', async (req, res) => {
  try {
    const { type } = req.params;

    // Validate the type ('lost' or 'found')
    if (!['lost', 'found'].includes(type)) {
      return res.status(400).json({ error: "Invalid type. Must be 'lost' or 'found'." });
    }

    // Find all items matching the type
    const items = await Item.find({ type });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Filter by type and get according to route
router.get('/search', async (req, res) => {
    try {
        const { type } = req.query;
        const { route } = req.query;  // Retrieve the search query for route

        if (!['lost', 'found'].includes(type)) {
            return res.status(400).json({ error: "Invalid type. Must be 'lost' or 'found'." });
        }

        // Build the search query based on the type and route
        const query = { type };
        if (route) {
            query.busRoute = { $regex: route, $options: 'i' };  // Case-insensitive search
        }

        // Find items based on the query
        const items = await Item.find(query);
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;  // Export the router
