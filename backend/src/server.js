require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authenticate = require("./middlewares/authenticate");
const connectDb = require("./db");
const models = require("./models");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(authenticate);

// Sync models
const syncModels = async () => {
  try {
    await models.sequelize.sync({ force: false });
    console.log("Models synced successfully!");
  } catch (error) {
    console.error("Error syncing models:", error);
  }
};

const startServer = async () => {
  try {
    const sequelize = await connectDb();

    await syncModels();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

// Test route
app.get("/", (req, res) => {
  res.send("Divvy Server");
});

startServer();
