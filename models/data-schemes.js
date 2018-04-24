var mongoose=require('mongoose');

var dataSchema=mongoose.Schema({
  fileName:{
    type:String,
    required:true
  },
  author:{
    type:String,
    required:true
  },
  year:{
    type:Number,
    required:true
  },
  grade:{
    type:Number,
    required:true
  }
});

var schemeData=module.exports=mongoose.model('schemeInfo',dataSchema);
