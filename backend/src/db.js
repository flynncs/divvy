const { Sequelize } = require("sequelize");

const connectDb = async () => {
  const env = process.env.NODE_ENV || "development";
  const databaseUrl =
    env === "production"
      ? process.env.DATABASE_URL
      : process.env.DATABASE_URL_DEV;

  const sequelize = new Sequelize(databaseUrl, {
    dialect: "postgres",
  });

  try {
    await sequelize.authenticate();
    console.log("Database connected!");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error; // Rethrow to handle it at the server level
  }

  return sequelize;
};

module.exports = connectDb;
