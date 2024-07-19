const Contact= require('../../models/contact');
const transporter=require('../../config/nodemailer');




module.exports.getContact = async(req,res)=>{
    try{
         const contact=await Contact.find({});
         console.log(contact);
 
         res.status(200).json(contact);
    }catch(err){
         res.status(404).json({message:err.message});
    }
  }


 
 module.exports.createContact= async(req,res)=>{
     const contact=req.body;
     console.log(contact);  
     const newContact= new Contact(contact);
     

      const mailOptions = {
        from: `${process.env.SMTP_USER}`, // Replace with your email
        to: `${process.env.SMTP_OWNER}`, // Replace with recipient email
        subject: 'A New Contact has Applied',
        text: `Name: ${newContact.name}\nEmail: ${newContact.email}\nPhone No: ${newContact.phoneNo}`
    };


     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Error sending email', details: error });
        }
        res.json({ message: 'Form submitted and email sent successfully!' });
    });

     try{
         await newContact.save();
        //  res.status(202).json(newContact);
        console.log(newContact)
     }catch(err){
        //  res.status(404).json({message:err.message});
        console.log(err);
    }
    
 }