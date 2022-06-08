const mongoose = require("mongoose");

require("dotenv").config();

const connectionStr = process.env.MONGODB_URL;

//connect to mongodb
mongoose.connect(connectionStr);

mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));