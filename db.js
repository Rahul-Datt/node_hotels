const mongoose = require('mongoose');

const myUrl = 'mongodb://127.0.0.1:27017/RahulDatt';

mongoose.connect(myUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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

