let mongoose = require('mongoose');

let submissionSchema = mongoose.Schema({
  submission : {
    type : String,
    required : true
  },
});
//var Submission = module.exports = mongoose.model('Submission',submissionSchema);
