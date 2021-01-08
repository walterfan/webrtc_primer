const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get('', (req,res) => {
    res.send("OKOKOK");
});

app.listen(port, () => {
    console.log(`start web app at localhost: ${port}`);
});