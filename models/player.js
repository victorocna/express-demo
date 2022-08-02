const mongoose = require("mongoose");

const name = "player";

const schema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  age: {
    type: Number,
  },
  cnp: {
    type: Number,
  },
  place: {
    name: {
      type: String,
    },
    county: {
      type: String,
    },
  },
  married: {
    type: Boolean,
  },
});

module.exports = mongoose.model(name, schema);
