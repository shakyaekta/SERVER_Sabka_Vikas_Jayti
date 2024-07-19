const express=require('express');
const bodyParser= require('body-parser')
const cors =require('cors');
require('dotenv').config();


const db=require('./config/index');

const app= express();
const port=process.env.PORT || 5000;

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:'30mb', extended: true}));
app.use(cors());
// app.use('/posts', postRoutes);


app.use('/',require('./routes/index'));

app.listen(port,(err)=>{
    if(err)
        console.log(err);
    console.log(`server is running on port: ${port}`)
})
