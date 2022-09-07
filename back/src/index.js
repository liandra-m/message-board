require('dotenv').config();
const { startServer } = require('./express');
const { startDatabase } = require('./sequelize');

startServer();
startDatabase();


