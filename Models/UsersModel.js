let mongoose = require("mongoose");
let validator = require("validator");

let UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
     value.length <= 20 && 
     value.length != 0
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value);
    }}
});

module.exports = mongoose.model("User", UsersSchema);