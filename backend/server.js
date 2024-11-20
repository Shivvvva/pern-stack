import express from "express";
import pool from "./config/db.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.listen(PORT, () => {
  pool.connect().then(() => {
    console.log(`Connected to Postgres`);
  });
  console.log(`Connected to port ${PORT}`);
});

//Add new user
app.post("/api/addUser", async (req, res) => {
  try {
    const { username } = req.body;
    const result = await pool.query(
      "INSERT INTO users (username) VALUES ($1)",
      [username]
    );
    res.status(200).send(result.rows);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//Delete a user by id
app.delete("/api/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM users WHERE user_id=$1", [id]);
    res.status(200).send(result.rows);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//Get all users
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY user_id ASC");
    res.status(200).send(result.rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Get user by id
app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM users WHERE user_id=$1", [
      id,
    ]);
    res.status(200).send(result.rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
