const express = require('express');
const router = express.Router();
const employeeModel = require('../schema/employeeSchema');
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
    cloud_name: "dfzlrypkl",
    api_key: "273539591639949",
    api_secret: "56vLUH98Hur_x0_qVWTfbMUP6rk",
});
const upload = multer({ dest: "uploads/" });

router.post('/', async (req, res) => {
    try {
        const { uniqueId, name, email, mobile, designation, gender, course } = req.body;
        const createDate = Date.now(); // Get the current date

        // Check if the email already exists in the collection
        const existingEmployee = await employeeModel.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ error: 'Email already exists!' });
        }

        // Create a new employee object with createDate included
        const employeeData = {
            uniqueId,
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            createDate, // Add createDate field to the object
        };

        // Save the employee data to MongoDB using Mongoose
        await employeeModel.create(employeeData);

        res.status(200).json({ message: 'User data saved successfully!' });
    } catch (error) {
        console.error('Error saving user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
