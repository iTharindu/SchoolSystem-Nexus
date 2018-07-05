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
  comments_on_submission:{
    type : String,
    required : false
  }
  marks_given:{
    type : Number,
    required : false
  }
  /*student_id :{
    type : String,
    required : true
  }*/
});
var Submission = module.exports = mongoose.model('Submission',submissionSchema);
