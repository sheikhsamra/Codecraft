const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://codecraft-taupe-gamma.vercel.app",
      "https://codecraft-git-main-samra-shaikhs-projects.vercel.app"
    ],
    credentials: true
  })
);

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Local development ke liye
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Vercel deployment ke liye
module.exports = app;