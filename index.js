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

// Serve static files from the public folder
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(
  "/ourwinnerimages",
  express.static(path.join(__dirname, "public/ourwinnerimages"))
);
app.use(
  "/bookVenues",
  express.static(path.join(__dirname, "public/bookVenues"))
);
// Database connection
connectDatabase();

// Admin Routes
const adminRoute = require("./Routes/adminRoutes");
const authLogin = require("./Routes/adminRoutes");

// http://localhost:8000/account/admin
app.use("/account/admin", adminRoute);

// http://localhost:8000/account/admin/login
app.use("/account/admin", authLogin);

// 1. Authentication Routes
// Signup
const authRoute = require("./Routes/authenticationRoutes");
//http://localhost:8000/api/signup
app.use("/api/signup", authRoute);

// Login
const authRouteLogin = require("./Routes/authenticationRoutes");
//http://localhost:8000/api/login
app.use("/api", authRouteLogin);

// 2. Popular Sports image routes
// POST API
const popularSports = require("./Routes/popularsports");
//http://localhost:8000/api/popular-sports/upload
app.use("/api/popular-sports/upload", popularSports);

// GET API
const popularSportsGet = require("./Routes/popularsports");
//http://localhost:8000/api/popular-sports/get
app.use("/api/popular-sports/get", popularSportsGet);

//2.OUR-SPORTS-IMAGE
//POST API
const ourSportsPost = require("./Routes/oursports");
//http://localhost:8000/api/our-sports-post
app.use("/api/our-sports-post", ourSportsPost);

//get API
const ourSportsGet = require("./Routes/oursports");
//http://localhost:8000/api/our-sports-get
app.use("/api/our-sports-get", ourSportsGet);

//Book-Venues-Api
const bookingVenues = require("./Routes/book");
//POST-API
//http://localhost:8000/venues/book-venues
app.use("/venues/book-venues", bookingVenues);
//Get api
const bookingGetVenues = require("./Routes/book");
//http://localhost:8000/venues/get-book-venues
app.use("/venues/get-book-venues/:id", bookingGetVenues);

// Port running
app.listen(process.env.PORT, () => {
  console.log(
    `App is running on ${process.env.PORT} and ${process.env.NODE_ENV}`
  );
});
