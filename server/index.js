const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
