const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routeRoutes = require('./routes/routeRoutes');

const app = express();

mongoose.connect('mongodb://localhost:27017/optimizedRoutePlanning', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

app.use('/api/routes', routeRoutes);

module.exports = app;
