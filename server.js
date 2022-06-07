const express = require("express");
const cors = require("cors");
// Import JSON files
const products = require("./products.json");
const testimonials = require("./testimonials.json");
// Create our app object
const app = express();

// set up middleware
app.use(cors());

//home route for testing our app
app.get("/", (req, res) => {
  res.send("Hello World");
});

// route for retrieving projects
app.get("/products", (req, res) => {
  // send projects via JSON
  res.json(products);
});

// route for retrieving about info
app.get("/testimonials", (req, res) => {
  // send projects via JSON
  res.json(testimonials);
});

// const MONGODB_URI = 'mongodb+srv://livvstrongg:<password>@cluster0.v3h64wc.mongodb.net/?retryWrites=true&w=majority';
// //declare a variable for our port number
const PORT = process.env.PORT || 4000;

// mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
//   .then(() => app.listen(PORT, () => console.log(`Server listening on ${PORT}`)))
//   .catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false);
// turn on the server listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));