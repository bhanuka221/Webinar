const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");

const app = express();

// Conecting to MongoDB
mongoose
  .connect("mongodb://localhost:27017/webinar", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Error occured when connecting to DB");
  });

// Adding headers to override default CORS behaviour
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,DELETE,POST,PATCH,OPTIONS,PUT"
  );
  next();
});

// Adding bodyParser middleware for different bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use("/api/user", userRouter);
app.use("/api", postsRouter);

module.exports = app;
