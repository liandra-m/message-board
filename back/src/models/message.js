const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");
const User = require("./user");

const Message = sequelize.define("message", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
  },
  likes: {
    type: DataTypes.INTEGER,
  },
});

Message.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Message, { foreignKey: "user_id", as: "messages" });

module.exports = Message;
