const mongoose = require("mongoose");

const name = "club";
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["activ", "radiat"],
  },
  viza: [Number],
});

module.exports = mongoose.model(name, schema);
