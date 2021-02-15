"use strict";

const yargs = require("yargs");
const argv = yargs.argv;
const assert = require("chai").assert;

const express = require("express");
const path = require("path");

const app = express();

const port = process.env.PORT || 3000;

const static_file_path = path.join(__dirname, "public");
const static_file_middleware = express.static(static_file_path);
app.use("/", static_file_middleware);



app.get('/ping', (req,res) => {
    res.send("OKOKOK");
});

app.listen(port, () => {
    console.log(`start web app at localhost: ${port}`);
});