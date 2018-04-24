var mongoose=require('mongoose');

var dataSchema=mongoose.Schema({
  fileName:{
    type:String,
    required:true
  },
  grade:{
    type:Number,
    required:true
  }
});

var circularData=module.exports=mongoose.model('circularInfo',dataSchema);
