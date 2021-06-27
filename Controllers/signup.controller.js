const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { User } = require('../Models/user.model')

const createUser = async ( req , res ) => {
    try{
        const { firstName , lastName , email , password } = req.body ;
        const isUserPresent = await User.find({ email })
        if( isUserPresent && isUSerPresent.length > 0 ){
            return res.status(409).json({ success : false , message : "User already exists!!"});
        }
        else{
            const saltRounds = 20;
            const hashedPassword = bcrypt.hash( password, saltRounds );
            const savedUser = new User({
                _id : new mongoose.Types.ObjectId(),
                firstName,
                lastName,
                password : hashedPassword
            })
            await savedUser.save(); 
            return res.status(201).json({ success : true , message : "User created!" });
        }
    }catch( err ){
        res.json({ 
            success: false , 
            message : 'Error! User could not be created',
            errorMessage : err.message
        })
    }
}
module.exports = { createUser }