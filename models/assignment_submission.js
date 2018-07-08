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
    type : String,
    required : true
<<<<<<< HEAD
  }*/
//});
//var Submission = module.exports = mongoose.model('Submission',submissionSchema);
=======
  }
});
var Submission = module.exports = mongoose.model('Submission',submissionSchema);
>>>>>>> f6b3442811c2ee5ff7bb0809543e384e7f3614c5
