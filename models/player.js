const mongoose = require("mongoose");

const name = "player";
const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date, 
    required: true
  },
  age: {
    type: Number
  }, 
  cnp: {
    type: String,
    required: true
  },
  birthPlace: {
      name: {
        type: String,
        required: true
      },
      county: {
        type: String,
        required: true
      },
  },
  married: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model(name, schema);
