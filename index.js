require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./src/config/db");
const setupSwaggerDocs = require("./src/config/swagger");

// Import Routes
const registerUserRouter = require("./src/routes/authRoute");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database Connection
connectDB();

// Swagger Documentation
setupSwaggerDocs(app);

// Routes
app.use("/api/auth", registerUserRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
