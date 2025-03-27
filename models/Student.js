const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    course:{
        type:String,
        required:true
    },
    fees:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("Student",studentSchema);