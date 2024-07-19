const mongoose = require('mongoose');
require('dotenv').config(); 

const mongoUri=process.env.MONGO_ATLAS;
async function main(){
    await mongoose.connect(mongoUri)
}
main().then(()=>{
   console.log("connection establish");
}).catch((err)=>{
   console.log(err);
})

