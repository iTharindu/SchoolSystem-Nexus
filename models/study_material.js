var mongoose=require('mongoose');

var studyMaterial=mongoose.Schema({
  fileName:{
    type:String,
    required:true
  },
  Details :{
    type : String,
    required:false
  }
});

var StudyMaterial = module.exports = mongoose.model('StudyMaterial',studyMaterial);
