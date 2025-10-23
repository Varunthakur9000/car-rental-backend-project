 import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const router = express.Router();


router.post("/register", async (req, res) => {
  console.log(req.body)
  const { name, email, password } = req.body;
console.log("register route working")
 
  if (!name || !email || !password)
    return res.status(400).json({ message: "Please fill all fields" });

  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json({ message: "Email already exists" });
  const hash = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hash });
  await user.save();
  res.json({ message: "User registered successfully" });
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid email or password" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid email or password" });

  const token = jwt.sign({ id: user._id }, process.env.secretkey, { expiresIn: "7d" });

  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
});

export default router;



