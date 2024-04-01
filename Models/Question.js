import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema({
    question_number:{
        type:String,
        unique:true
    },
    question_name:{
        type:String,
    },
});

const QuestionModel = mongoose.model('Question', QuestionSchema); 
export default QuestionModel; 