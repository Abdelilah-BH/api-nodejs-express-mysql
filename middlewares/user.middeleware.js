const jwt = require("jsonwebtoken");
const db = require("../models");
const Permission = db.permissions;

// Get access token and check if is valid.
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader?.split(" ")[1];
    if (accessToken === null) return res.status(401).send("Unauthorized");
    const decoded = jwt.verify(accessToken, process.env.TOKEN_KEY);
    if (!decoded) {
      return res.status(401).send("Unauthorized");
    }
    const { id, email, role } = decoded;
    req.user= { id, email, role };
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(401).send(err.message);
  }
};

const Authorization = () => (req, res, next) => {
  const { role } = req.user;
  // const permission = Permission.findAll({ attributes: [id, role, action], where: { role_id:  }})
  // 
}

module.exports = {
  authenticateToken,
};
