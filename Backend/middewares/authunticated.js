import jwt from "jsonwebtoken";

const isAuntecated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }
    req.id = decode.userId;
    next();
  } catch (err) {
    console.log(err);
  }
};
export default isAuntecated;
