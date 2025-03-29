const express = require("express");
const Report = require("../models/report");
const router = express.Router();

router.post("/report", async (req, res) => {
  try {
    const { busNumber, issueType, description, contactDetails } = req.body;

    if (!busNumber || !issueType || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const report = new Report({
      busNumber,
      issueType,
      description,
      contactDetails,
    });

    await report.save();
 
    return res.status(201).json({ message: "Report submitted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
