const express = require("express");
const router = express.Router();
const User = require("../database/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Message = require("../database/models/message");
const Like = require("../database/models/like");

const jwtKey = process.env.JWT_SECRET_KEY;

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    const validPassword = await bcrypt.compare(password, user?.password || "");

    if (!user || !validPassword)
      return res.status(401).send("Invalid credentials");

    const token = generateJWTToken(user);

    return res.status(200).send({
      user: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        createdAt: user?.createdAt,
      },
      token,
    });
  } catch (error) {
    return res.status(500).send("An error has occurred!");
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userAlreadyExists = await User.findOne({ where: { email: email } });
    if (userAlreadyExists) return res.status(409).send("User already exists");

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
    });

    const token = generateJWTToken(user);

    return res.status(201).send({
      user: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        createdAt: user?.createdAt,
      },
      token,
    });
  } catch (error) {
    return res.status(500).send("An error has occurred!");
  }
});

router.post("/me", async (req, res) => {
  try {
    const token = req.headers["authorization"]?.replace("Bearer ", "");

    await jwt.verify(token, jwtKey);

    const decodedToken = jwt.decode(token);

    const user = await User.findByPk(decodedToken?.id, {
      include: [
        {
          model: Message,
          as: "messages",
          attributes: { exclude: "password" },
        },
        {
          model: Like,
          attributes: ["messageId"],
        },
      ],
    });

    return res.status(200).send(user);
  } catch (error) {
    if (error?.name === "TokenExpiredError")
      return res.status(401).send("Token expired!");
    return res.status(500).send("An error has occurred!");
  }
});

const generateJWTToken = (user) => {
  return jwt.sign(
    { id: user?.id, email: user?.email, name: user?.name },
    jwtKey,
    {
      expiresIn: "1h",
    }
  );
};

module.exports = router;
