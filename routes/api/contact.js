const express= require('express');

const controller_api =require('../../controllers/api/contact');



const router=express.Router();

router.get('/',controller_api.getContact);
router.post('/',controller_api.createContact)





module.exports= router; 