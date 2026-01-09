require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// Database Connection
connectDB();

app.use(express.json());

//Middleware
app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://taglay-manjares.vercel.app",
    "https://taglay-manjares-git-main-sugarkokos-projects.vercel.app",
    process.env.CLIENT_URL // Add your deployed client URL as env variable
  ].filter(Boolean), // Remove empty/undefined values
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

//Getting UI
// if (process.env.NODE_ENV === "production") {
//     const root = path.join(__dirname, '../robles-front-end/dist');
//     app.use(express.static(root));
//     app.all('/{*any}', (req, res, next) => {
//         res.sendFile(path.join(root, 'index.html'));
//     })
//     // app.get('*', (req, res) => {
//         // res.sendFile(path.join(root, 'index.html'));
//     // });
// }

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export for Vercel serverless
module.exports = app;
