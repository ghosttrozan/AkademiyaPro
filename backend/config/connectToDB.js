const mongoose = require("mongoose");

// Connect to Database
module.exports = async function connectToDB() {
  try {
    // Wait for connection to establish
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error: ", error.message);

    // Optional: Exit the process if the database connection fails
    process.exit(1); // Exiting with non-zero code indicates a failure
  }
};
