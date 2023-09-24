const loadModels = async () => {
  require("./models/message");
  require("./models/user");
  require("./models/like")

  require("./associations/userMessage");
  require("./associations/likeUserMessage");
};

module.exports = loadModels;
