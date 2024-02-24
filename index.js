const express = require("express");
const app = express();
require("dotenv").config({});

const PORT = process.env.PORT;
// const token = process.env.token;

app.get("/hello", (req, res) => {
  res.status(200).json("Hello World");
});

app.get("/webhook", (req, res) => {
  if (
    req.query["hub.mode"] === "subscribe" &&
    req.query["hub.verify_token"] === 'token'
  ) {
    res.send(req.query["hub.challenge"]);
  } else res.sendStatus(400);
});

app.listen(PORT || 5000, () => {
  console.log(`Server running on PORT : ${PORT} `);
});
