const { User } = require('../Models/user.model')

const getUserData = async ( req , res ) => {
    try{
        const { userId } = req.user;//comes from the auth Middleware
        const userData = await User.findOne({ _id : userId })
                        .select('firstName lastName email attemptedQuiz')
                        .populate({ 
                            path:"attemptedQuiz", 
                            populate : {
                                path : "quizId",
                                select : { _id : 1 , name : 1 , imageUrl : 1}
                            }
                        })

        res.json({ success : true , message : "User Data fetched successfully!" , userData })
    }catch(err){
        res.json({ success : false , message : "Error in fetching user data" , errorMessage : err.message })
    }
}

const getAllUserNames = async ( req , res ) => {
    try{
        const usersData = await User.find({})
                        .select('firstName lastName attemptedQuiz')
                        .populate({ 
                            path:"attemptedQuiz", 
                            populate : {
                                path : "quizId",
                                select : { _id : 1 , name : 1}
                            }
                        })
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

const getLeaderBoardForQuiz = async ( req, res ) => {
    try{
        const { userId } = req.user
        const { quizId } = req.query
        const AllUsersData = await User.find({})
                        .select('firstName lastName attemptedQuiz')
                        .populate({ 
                            path:"attemptedQuiz", 
                            populate : {
                                path : "quizId",
                                select : { _id : 1 , name : 1}
                            }
                        })
        const usersAttempted = AllUsersData.filter( user => {
            
            const foundQuiz = user.attemptedQuiz.filter( quiz => quiz.quizId._id.toString() ===  quizId )
            if(foundQuiz.length > 0){
                return user
            }
        })
        const modifiedUserData = usersAttempted.map(user => {
            return {
                firstName : user.firstName,
                lastName : user.lastName,
                quizName : user.attemptedQuiz[0].quizId.name,
                score : user.attemptedQuiz[0].score
            }
        })
        const leaderBoard = modifiedUserData.slice().sort(( user1, user2 ) => user2.score - user1.score ).slice(0,5)
        res.json({ success : true, message : "Successfully fetched leaderboard", leaderBoard })

    }catch( err ){
        res.status(500).json({ success : false, message : "Error fecthing leaderboard", errorMessage : err.message })
    }
}

module.exports = { getUserData, getAllUserNames, saveQuizResults, getLeaderBoardForQuiz }