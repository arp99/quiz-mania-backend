const jwt = require('jsonwebtoken')
const { User } = require('../Models/user.model')

const verifyAuth = async ( req , res , next ) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({ success : false , message : 'Unauthorized access! Token missing' });
        }
        const decoded = jwt.verify( token , process.env.SECRET );
        const isUserIdExists = await User.findOne({ _id : decoded.userId })
        if( isUserIdExists ){
            req.user = { userId : decoded.userId }
            return next()
        }else{
            throw Error
        }
    }catch(err){
        return res.status(403).json({ 
            success : false , 
            message : 'Unauthorized access! token error' , 
            errorMessage : err.message 
        })
    }
}
module.exports = { verifyAuth }