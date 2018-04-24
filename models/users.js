const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  designation:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  grade:{
    type:Number,
    required:false
  }
});

var User=module.exports=mongoose.model('User',userSchema);
