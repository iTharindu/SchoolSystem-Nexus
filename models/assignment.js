let mongoose = require('mongoose');

let assignmentSchema = mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  author : {
    type : String,
    required : true
  },
  body : {
    type : String,
    required : true
  }
});

var Assignment = module.exports = mongoose.model('Assignment',assignmentSchema);
