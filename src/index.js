require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes');
const { startDbConnection } = require('./config/mongoose');

const app = express();

const start = async () => {
  // Config
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());

  // Routes
  app.use('/', router);

  // Start database
  startDbConnection();

  // Start server
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Running on port ${process.env.PORT}`);
  });
};

start();
