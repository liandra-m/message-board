const jwt = require("jsonwebtoken");

const verifyJWTToken = (req, res, next) => {
  const publicRoutes = {
    "/register": { methods: ["POST"] },
    "/login": { methods: ["POST"] },
    "/me": { methods: ["POST"] },
    "/messages": { methods: ["GET", "POST"] },
  };

  if (Object.keys(publicRoutes).includes(req.originalUrl)) {
    const route = publicRoutes[req.originalUrl];
    if (route?.methods?.includes(req.method) || route?.methods === "ALL")
      return next();
  }

  const token = req.headers["authorization"]?.replace("Bearer ", "");

  if (!token) return res.status(403).send("No auth token present");

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return res.status(401).send("Invalid token!");
  }

  return next();
};

module.exports = verifyJWTToken;
