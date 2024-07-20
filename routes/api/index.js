const express = require('express');
const router=express.Router();



router.use('/contact', require('./contact'));
router.use('/volunteer', require('./volunteer'));
router.use('/product', require('./product'));
router.use('/teaching', require('./teaching'));



module.exports= router; 