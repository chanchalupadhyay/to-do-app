const mongoose = require("mongoose");


const todoSchema=new mongoose.Schema({
    // creating schema for todo app

    task:{ // task is field 1

        type:String, //type of task should be string
        unique:true,
        required:true
    },

    completed:{
        type:Boolean,
        default:false
    }


});

const todoModel=mongoose.model("Todo",todoSchema);

module.exports=todoModel;


