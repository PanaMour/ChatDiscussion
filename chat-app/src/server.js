const cors = require('cors');
const express = require('express');
const userRoutes = require('./routes/users');
const chatRoutes = require('./routes/chats');  // Import the chat route

const app = express();

app.use(express.json());  // Add this line to parse JSON bodies
app.use(cors());  // Enable CORS middleware
app.use('/users', userRoutes);
app.use('/chats', chatRoutes);  // Use the chat route

app.listen(5000, () => console.log('Server is running on port 5000'));
