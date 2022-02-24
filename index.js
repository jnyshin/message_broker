const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const jsonParser = bodyParser.json();
var listen = require("./receive_direct");
var speak = require("./send_direct");

app.get("/", (req, res) => {
  res.send("received");
});
app.post("/listen", jsonParser, async (req, res) => {
  const keys = req.body.keys;
  listen.listen(keys, res);
});
app.use("/speak", jsonParser, function (req, res) {
  console.log("hihi");
  speak.speak(req.body.key, req.body.msg, res);
});

app.listen(80, () => {
  console.log("server started");
});
