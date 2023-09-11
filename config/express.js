const express = require('express');
const app = express();
require('./database').connect();
const bodyParser = require('body-parser');
const routes = require('../routes/index');
const passport = require('../middleware/passport');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

//Routes
app.use('/api', routes);

module.exports = app;
