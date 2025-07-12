const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL;

const myUrl = mongoUrl;

mongoose.connect(myUrl, {
    ssl: true, // force SSL
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Mongodb connected');
});

db.on('error', (err) => {
    console.log('Error in mongodb connection', err);
});

db.on('disconnected', () => {
    console.log('Mongodb is disconnected');
});

module.exports = db;

