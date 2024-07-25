const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    jobRole: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("user-datas", UsersSchema);

module.exports = Users;
