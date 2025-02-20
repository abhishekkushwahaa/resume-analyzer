import { jwt } from "jsonwebtoken";
import { dotenv } from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ error: "Unauthorized. No token provided!" });

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded;
  } catch (err) {
    res.status(401).json({ error: "Invalid token." });
  }
};
