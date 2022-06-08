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

// const express = require("express");
// const methodOverride = require("method-override");
// const controllers = require("./controllers");
// const app = express();
// const navLinks = require("./navLinks");
// require("./db.connection");

// const { PORT = 4000, MONGODB_URL } = process.env;


// const cors = require("cors");
// const morgan = require("morgan");


// app.use(methodOverride("_method"));
// app.use(cors()); 
// app.use(morgan("dev")); 
// app.use(express.json()); 

// app.use("/room", controllers.room);

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

// app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));

// youtube video code

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = processs.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection= mongoose.connection;
connection.once('open', () => {
  console.log("Mongodb database connection established successfully");
})

const productRouter = require('./routes/product');
const testimonialsRouter = require('./routes/testimonials');

app.use('/products', productRouter);
app.use('/testimonials', testimonialsRouter);

app.listen(port, () => {
  console.log("listening on port " + port);
});