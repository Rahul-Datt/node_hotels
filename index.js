const express = require("express");
const db = require('./db.js');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const personRoute = require('./routes/personRoutes.js');
const menuRoute = require('./routes/menuRoutes.js');

app.get('/', (req, res) => {
    res.send('welcome to my hotel')
});

app.use('/person', personRoute);

app.use('/menuList', menuRoute);

app.listen(3000, () => {
    console.log('listening to port no. 3000')
})