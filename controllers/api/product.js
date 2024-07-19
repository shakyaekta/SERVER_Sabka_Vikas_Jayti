const Product= require('../../models/product');
const transporter=require('../../config/nodemailer');




module.exports.getProduct = async(req,res)=>{
    try{
         const product=await Product.find({});
         console.log(product);
 
         res.status(200).json(product);
    }catch(err){
         res.status(404).json({message:err.message});
    }
  }


 
 module.exports.createProduct= async(req,res)=>{
     const product=req.body;
     console.log(product);  
     const newProduct= new Product(product);
     

      const mailOptions = {
        from: `${process.env.SMTP_USER}`, // Replace with your email
        to: `${process.env.SMTP_OWNER}`, // Replace with recipient email
        subject: 'A new PRODUCT created',
        text: `Name: ${newProduct.name}\nEmail: ${newProduct.email}\nPhone No: ${newProduct.phone}\nAddress: ${newProduct.address}\nProduct Type: ${newProduct.productType}\nProduct Name: ${newProduct.productName}`
    };


     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Error sending email', details: error });
        }
        res.json({ message: 'Form submitted and email sent successfully!' });
    });

     try{
         await newProduct.save();
        //  res.status(202).json(newContact);
        console.log(newProduct)
     }catch(err){
        //  res.status(404).json({message:err.message});
        console.log(err);
    }
    
 }