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
  due_date : {
    type : String,
    required : true
  },
  marks_allocated : {
    type : String,
    required : true
  },
  body : {
    type : String,
    required : true
  },
  has_to_upload_a_file: {
    type : String,
    required : true
  }

});

var Assignment = module.exports = mongoose.model('Assignment',assignmentSchema);
