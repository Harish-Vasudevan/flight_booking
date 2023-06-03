const express=require('express');
const Flight = require('../models/flights');
const router=express.Router();

router.get('/flights',async(req,res)=>{
  const flights=await Flight.find({});
  res.render('Userview/index',{flights})
 
})
router.get('/flights/:id',async(req,res)=>{
    const flight=await Flight.findById(req.params.id);
    res.render('Userview/showflights',{flight})
})

module.exports=router;