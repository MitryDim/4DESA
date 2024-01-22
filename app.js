require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));

//Get port in .env file
const { API_PORT } = process.env;
const port = API_PORT;

// server listening
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
