import dotenv from "dotenv";
dotenv.config();

import cloudinary from "./config/cloudinary.js";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 3000;

connectDB();

// Just importing cloudinary automatically configures it
// No need to call anything

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
