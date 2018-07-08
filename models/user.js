const mongoose = require('mongoose');
var bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
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
  },
  type : {
    type : String,
    required : true
  },
  address : {
    type : String,
    required : false
  },
  date_of_birth : {
    type : Date,
    required : false
  }
});

const User = module.exports = mongoose.model('User',userSchema)

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	  bcrypt.hash(newUser.password, salt, function(err, hash) {
	     newUser.password = hash;
	     newUser.save(callback);
	    });
	});
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}
