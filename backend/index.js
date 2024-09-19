import express from 'express';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";
import ImageKit from 'imagekit';
import mongoose from 'mongoose';
import Chat from "./models/chats.js";
import UserChats from "./models/userChats.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

try {
  const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: process.env.CLIENT_URL, // Ensure this is set correctly in Vercel
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

// MongoDB Connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB...');
  } catch(err) {
    console.error('MongoDB connection error:', err);
    console.error('MongoDB connection string:', process.env.MONGO.replace(/:[^:]*@/, ':****@')); // Logs the connection string with password hidden
    throw err; // Re-throw the error to be caught by the outer try-catch
  }
}

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
});

// Routes
app.get('/api/upload', (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

// Create a new chat
app.post('/api/chats', ClerkExpressRequireAuth(), async (req, res, next) => {
  const userId = req.auth.userId;
  const { text } = req.body;

  try{
    // Create and save new chat
    const newChat = new Chat({
      userId: userId,
      history: [{ role: 'user', parts: [{ text }] }]
    });

    const savedChat = await newChat.save();

    // Check if user has existing chats
    const userChats = await UserChats.find({ userId: userId });

    if (!userChats.length) {
      // Create new UserChats document
      const newUserChats = new UserChats({
        userId: userId,
        chats: [{
          _id: savedChat._id,
          title: text.substring(0, 40),
        }],
      });

      await newUserChats.save();
    } else {
      // Push new chat to existing UserChats
      await UserChats.updateOne(
        { userId: userId },
        { $push: { chats: { _id: savedChat._id, title: text.substring(0, 40) } } }
      );
    }

    res.status(201).send(newChat._id);

  } catch(err){
    console.error('Error creating chat:', err);
    next(err); // Pass to the error handler
  }
});

// Get user chats
app.get("/api/userchats", ClerkExpressRequireAuth({
  onError: (error, req, res, next) => {
    console.error("Clerk Authentication Error:", error);
    res.status(401).json({ error: "Authentication failed" });
  }
}), async (req, res, next) => {
  const userId = req.auth.userId;
  console.log("Fetching chats for user:", userId);

  try {
    const userChats = await UserChats.find({ userId });
    console.log("User chats found:", userChats.length);

    if (!userChats.length) {
      console.log("No chats found for user:", userId);
      return res.status(404).send("No chats found for the user.");
    }

    res.status(200).send(userChats[0].chats);
  } catch (err) {
    console.error('Error fetching userchats:', err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

// Get specific chat
app.get("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res, next) => {
  const userId = req.auth.userId;

  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId });

    if (!chat) {
      return res.status(404).send("Chat not found.");
    }

    res.status(200).send(chat);
  } catch (err) {
    console.error('Error fetching chat:', err);
    next(err);
  }
});

// Update chat
app.put("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res, next) => {
  const userId = req.auth.userId;
  const { question, answer, img } = req.body;

  const newItems = [
    ...(question
      ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
      : []),
    { role: "model", parts: [{ text: answer }] },
  ];

  try {
    const updatedChat = await Chat.updateOne(
      { _id: req.params.id, userId },
      { $push: { history: { $each: newItems } } }
    );

    res.status(200).send(updatedChat);
  } catch (err) {
    console.error('Error adding conversation:', err);
    next(err); // Pass to the error handler
  }
});

// Improved Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Customize based on error type
  if (err.name === 'ClerkError' || err.status === 401) {
    res.status(401).send('Unauthenticated!');
  } else {
    res.status(500).send('Internal Server Error');
  }
});

// Serve Frontend in Production
app.use(express.static(path.join(__dirname, "../client")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "index.html"));
});

// Start Server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  connect();
  console.log(`Server running at port ${port}...`);
});
} catch (error) {
  console.error("Unhandled error in express setup:", error);
}

