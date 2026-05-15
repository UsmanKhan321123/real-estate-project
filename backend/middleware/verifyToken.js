import jwt from "jsonwebtoken";

let verifyToken = (req, res, next) => {
  let token = req.cookies.Token;
  if (!token) {
    return res.json({ message: "You are not authenticated" });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
    if (error) {
      return res.json({ message: "Token not verified" });
    }
    req.userId = payload.id;
    next();
  });
  return res.json({ message: "You are Authenticated  " });
};

export default verifyToken