const express = require("express");
const bodyParser = require("body-parser");

const authMiddleware = require("./middlewares/auth");
const cors = require("cors");

const messageRoutes = require("./routes/messages");
const authRoutes = require("./routes/auth");

const startServer = () => {
  const app = express();
  const port = process.env.APP_PORT;

  var corsOptions = {
    origin: process.env.FRONT_END_URL,
    optionsSuccessStatus: 200
  }

  app.use(cors(corsOptions));

  const jsonParser = bodyParser.json();
  app.use(jsonParser);
  app.use(authMiddleware);

  app.use(messageRoutes);
  app.use(authRoutes);

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

module.exports = {
  startServer,
};
