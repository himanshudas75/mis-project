const mongoose = require('mongoose');
const dbUrl = process.env.MONGODB_URL;

const connectDB = () => {
    mongoose.connect(dbUrl);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Database connected');
    });
    db.on('disconnected', () => {
        console.log('Database connection closed');
    });

    db.closeDB = () => {
        mongoose.connection.close();
    };

    return db;
};

module.exports = connectDB;
