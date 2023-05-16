const express = require("express");
const router = express.Router();
const Message = require("../models/message");

const BASE_PATH = "/messages";

router.get(BASE_PATH, async (req, res) => {
  const messages = await Message.findAll();

  res.send(messages);
});

router.post(BASE_PATH, async (req, res) => {
  try {
    var message = await Message.create(req.body);
  } catch (error) {
    console.error(`Unable to create message. Error: ${error}`);
  }

  res.send(message || "An error has ocurred");
});

router.put(`${BASE_PATH}/:id`, async (req, res) => {
  try {
    var message = await Message.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    message = await Message.findAll({
      where: {
        id: req.params.id,
      },
    });
  } catch (error) {
    console.error(`Unable to update message ${req.params.id}. Error: ${error}`);
  }

  res.send(message);
});

router.delete(`${BASE_PATH}/:id`, async (req, res) => {
  try {
    var message = await Message.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log(message);
  } catch (error) {
    console.error(`Unable to delete message ${req.params.id}. Error: ${error}`);
  }

  res.send(message > 0 ? "Sucessfully deleted" : "An error has ocurred");
});

module.exports = router;
