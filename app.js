const mongoose =require('mongoose');
const express=require('express');
const app=express();
const path=require('path')
const User=require('./models/user');
const Flight=require('./models/flights');
const Admin=require('./models/admin')
const ejs =require('ejs');
const ejsMate=require('ejs-mate')
const methodOverride=require('method-override');
const bcrypt=require('bcrypt')
mongoose.connect('mongodb://localhost:27017/flight',{
    useNewUrlParser:true,
    
    useUnifiedTopology:true
});

app.engine('ejs',ejsMate)
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
const db=mongoose.connection;
db.on('error',console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("Datebase connected");
})

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

const Userroutes=require('./routes/User');
const Adminroutes=require('./routes/Admin');
app.listen(3000,()=> console.log("Serving at port 3000"));


app.get('/',(req,res)=>{
    res.render('Authenticate/choose')
})



app.get('/registeruser',(req,res)=>{
    res.render('Authenticate/registeruser')
})
app.get('/registeradmin',(req,res)=>{
    res.render('Authenticate/registeradmin')
})

app.post('/registeruser',()=>{

})
 
app.post('/registeradmin',async(req, res)=>{
     const {username,password}= req.body;
     const hash=await bcrypt.hash(password,12);
      const newadmin=new Admin({
        username:username,
        password:hash
      })
      await newadmin.save();
      res.redirect('/loginadmin')
})
 

app.post('/loginuser',async(req,res)=>{
     
    
})
 
app.post('/loginadmin',async(req,res)=>{
    const {username,password}=req.body;
    const admin=await Admin.findOne({username:username});
    const validpassword=await bcrypt.compare(password,admin.password);
    if(validpassword)res.redirect(`/Admin/${admin._id}/flights`);
    else res.redirect('/loginadmin')

})
app.get('/loginuser',(req,res)=>{
    res.render('Authenticate/loginuser')
})

app.get('/loginadmin',(req,res)=>{
      res.render('Authenticate/loginadmin')


})

app.get('/Admin/:id/flights',async(req,res)=>{
    const flights=await Flight.find({});
    const Admin=req.params.id;
    console.log(Admin);
    req.body.id=Admin;
    res.render('Adminview/index',{flights,Admin})
   
  })

app.use('/Admin/:id', Adminroutes);
app.use('/User', Userroutes);




 
  


       
  


