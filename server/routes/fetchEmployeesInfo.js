const express = require('express');
const router = express.Router();
const connection = require('../connections/connection');
const employeeModel = require ('../schema/employeeSchema')

router.get('', async (req, res) => {
    try {
      // Fetch data from MongoDB
      const data = await employeeModel.find();
  
      // Send data as JSON response
      res.json(data);
    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;