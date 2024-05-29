// server.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users.routes')
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
// MongoDB connection string
const mongoURI = 'mongodb+srv://kapildesignshore:test1234@cluster0.86auick.mongodb.net/users'; // Replace with your MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define a simple route
app.use('/v1',userRoutes)




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
