const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
const bcrypt = require("bcryptjs");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.listen(5000, () => {
  clearImmediate;
  console.log("Server Started");
});

app.use(bodyparser.urlencoded({ extended: true }));

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const { userInfo, userData } = require("./userDetails");

app.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await userInfo.findOne({ email });
    if (oldUser) {
      return res.send({ error: "User Exists" });
    }
    await userInfo.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});
app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await userInfo.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not Found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);
    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;
    userInfo
      .findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

//CRUD Operations
app.get("/", async (req, res) => {
  userData
    .find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  userData
    .findById({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => console.log(err));
});

app.post("/create", async (req, res) => {
  userData
    .create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  userData
    .findByIdAndUpdate(
      { _id: id },
      {
        name: req.body.name,
        profession: req.body.profession,
        age: req.body.age,
      }
    )
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.delete("/deleteuser/:id", async (req, res) => {
  const id = req.params.id;
  userData
    .findByIdAndDelete({ _id: id })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});
