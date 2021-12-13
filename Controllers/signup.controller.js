const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { User } = require('../Models/user.model')

const createUser = async ( req , res ) => {
    try{
        const { firstName , lastName , email , password } = req.body ;
        const isUserPresent = await User.find({ email })
        if( isUserPresent && isUserPresent.length > 0 ){
            return res.status(409).json({ success : false , message : "User already exists!!"});
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash( password, saltRounds );
        const savedUser = new User({
            _id : new mongoose.Types.ObjectId(),
            firstName,
            lastName,
            email,
            password : hashedPassword
        })
        await savedUser.save(); 
        return res.status(201).json({ success : true , message : "User created!" });
    }catch( err ){
        res.json({ 
            success: false , 
            message : 'Error! User could not be created',
            errorMessage : err.message
        })
    }
}
module.exports = { createUser }