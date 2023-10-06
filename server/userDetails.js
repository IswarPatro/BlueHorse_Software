const mongoose = require("mongoose");
require("dotenv").config();
const uri1 = process.env.MONGO_URL;

const UserDetailsSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    collection: "UserInfo",
  }
);
const UserDataSchema = new mongoose.Schema(
  {
    name: String,
    profession: String,
    age: Number,
  },
  {
    collection: "UserData",
  }
);

const conn1 = mongoose.createConnection(uri1, () => {
  console.log("Connected to UserInfo");
});
const conn2 = mongoose.createConnection(uri1);

const userInfo = conn1.model("UserInfo", UserDetailsSchema);
const userData = conn2.model("UserData", UserDataSchema);

module.exports = { userInfo, userData };
