const User = require("../models/user");
const Message = require("../models/message");

Message.belongsTo(User, { as: "user" });
User.hasMany(Message, { as: "messages" });