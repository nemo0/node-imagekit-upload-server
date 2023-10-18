const express = require("express");
const app = express();
const ImageKit = require("imagekit");
const dotenv = require("dotenv");

dotenv.config();

const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URLENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

// allow cross-origin requests
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// authentication endpoint
app.get("/auth", function (req, res) {
  try {
    var result = imagekit.getAuthenticationParameters();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
