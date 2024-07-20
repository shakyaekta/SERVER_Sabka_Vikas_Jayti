const Teacher=require('../../models/teaching');
const transporter=require('../../config/nodemailer');




module.exports.getTeaching = async(req,res)=>{
    try{
         const teacher=await Teacher.find({});
         console.log(teacher);
 
         res.status(200).json(teacher);
    }catch(err){
         res.status(404).json({message:err.message});
    }
  }


 
 module.exports.createTeacher= async(req,res)=>{
     const teacher=req.body;
     console.log(teacher);  
     const newProduct= new Teacher(teacher);
     

      const mailOptions = {
        from: `${process.env.SMTP_USER}`, // Replace with your email
        to: `${process.env.SMTP_OWNER}`, // Replace with recipient email
        subject: 'A new candidate for Teacher',
        text: `Name: ${newTeacher.name}\nEmail: ${newTeacher.email}\nPhone No: ${newTeacher.phone}\nAddress: ${newTeacher.address}\nEducation Qualification: ${newTeacher.education}`
    };


     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Error sending email', details: error });
        }
        res.json({ message: 'Form submitted and email sent successfully!' });
    });

     try{
         await newTeacher.save();
        //  res.status(202).json(newContact);
        console.log(newTeacher);
     }catch(err){
        //  res.status(404).json({message:err.message});
        console.log(err);
    }
    
 }