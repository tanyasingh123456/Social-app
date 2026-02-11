const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const postRoutes = require("./routes/postRoutes");
const likeRoutes = require("./routes/likeRoutes");
require("dotenv").config();

const app = express();

connectDB();

// app.use(cors());
app.use(express.json());

app.use(cors({
  origin: "https://social-app-three-kohl.vercel.app"
}));

app.use((req, res, next) => {
  req.userId = "698c185c77485d7766c443df"; 
  next();
});

app.use("/api/posts", postRoutes);
app.use("/api/posts", likeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});