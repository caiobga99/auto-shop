import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.MYSQLDATABASE as string,
  process.env.MYSQLUSER as string,
  process.env.MYSQLPASSWORD as string,
  {
    dialect: "mysql",
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT as unknown as number,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established sucessfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
