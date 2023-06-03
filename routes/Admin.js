const express=require('express');
const Flight = require('../models/flights');
const router=express.Router();

// router.get('/flights',async(req,res)=>{
//     const flights=await Flight.find({});
//    // console.log(flights);
//     res.render('Adminview/index',{flights})
   
//   })
  router.get('/flights/:id',async(req,res)=>{
      const flight=await Flight.findById(req.params.id);
      const Admin=req.body.id;
      console.log(Admin);
      res.render('Adminview/showflights',{flight})
  })

router.get('/addflights',async(req,res)=>{
    res.render('Adminview/addflight')
})
router.post('/flights',async(req,res)=>{
   const flight= new Flight(req.body.flight);
   await flight.save();
   res.redirect(`/Admin/flights/${flight._id}`);
   
})


module.exports=router;