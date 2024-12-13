const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const app = express();

const User = require("./models/userModel");

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://2022dhruvmaurya:4nPzjRAivs9hw2S4@cluster1.rattm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
);

const check = async (c, d) => {
  const usr = await User.findOne({ username: c });
  if (usr) {
    const isMatch = await bcrypt.compare(d, usr.password);
    if (isMatch) {
      return "Password is correct You can Enter";
    } else {
      return "Wrong Password! Try Again!!";
    }
  } else {
    return "user does not exist";
  }
};

const createUser = async (a, b) => {
  const exist = await User.findOne({ username: a });
  const hashedPassword = await bcrypt.hash(b, 10);
  if (exist) {
    console.log("user already exist");
  } else {
    try {
      const arc = await User.create({
        username: a,
        password: hashedPassword,
      });

      console.log("User created:", arc);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }
  // await User.deleteMany({});
};

const updateUser = async (orignal, toUpdate) => {
  await User.updateOne({ username: orignal }, { username: toUpdate });
  await instance.save();
};

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/update", (req, res) => {
  const { user, newU } = req.body;
  updateUser(user, newU);
});

app.post("/create", (req, res) => {
  const { user, pass } = req.body;
  const nam = user + pass;
  createUser(user, pass);
  res.json({ nam });
});

app.post("/check",async (req, res) => {
  const { checkU, checkP } = req.body;
  const val = await check(checkU, checkP);
  res.json({ val });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
