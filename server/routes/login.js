const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;


// Connection URL to MongoDB
const url = 'mongodb+srv://LinkedInUserDB:K4VksmR4kicVHpzB@userdatabase.pbyxc6b.mongodb.net/Employee';
const dbName = 'Employee';

router.post('/', async (req, res) => {
  const { userName, password } = req.body;

  console.log('username', userName)
  console.log('password', password)

  try {
    // Connect to MongoDB 
    const client = await MongoClient.connect(url);

    // Find the user in the  user_profiles collection using the provided email
    const user = await client.db(dbName).collection('credentials').findOne({ username: userName });
    console.log(user)
    if (user) {
      // Get the stored password from the user_profiles collection
      const storedPassword = user.password;
      
      
      if (password === storedPassword) {
        res.status(200).json({ message: 'Login successful'}); 
      } else {
        // Incorrect password
        res.status(401).json({ message: 'Incorrect password' });
      }
    } else {
      // User not found in user_profiles collection
      res.status(404).json({ message: 'User not found' });
    }

    // Close the MongoDB connection
    client.close();
  } catch (error) {
    // Handle error, e.g., log the error and send a generic error message
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
