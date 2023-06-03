const mongoose=require('mongoose');
const User=require('./user')
 const flightSchema= new mongoose.Schema({
    flight_id:{
        type: Number,
		min: 10,
		max: 9999,
        required:true
    }
    ,
    airline:{
        type:String,
        required:true,
       
    },
    departsloc:{
        type:String,
        required:true
    },


    departsDate: {
		type: Date,
		default: function() {
			let d = new Date();
			let year = d.getFullYear();
			let month = d.getMonth();
			let day = d.getDate();
			let result = new Date(year + 1, month, day);
			return result;
		}
	},

    arrivalDate:{
        type:Date,
        default: function() {
			let d = new Date();
			let year = d.getFullYear();
			let month = d.getMonth();
			let day = d.getDate();
			let result = new Date(year + 1, month, day);
			return result;
		}

    },
    
    arrival:{
       type:String,
       required:true
    },


    seatavail:{
        type:Number,
        required:true
        
    },

    accomodation:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
]
 })

 const Flight=mongoose.model('Flight',flightSchema);
module.exports=Flight