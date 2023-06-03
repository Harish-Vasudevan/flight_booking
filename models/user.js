const mongoose=require('mongoose');
const Flight=require('./flights')

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
        
    },
    password:{
    type:String,
    required:true,
    min:3,
    max:50
   },
    
    email:{
        type:String,
        required:true,
        lowercase:true,
    }
    ,
    contact:{
        type:String,
        required:true,
       validate:{
        validator: v => v.length===10 
       }
        
    },

    age:{
        type: Number,
        required:true,
        min:10,
        max:80
    },

    gender:{
        type:String,
        required:true,
        

    },

    createdAt:{
         type:Date,
         immutable:true,
         default: ()=> Date.now()
    },

    updatedAt:{
        type:Date,
        default: ()=> Date.now()
    }
    ,
    location:{
        type:String,
        required:true
    },

    // mybookings:[
    //     {
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Flight'
    //     }
    // ]
      
});

const User=mongoose.model('User',userSchema);

module.exports=User
