let mongoose = require('mongoose');

let submissionSchema = mongoose.Schema({
  assignment_submission : {
    type : String,
    required : true
  },
  assignment_id : {
    type : String,
    required : true
  },
  marks_given : {
    type : Number,
    required : false
  },
  comments_on_submission:{
    type : String,
    required : false
  },

  student_id: {
    type : String,
    required : true
  },
  student_name: {

  marks_given:{
    type : Number,
    required : false
  }

});

var Submission = module.exports = mongoose.model('Submission',submissionSchema);
