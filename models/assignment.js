let mongoose = require('mongoose');

let assignmentSchema = mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  assignment_type: {
    type : String,
    required : true
  },
  uploaded_date:{
    type : String,
  },
  due_date : {
    type : Date
  },
  marks_allocated : {
    type : Number,
    required : true
  },
  body_assignment : {
    type : String,
    required : true
  },
  has_to_upload_a_file: {
    type : String,
    required : true
  }

});

var Assignment = module.exports = mongoose.model('Assignment',assignmentSchema);
