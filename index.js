const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use(express.json());

let dummyData = [
  { name: "Ryan", id: "1", age: "20" },
  { name: "Liam", id: "2", age: "26" },
  { name: "Lyla", id: "3", age: "22" },
  { name: "Ari", id: "4", age: "25" },
];

app.get("/", (req, res) => {
  console.log("root endpoint hit");
  res.send("Hello, World!");
});

app.get("/users", (req, res) => {
  console.log("USERS HIT GET");
  users = [...dummyData];
  res.send(users);
});

app.get("/user/:id", (req, res) => {
  console.log("USER HIT");
  const id = req.params.id;
  let userById;
  dummyData.forEach(function (user) {
    user.id = id ? (userById = { ...user }) : null;
  });
  if (userById) {
    user = JSON.stringify(userById);
    res.send(user);
  } else {
    res.sendStatus(404).send("Error not a user");
  }
});

app.post("/users", (req, res) => {
  console.log("USERS HIT");
  user = { name: req.body.name, id: req.body.id, age: req.body.age };
  if (user) {
    data = [...dummyData];
    data.push(user);
    dummyData = [...data];
    res.send({ message: `${user.name} added successfully` });
  } else {
    res.sendStatus(404).send("Error not a user");
  }
});

const PORT = process.env.PORT;
const hostName = process.env.HOST_NAME; // ip address of your computer for using with react native frontend

app
  .listen(PORT, hostName, () => {
    console.log(`Server is alive on http://${hostName}:${PORT}`);
  })
  .on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.log("PORT is already in use.");
    } else {
      console.log("Server Errors: ", error);
    }
  });

module.exports = app;
