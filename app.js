const express = require("express");
const app = express();
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const jamatmember = require('./router/jamatmember');
const jamatuser = require('./router/jamatuser');
const knex = require('./helpers/knex');

app.use(bodyParser.json());
app.use(express.json());
app.use(jamatmember);
app.use(jamatuser);
dotenv.config();


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  //intercepts OPTIONS method
  if ("OPTIONS" === req.method) {
    //respond with 200
    res.sendStatus(200);
  } else {
    //move on
    next();
  }
});

app.listen(3000);