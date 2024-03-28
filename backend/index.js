if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: './.env' });
}

const express = require('express');

// const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const path = require('path');
const passport = require('./utils/passport');
const connectDB = require('./utils/mongoConnect');

connectDB();
const port = process.env.PORT || 3000;

require('./models/user');

const app = express();

// app.use(
//     cors({
//         credentials: true,
//         origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
//     })
// );

app.set('trust proxy', 1);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
    mongoSanitize({
        replaceWith: '_',
    })
);

app.use(passport.initialize());

const userRoutes = require('./routes/users');
const complaintRoutes = require('./routes/complaints');
const adminRoutes = require('./routes/admin');
const actionRoutes = require('./routes/actions');

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/actions', actionRoutes);
app.use('/api/complaint/', complaintRoutes);
app.use('/api/', userRoutes);

app.use((err, req, res, next) => {
    if (!err.statusCode) err.statusCode = 500;
    if (!err.message) err.message = 'Something went wrong';
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
});

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
