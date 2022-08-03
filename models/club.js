const mongoose = require("mongoose");

const name = "club";
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    },
});

module.exports = mongoose.model(name, schema);
