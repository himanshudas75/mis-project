const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {                
        type: String,
        required: true,
        unique: true,
        match: /[0-9][0-9][A-Z][A-Z][0-9]*/,
        trim: true,
        set: username => username === '' ? undefined : username
    },
    password: {
        type: String,
        required: true,
        trim: true,
        set: password => password === '' ? undefined : password
    },
    email:{
        type: String,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        trim: true,
        set: email => email === '' ? undefined : email
    },
    address:{
        type: String,
        trim: true
    },
    phoneNumber:{
        type: String,
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