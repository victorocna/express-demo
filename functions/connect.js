require("dotenv").config();
const mongoose = require("mongoose");

const connectToMongo = () => {
  return mongoose.connect(process.env.MONGODB_URI);
};

module.exports = connectToMongo;
