'use strict';
const pug = require('pug')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); //used for authentication
require('dotenv').config();
const helmet = require('helmet')
const app = express();
const mongoose = require('mongoose')

const apiRoutes = require('./routes/api');

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })


//const runner = require('./test-runner');

app.set('view engine', 'pug')
app.set('views', './views/pug')

//serving static file
app.use('/public', express.static(process.cwd() + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
//the method below does not work. Not sure why.
//app.use(helmet.noCache());

//Routing for API 
apiRoutes(app)
  

//404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

//Start our server and tests!
app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + process.env.PORT);
  // if (process.env.NODE_ENV === 'test') {
  //   console.log('Running Tests...');
  //   setTimeout(function () {
  //     try {
  //       runner.run();
  //     } catch (e) {
  //       let error = e;
  //       console.log('Tests are not valid:');
  //       console.log(error);
  //     }
  //   }, 1500);
  // }
});

module.exports = app; //for unit/functional testing
