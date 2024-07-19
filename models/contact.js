const mongoose=require('mongoose');

const contactMe=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phoneNo:{
        type:Number,
        required: true,
    }
})
const Contact=mongoose.model('Contact',contactMe);
module.exports=Contact;
