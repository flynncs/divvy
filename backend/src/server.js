require("dotenv").config();
const express = require("express");
const { Sequelize } = require("sequelize");
const models = require("./models");

const app = express();
const port = process.env.PORT || 3000;

// Database connection
const env = process.env.NODE_ENV || "development";
const databaseUrl =
  env === "production"
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL_DEV;

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error("Database connection error:", err));

// Sync models
models.sequelize.sync({ force: false }).then(() => {
  console.log("Models synced successfully!");
});

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Divvy Server");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
