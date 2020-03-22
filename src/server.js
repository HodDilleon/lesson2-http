const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();

app.use(express.json()); // чтобы появилось req.body 
app.use(cors());
app.use(routes);

module.exports = app;