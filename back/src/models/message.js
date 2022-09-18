const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');

const Message = sequelize.define('message', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT
    }
});

module.exports = Message;