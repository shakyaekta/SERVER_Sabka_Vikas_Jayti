const express= require('express');
const router=express.Router();



const controller_api =require('../../controllers/api/volunteer');





router.get('/',controller_api.getVolunteer);
router.post('/',controller_api.createVolunteer);
router.get('/accept/:id',controller_api.accept);
router.get('/reject/:id',controller_api.rejected);





module.exports= router; 