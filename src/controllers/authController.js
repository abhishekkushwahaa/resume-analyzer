import jwt from "jsonwebtoken";

export const LogIn = (req, res) => {
  const { username, password } = req.body;
  if (username === "naval.ravikant" && password === "05111974") {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ JWT: token });
  }
  res.status(401).json({ error: "Invalid credentials" });
};
