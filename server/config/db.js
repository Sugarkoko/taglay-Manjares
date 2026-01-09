const mongoose = require('mongoose');

const connectDB = async () => {
    // Connect MongoDB with serverless-friendly options
    try {
        // Add connection options for Vercel serverless
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database: ${conn.connection.name}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        console.error(`MONGO_URI exists: ${!!process.env.MONGO_URI}`);
        console.error(`MONGO_URI format check: ${process.env.MONGO_URI ? 'starts with mongodb+srv://' + process.env.MONGO_URI.startsWith('mongodb+srv://') : 'undefined'}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;