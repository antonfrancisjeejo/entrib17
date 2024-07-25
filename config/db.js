const mongoose = require("mongoose");

const url =
  "mongodb+srv://anton:anton@cluster0.5vwonvi.mongodb.net/users-app?retryWrites=true&w=majority&appName=Cluster0";

const connnectDB = async () => {
  try {
    const con = await mongoose.connect(url);
    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connnectDB;
