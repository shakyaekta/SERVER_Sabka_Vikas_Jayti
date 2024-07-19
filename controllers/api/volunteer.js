const Volunteer= require('../../models/volunteer');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const transporter = require('../../config/nodemailer');



module.exports.getVolunteer = async(req,res)=>{
    try{
         const volun=await Volunteer.find({});
         console.log(volun);
 
         res.status(200).json(volun);
    }catch(err){
         res.status(404).json({message:err.message});
    }
}

module.exports.createVolunteer=async(req,res)=>{
    const volunteer=req.body;
    const volunteerId = uuidv4();
    
    const newvolun= new Volunteer({
        id: volunteerId,
        name:req.body.name,
        email:req.body.email,
        MobNo:req.body.MobNo,
        AlterNo:req.body.AlterNo,
        city:req.body.city,
        state:req.body.state,
        country:req.body.country,
        Pincode:req.body.Pincode,
        joinus:req.body.joinus,
        status:'pending'
    });

    try {
            await newvolun.save();
            console.log(newvolun);
        } catch (error) {
            console.log("Error",error);
        }

    // NODEMAILER..............>
    

    
    const acceptLink = `http://localhost:5000/api/volunteer/accept/${volunteerId}`;
    const rejectLink = `http://localhost:5000/api/volunteer/reject/${volunteerId}`;


      try {
        await transporter.sendMail({
          from: `${process.env.SMTP_USER}`,
          to: `${process.env.SMTP_OWNER}`,
          subject: 'New Volunteer Application',
          html: `
        <h3 style="color: aqua; font-size: 2rem; text-align: center">A new volunteer has applied.</h3>
        <p style= "color: grey; font-size: 1.5rem">Name: ${newvolun.name}</p>
        <p style= "color: grey; font-size: 1.5rem">Email: ${newvolun.email} </p>
        <p style= "color: grey; font-size: 1.5rem">Mobile No.: ${newvolun.MobNo}</p>
        <p style= "color: grey; font-size: 1.5rem">Alternate Mobile No.: ${newvolun.AlterNo}</p>
        <p style= "color: grey; font-size: 1.5rem">City: ${newvolun.city}</p>
        <p style= "color: grey; font-size: 1.5rem">Country: ${newvolun.country}</p>
        <p style= "color: grey; font-size: 1.5rem">State: ${newvolun.state}</p>
          <p>
          <a href="${acceptLink}" style="text-decoration: none; color: white;">
            <button style="background-color: green; padding: 10px; border: none; border-radius: 5px;">Accept</button>
          </a>
          <a href="${rejectLink}" style="text-decoration: none; color: white;">
            <button style="background-color: red; padding: 10px; border: none; border-radius: 5px;">Reject</button>
          </a> 
        </p>`
        });
    
        res.json({ message: 'Application submitted successfully' });


      } catch (error) {
        res.status(500).json({ message: 'Error submitting application' });
      }

    
}

module.exports.accept=async(req,res)=>{
    const volunteerId = req.params.id;


  try {
    // Update the volunteer's status to accepted
    const volunteer = await Volunteer.findOneAndUpdate(
      { id: volunteerId },
      { status: 'accepted' }
    );

    // Send acceptance email to the volunteer
    
    await transporter.sendMail({
      from: 'sabkavikasjayti.ngo@gmail.com',
      to: volunteer.email,
      subject: 'Volunteer Application Accepted',
      text: 'Congratulations! Your volunteer application has been accepted.',
    });

    res.send('Volunteer accepted and notified');
  } catch (error) {
    res.status(500).json({Error:`${error}` });
  }
};

module.exports.rejected = async(req,res)=>{
    const volunteerId = req.params.id;

  try {
    // Delete the volunteer's status to rejected
    const volunteer = await Volunteer.findOneAndDelete(
      { id: volunteerId },
    );

    // Send rejection email to the volunteer
    await transporter.sendMail({
      from: 'sabkavikasjayti.ngo@gmail.com',
      to: volunteer.email,
      subject: 'Volunteer Application Rejected',
      text: 'We regret to inform you that your volunteer application has been rejected.',
    });

    res.send('Volunteer rejected and notified');
  } catch (error) {
    res.status(500).json({ Error:`${error}` });
  }
}
