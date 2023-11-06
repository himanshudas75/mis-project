const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {                
        type: String,
        required: true,
        unique: true,
        match: /[0-9][0-9][A-Z][A-Z][0-9]*/,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        trim: true
    },
    address:{
        type: String,
        trim: true

    },
    phone_number:{
        type: Number,
        unique: true,
        trim: true
    },
    name:{
        type: String,
        trim: true
    },
    gender:{
        type: String,
        trim: true
    },
    Dob:{
        type: Date,
        trim: true
    }
});

module.exports = mongoose.model('User', userSchema);