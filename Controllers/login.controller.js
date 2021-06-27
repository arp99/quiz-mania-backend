const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {  User } = require('../Models/user.model')

const loginUser = async ( req , res ) => {
    try{
        const { email , password } = req.body;
        //search if the user is registered or not
        const user = User.find({ email })
        if(!user){
            return res.status(401).json({ success: false , message:"User not found!" });
        }else{
            //check if the password match
            const match = await bcrypt.compare(password, user.password);
            if(!match){
                return res.status(401).json({ success : false , message : "Error! Wrong login Credentials" })
            } 
            const token = jwt.sign({ userId : user._id } , process.env.SECRET , { expiresIn : '24h' })
            res.status(200).json({ success : true , message : "Login Successful!" , token })
        }
    }catch(err){
        res.json({ success: false , message: "Error in logging!" , errorMessage : err.message })
    }
}
module.exports = { loginUser }