require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const allRouter = require('./router')

//parse the request to body-parser
app.use(express.json());

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("DB CONNECTED");
    });

app.use('/', allRouter);

const port = 5000
app.listen(port, () => {
    console.log('App is listening on port ${port}');
})