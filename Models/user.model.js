const mongoose = require('mongoose')
require('mongoose-type-email')
const { Schema , model } = mongoose

const userSchema = new Schema({
    _id : Schema.Types.ObjectId,
    firstName : {
        type: String,
        required: [ true , 'First Name cannot be empty']
    },
    lastName : {
        type : String
    },
    email : {
        type : mongoose.SchemaTypes.Email,
        required : [ true , 'Email is required' ]        
    },
    password : {
        type: String ,
        required : [ true , 'Password cannot be empty' ]
    }
})

const User = model( 'User' , userSchema )
module.exports = { User }