const bodyParser = require("body-parser");
const express = require("express");
const app = express();
require("dotenv").config({});

// app.use(bodyParser())
app.use(bodyParser.urlencoded());

const PORT = process.env.PORT;
// const token = process.env.token;

app.get("/hello", (req, res) => {
  res.status(200).json("Hello World");
});

const whatsapp_token = process.env.WHATSAPP_TOKEN;

app.get("/", (req, res) => {
  res.send("Hello from whatsappbot");
});

app.get("/webhook", (req, res) => {
  const verify_token = process.env.VERIFY_TOKEN;
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  if (mode && token) {
    if (mode === "subscribe" && token === verify_token)
      console.log("Webhook Verified");
    res.status(200).send(challenge);
  } else res.sendStatus(400);
});

app.post("/webhook",(req,res)=>{
    const {entry} = req.body;
    const {changes} = entry;
    const {messages} = changes;
    const {text} = messages;
    console.log(text.body);

    res.status(200).json("Aur beta ji");

})

app.listen(PORT || 5000, () => {
  console.log(`Server running on PORT : ${PORT} `);
});
