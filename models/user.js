const mongoose=require('mongoose');
const { validateEmail } = require('../utils/helper');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    username:{
        type:String,
        required:'A unique username is required',
        unique: true
    },
    name:{
        type:String,
        required:'A name must be provided'
    },
    employeeId:{
        type:String,
        required:'a unique employee id is needed',
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:'Enter data in yyyy-mm-dd format only'
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: 'Email address is already assigned',
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }

});

const User = mongoose.model("User",UserSchema);
module.exports=User;