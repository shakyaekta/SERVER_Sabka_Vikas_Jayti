const mongoose=require('mongoose');

const Teaching=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type:Number,
        required: true,
    },
    address:{
        type: String,
        required: true
    },
    education:{
        type: String,
        required: true
    }
   
})
const teaching=mongoose.model('teaching',Teaching);
module.exports=teaching;
