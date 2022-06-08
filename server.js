// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');

// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// const uri = process.env.MONGODB_URI;
// mongoose.connect(uri);

// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })

// const productsRouter = require('./routes/products');
// const testimonialsRouter = require('./routes/testimonials');

// app.use('/products', productsRouter);
// app.use('/testimonials', testimonialsRouter);

// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
// });

require("dotenv").config();

const { PORT = 5000, MONGODB_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// import middlware
const cors = require("cors");
const morgan = require("morgan");

//db connection
mongoose.connect(MONGODB_URL);
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected"))
  .on("error", (error) => console.log(error))

//models
const ProductSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  price: Number,
});

const Product = mongoose.model('Product', ProductSchema);

//Middleware
app.use(cors()); 
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

//test route
app.get("/", (req, res) => {
  res.send("i wish there was data on products");
});

//Player index routes
app.get("/products", async (req, res) => {
  try {
    res.json(await Product.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

//Player Create
app.post("/products", async (req, res) => {
  try {
    res.json(await Player.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

// Player update
app.put('/products/:id', async (req,res) => {
  try {
    res.json(
      await Product.findByIdAndUpdate(req.params.id, req.body)
    )
  } catch (error) {
    res.status(400).json(error);
  }
})

// Player delete
app.delete("/products/:id", async (req, res) => {
  try {
    res.json(await Product.findByIdAndRemove(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

//listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));