const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDatabase = require("./Config/connection");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
dotenv.config({ path: path.join(__dirname, "Config", "config.env") });
//Database-connection
connectDatabase();

//Admin Route
const adminRoute = require("./Routes/adminRoutes");
//http://localhost:8000/account/admin
app.use("/account/admin", adminRoute);

//All Routes

//1.Authentication-Routes
const authRoute = require("./Routes/authenticationRoutes");
//http://localhost:8000/api/signup
app.use("/api/signup", authRoute);

//PortRunning
app.listen(process.env.PORT, () => {
  console.log(
    `App is running on ${process.env.PORT} and ${process.env.NODE_ENV}`
  );
});
