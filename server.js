import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// import { sendResetEmail } from "./utils/sendEmail.js";

const allowedOrigins = ["https://notability.vercel.app"];

const app = express();

dotenv.config();
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(process.env.MONGO_URI);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Note = mongoose.model("Note", noteSchema);

// Connect to MongoDB
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected ✅");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token missing" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.userId = decoded.id;
    next();
  });
};

// Register
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({ email, password: hashedPassword });
    res
      .status(201)
      .json({ message: "User created successfully", userId: newUser._id });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "User not found" });
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(401).json({ error: "Invalid password" });
  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: "1h",
  });
  if (!token) return res.status(500).json({ error: "Token generation failed" });
  res.status(200).json({ token });
});

// // Forgot Password
// app.post("/api/forgot-password", async (req, res) => {
//   const { email } = req.body;

//   const user = User.findOne({ email });
//   if (!user) return res.status(404).json({ error: "User not found" });

//   const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "15m" });

//   // Сохраняем токен пользователю (или в отдельную таблицу)
//   user.resetToken = token;

//   await sendResetEmail(email, token);

//   res.json({ message: "Reset link sent" });
// });

// Profile
app.get("/api/user", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ email: user.email });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Protected route example
app.get("/api/protected", verifyToken, (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token missing" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ message: "Access granted", userId: decoded.id });
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
});

// Get all notes for a user
app.get("/api/notes", verifyToken, async (req, res) => {
  const userId = req.userId;
  try {
    const notes = await Note.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ notes: notes });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add a new note
app.post("/api/notes/add", verifyToken, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.userId;

  try {
    const newNote = await Note.create({
      title,
      content,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res
      .status(201)
      .json({ message: "Note created successfully", noteId: newNote._id });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update the note
app.patch("/api/notes/update/:id", verifyToken, async (req, res) => {
  const userId = req.userId;
  const noteID = req.params.id;
  const { title, content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(noteID)) {
    return res.status(400).json({ message: "Invalid note ID" });
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      noteID,
      {
        title,
        content,
        userId,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res
      .status(200)
      .json({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete the note
app.delete("/api/notes/delete/:id", verifyToken, async (req, res) => {
  const userId = req.userId;
  const noteID = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(noteID)) {
    return res.status(400).json({ message: "Invalid note ID" });
  }

  try {
    const deletedNote = await Note.findOneAndDelete({ _id: noteID, userId });

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
const startServer = async () => {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});
