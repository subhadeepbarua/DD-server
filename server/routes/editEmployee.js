const express = require('express');
const router = express.Router();
const employeeModel = require('../schema/employeeSchema');

router.post('/', async (req, res) => {
  try {
    const { uniqueId, ...updatedData } = req.body;
    console.log('kkkk',uniqueId)
    // Search for the document using uniqueId and update it with updatedData
    const updatedEmployee = await employeeModel.findOneAndUpdate(
      { uniqueId: uniqueId },
      { $set: updatedData },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee data updated successfully!', updatedEmployee });
  } catch (error) {
    console.error('Error updating employee data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
