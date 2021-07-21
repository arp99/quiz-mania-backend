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

const saveQuizResults = async ( req , res ) =>{
    try{
        const { quizId , score } = req.body
        const { userId } = req.user
        console.log({ quizId , score, userId })
        
        const isAttempted = await User.find({ _id : userId }).select('attemptedQuiz')
        if(isAttempted[0].attemptedQuiz.length === 0){
            await User.updateOne({ _id : userId } , {attemptedQuiz : [{ quizId , score }]} , { upsert : true })
        }else{
            const attemptedQuizes = isAttempted[0].attemptedQuiz;
            const newScore = score

            User.findOne({ _id : userId })
            .then( user => {
                const quizIndex = attemptedQuizes.map(quiz => quiz.quizId).indexOf(quizId);
                if( quizIndex !== -1 ){
                    user.attemptedQuiz[quizIndex].score = newScore;
                    user.save();
                }else{
                    user.attemptedQuiz.push({ quizId , score })
                    user.save()
                }
             })
             .catch(err => { throw err })
             
        }   
        res.json({ success : true , message : "Results received" })        
    }catch(err){
        res.json({ success : false , message : "Error saving quiz results", errorMessage : err.message })
    }
} 

module.exports = { getUserData, getAllUserNames, saveQuizResults }