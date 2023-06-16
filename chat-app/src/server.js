const cors = require('cors');
const express = require('express');
const userRoutes = require('./routes/users');

const app = express();

app.use(cors());  // Enable CORS middleware
app.use('/users', userRoutes);

app.listen(5000, () => console.log('Server is running on port 5000'));
