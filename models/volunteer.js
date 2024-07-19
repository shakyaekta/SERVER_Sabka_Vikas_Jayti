const mongoose=require('mongoose');

const Volunteer=new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    MobNo:{
        type:Number,
        required: true,
    },
    AlterNo:{
        type:Number
    },
    city:{
        type:String,
        required: true,
    },
    state:{
        type:String,
        required: true,
    },
    country:{
        type:String,
        required: true,
    },
    Pincode:{
        type:String,
        required: true,
    },
    joinus:{
        type:String,
    },
    status:
    {
        type:String,
        required:true
    }
})
const volunteer=mongoose.model('volunteer',Volunteer);
module.exports=volunteer;
