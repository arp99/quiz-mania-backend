const { User } = require('../Models/user.model')

const getUserData = async ( req , res ) => {
    try{
        const { userId } = req.user;//comes from the auth Middleware
        const userData = await User.findOne({ _id : userId }).select('firstName lastName email')
        res.json({ success : true , message : "User Data fetched successfully!" , userData })
    }catch(err){
        res.json({ success : false , message : "Error in fetching user data" , errorMessage : err.message })
    }
}

const getAllUserNames = async ( req , res ) => {
    try{
        const usersData = await User.find({}).select('firstName lastName ')
        res.json({ success : true , message : "Fetched all users data" , usersData })
    }catch(err){
        res.json({ success : false , message : "Error fecthing all user names" , errorMessage : err.message })
    }
}
module.exports = { getUserData, getAllUserNames }