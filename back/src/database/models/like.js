const { DataTypes } = require("sequelize");
const { sequelize } = require("../../sequelize");

const Like = sequelize.define("like", {
  messageId: {
    type: DataTypes.INTEGER,
    references: {
      model: sequelize.models.message,
      key: "id",
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: sequelize.models.user,
      key: "id",
    },
  },
});

module.exports = Like;
