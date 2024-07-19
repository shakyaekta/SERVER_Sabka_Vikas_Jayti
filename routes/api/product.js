const express= require('express');

const controller_api =require('../../controllers/api/product');



const router=express.Router();

router.get('/',controller_api.getProduct);
router.post('/',controller_api.createProduct)





module.exports= router; 