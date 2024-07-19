const mongoose=require('mongoose');

const Product=new mongoose.Schema({
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
    productType:{
        type: String,
        required: true
    },
    productName:{
        type: String,
        required: true
    },
})
const product=mongoose.model('product',Product);
module.exports=product;
