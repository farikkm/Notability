import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const PORT = process.env.PORT || 3001

dotenv.config();
const app = express()
app.use(cors())
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})
const User = mongoose.model('User', userSchema);

// Register
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: "User created successfully", userId: newUser._id });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})