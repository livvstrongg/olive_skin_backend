// const express = require("express");
// const cors = require("cors");
// const products = require("./products.json");
// const testimonials = require("./testimonials.json");

// const app = express();

// app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.get("/products", (req, res) => {

//   res.json(products);
// });


// app.get("/testimonials", (req, res) => {

//   res.json(testimonials);
// });

// const PORT = process.env.PORT || 4000;

// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
// pull MONGODB_URL from .env
const { PORT = 4000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL);
// Connection Events
mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
const ProductSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: String,
});

const Product = mongoose.model("Product", ProductSchema);

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("hello world");
});

// PEOPLE INDEX ROUTE
app.get("/products", async (req, res) => {
  try {
    // get all people
    res.json(await Product.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE CREATE ROUTE
app.post("/products", async (req, res) => {
  try {
    // send all people
    res.json(await People.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE UPDATE ROUTE
app.put("/products/:id", async (req, res) => {
  try {
    // update people by ID
    res.json(
      await Product.findByIdAndUpdate(req.params.id, req.body)
    );
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE DELETE ROUTE
app.delete("/products/:id", async (req, res) => {
  try {
    // delete people by ID
    res.json(await Product.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));