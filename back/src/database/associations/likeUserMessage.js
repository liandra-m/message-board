const User = require("../models/user");
const Message = require("../models/message");
const Like = require("../models/like");

Like.belongsTo(User);
Like.belongsTo(Message);

User.hasMany(Like);
Message.hasMany(Like, { as: "likes" });
