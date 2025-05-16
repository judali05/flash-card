const express = require('express');
const cors = require('cors');
const conceptRoutes = require('./routes/conceptRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', conceptRoutes);

module.exports = app;
