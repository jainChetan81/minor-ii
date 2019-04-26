const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;
let UserSchema = new Schema({
  email: String,
  hours: String,
  licno: String,
  username: {
    type: String,
    unique: true
  }
});
module.exports = mongoose.model("User", UserSchema);
