const jwt = require("jsonwebtoken");

// Get access token and check if is valid.
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader?.splite(" ")[1];
    if (accessToken === null) return res.status(401).send("Unauthorized");

    const decoded = jwt.verify(accessToken, process.env.TOKEN_KEY);
    console.log({ decoded });
    if (decoded) {
      return next();
    } else {
      return res.status(401).send("Unauthorized");
    }
  } catch (err) {
    console.error(err.message);
    return res.status(401).send(err.message);
  }
};

module.exports = {
  authenticateToken,
};
