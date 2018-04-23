const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema({
  assignment_submission : {
    type : String,
    required : true
  }
});
const Submission = module.exports = mongoose.model('Submission',submissionSchema);
