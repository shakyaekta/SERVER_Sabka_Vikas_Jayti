const express= require('express');

const controller_api =require('../../controllers/api/teaching');



const router=express.Router();

router.get('/',controller_api.getTeaching);
router.post('/',controller_api.createTeacher);





module.exports= router; 