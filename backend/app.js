const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config({ path:'./config.env' });
const port = process.env.PORT;

require('./db/db');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT");
    res.header("Access-Control-Allow-Origin' 'http://localhost:4200' always");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(cors());
app.use(express.json());
app.use(require('./routes/auth'));


app.listen(port, () => {
    console.log("server running at port number", port);
})
