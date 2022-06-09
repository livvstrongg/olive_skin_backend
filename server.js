require("dotenv").config();

const { PORT = 4000, MONGODB_URL } = process.env;

const express = require("express");

const app = express();

const mongoose = require("mongoose");

const cors = require("cors");
const morgan = require("morgan");

mongoose.connect(MONGODB_URL);

mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose! :) "))
  .on("close", () => console.log("Your are disconnected from mongoose! :("))
  .on("error", (error) => console.log(error));

const ProductSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
});

const Product = mongoose.model("Product", ProductSchema);


app.use(cors()); 
app.use(morgan("dev")); 
app.use(express.json()); 


app.get("/", (req, res) => {
  res.send("Olive skin");
});


app.get("/product", async (req, res) => {
  try {

    res.json(await Product.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});


app.post("/product", async (req, res) => {
  try {

    res.json(await Product.create(req.body));
  } catch (error) {

    res.status(400).json(error);
  }
});


app.put("/product/:id", async (req, res) => {
  try {
    res.json(
      await Product.findByIdAndUpdate(req.params.id, req.body)
    );
  } catch (error) {
    res.status(400).json(error);
  }
});

app.delete("/product/:id", async (req, res) => {
  try {
    res.json(await Product.findByIdAndRemove(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));