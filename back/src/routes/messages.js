const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const User = require("../models/user");

const BASE_PATH = "/messages";

router.get(BASE_PATH, async (req, res) => {
  try {
    const messages = await Message.findAll({
      include: { model: User, as: "user", attributes: { exclude: "password" } },
    });

    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send("Unable to retrieve messages");
  }
});

router.post(BASE_PATH, async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);

    const message = await Message.findByPk(newMessage?.id, {
      include: { model: User, as: "user", attributes: { exclude: "password" } },
    });

    res.status(201).send(message);
  } catch (error) {
    res.status(500).send(`Unable to create message`);
  }
});

router.put(`${BASE_PATH}/:id`, async (req, res) => {
  try {
    await Message.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const message = await Message.findByPk(req?.params?.id, {
      include: { model: User, as: "user", attributes: { exclude: "password" } },
    });

    res.status(200).send(message);
  } catch (error) {
    res.status(500).send(`Unable to update message`);
  }
});

router.delete(`${BASE_PATH}/:id`, async (req, res) => {
  try {
    await Message.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).send("Successfully deleted message");
  } catch (error) {
    res.status(500).send("Unable to delete message");
  }
});

module.exports = router;
