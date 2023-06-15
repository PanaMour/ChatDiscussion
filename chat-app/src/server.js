const express = require('express');
const userRoutes = require('./routes/users'); // Require users.js from the correct path

const app = express();

app.use('/users', userRoutes);

app.listen(5000, () => console.log('Server is running on port 5000'));
