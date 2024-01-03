const User = require("../models/user");
const Message = require("../models/message");
const Like = require("../models/like");

Message.belongsToMany(User, { through: Like });
User.belongsToMany(Message, { through: Like });
