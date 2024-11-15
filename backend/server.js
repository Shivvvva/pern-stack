import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/users", async (req, res) => {
  const user = req.body;
  if (!user.name || !user.age || !user.gender) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error(`Error in create user: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/api/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User deleted!" });
  } catch (error) {}
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Connected to port ${PORT}`);
});
