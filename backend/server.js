require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/itemRoutes');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(logger);

// Routes
app.use('/api/items', itemRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});