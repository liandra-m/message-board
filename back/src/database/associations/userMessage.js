const User = require("../models/user");
const Message = require("../models/message");
const Like = require("../models/like");

Message.belongsTo(User, { as: "user" });
User.hasMany(Message, { as: "messages" });

Message.hasMany(Like, { as: "likes" });
