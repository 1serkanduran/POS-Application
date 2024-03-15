const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      // required: true,
    },
  },
  { timestamps: true } //oluşturulduğu zamanı öğrenmek için
);

const User = mongoose.model("users", UserSchema);
module.exports = User;
