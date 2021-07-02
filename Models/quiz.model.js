const mongoose = require( 'mongoose' ) ;
require('mongoose-type-url');
const { Schema , model } = mongoose ;

const optionSchema = new Schema({
    option : {
        type : String ,
        required : true 
    },
    isRight : {
        type : Boolean ,
        required : true
    }
})

const questionSchema = new Schema({
    question : {
        type: String ,
        required: true 
    },
    //for image based questions
    questionImageUrl : mongoose.SchemaTypes.Url,
    points : {
        type : Number,
        required : true        
    },
    negativePoints : Number ,
    options : {
        type : [ optionSchema ] ,
        default : undefined,
        required : true
    }
})

const quizSchema = new Schema ({
    name : {
        type: String,
        required : [ true , 'Quiz name cannot be empty' ]
    },
    description : {
        type: String,
        required : [ true , 'Quiz description cannot be empty' ]
    },
    imageUrl : {
        type : String,
        required : [ true , 'Quiz image is required' ]        
    },
    playTime : {
        type: Number ,
        required: true
    },
    totalPoints : {
        type: Number,
        required : true
    },
    questions : {
        type : [ questionSchema ],
        default: undefined,
        required : true
    }
})

const Quiz = model( 'Quiz' , quizSchema )
module.exports = { Quiz }