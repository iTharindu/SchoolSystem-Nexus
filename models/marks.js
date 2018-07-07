let mongoose =require('mongoose');

//mark schema
let markSchema = mongoose.Schema({
  StudentID:{
    type:String,
    required:true
  },
  Subject1:{
    type:String,
    required:true
  },
  Marks1:{
    type:Number,
    required:true
  },
  Subject2:{
    type:String,
    required:true
  },
  Marks2:{
    type:Number,
    required:true
  },
  Subject3:{
    type:String,
    required:true
  },
  Marks3:{
    type:Number,
    required:true
  }
});

let Mark = module.exports = mongoose.model('Mark',markSchema);
