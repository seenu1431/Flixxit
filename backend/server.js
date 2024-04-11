const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");

// For parsing dotenv files
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.mongoDbUrl)
  .then(() => console.log("DB connected"));

app.use("/api/user", userRoutes);

app.listen(5000, () => console.log("Server is running on PORT 5000"));
