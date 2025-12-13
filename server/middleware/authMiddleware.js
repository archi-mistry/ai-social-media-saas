const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  // Expect: Authorization: Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // 🔑 JWT VERIFY — SAME ENV SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach userId to request
      req.user = decoded.userId;

      return next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  }

  return res.status(401).json({
    message: "Not authorized, no token",
  });
};

module.exports = protect;
