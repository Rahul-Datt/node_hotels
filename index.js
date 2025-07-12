const express = require("express");
const db = require('./db.js');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const personRoute = require('./routes/personRoutes.js');
const menuRoute = require('./routes/menuRoutes.js');
require('dotenv').config();

const PORT = process.env.PORT || 3000

const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next();
}

app.use(logRequest);
app.get('/', (req, res) => {
    res.send('welcome to my hotel')
});

app.use('/person', personRoute);

app.use('/menuList', menuRoute);

app.listen(PORT, () => {
    console.log('listening to port no. 3000')
})