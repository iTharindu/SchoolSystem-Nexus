/*let mongoose = require('mongoose');

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
//<<<<<<< HEAD
>>>>>>> 90f784390c853ced499f62fb0bd8c2274dcaa149
  student_id: {
    type : String,
    required : true
  },
  //student_name: {
//=======
  marks_given:{
    type : Number,
    required : false
  }
  /*student_id :{
>>>>>>> 09f2777f173c1d7276eee5da1555840a192a8559
>>>>>>> 725a2b6290ecf40631655faa4c09852b5b47be49
    type : String,
    required : true
  }*/
//});
//var Submission = module.exports = mongoose.model('Submission',submissionSchema);
