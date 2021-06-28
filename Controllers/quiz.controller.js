const { Quiz } = require( '../Models/quiz.model' )

const getQuizes = async ( req , res ) => {
    try{
        const quizes = await Quiz.find({ }).select('_id name description imageUrl');
        res.json({ success: true , message : "Quizes fetched successfully" , quizes });
    }catch(err){
        res.json({ success : false , message : "Error fetching quizes!" , errorMessage: err.message });
    }
}

const getQuizById = async ( req , res ) => {
    try{
        
        const { quizId } = req.body ;
        const quiz = await Quiz.find({ _id : quizId });
        res.json({ success : true , message : "Successfully fetched Quiz" , quizData : quiz })

    }catch(err) {       
        res.json({ success : false , message : "Error Fetching Quiz!", errorMessage : err.message });
    }
}

module.exports = { getQuizes , getQuizById }