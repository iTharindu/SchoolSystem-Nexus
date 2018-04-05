const mongoose = require('mongoose');
var bcrypt = require('bcryptjs')

const studentSchema = mongoose.Schema({
  username : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  }
});

const Student = module.exports = mongoose.model('Student',studentSchema)

module.exports.createStudent = function(newStudent, callback){
	bcrypt.genSalt(10, function(err, salt) {
	  bcrypt.hash(newStudent.password, salt, function(err, hash) {
	     newStudent.password = hash;
	     newStudent.save(callback);
	    });
	});
}

module.exports.getUserById = function(id, callback){
	Student.findById(id, callback);
}
