const express = require("express");
const bodyParser = require("body-parser");

const messageRoutes = require("./routes/messages");
const authRoutes = require("./routes/auth");

const startServer = () => {
  const app = express();
  const port = process.env.APP_PORT;

  const jsonParser = bodyParser.json();
  app.use(jsonParser);

  app.use(messageRoutes);
  app.use(authRoutes);

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

module.exports = {
  startServer,
};
