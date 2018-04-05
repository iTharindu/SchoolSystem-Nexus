const LocalStrategy = require('passport-local').Strategy;
const Student = require('../models/student');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
  passport.use(new LocalStrategy(function(username, password, done){

    let query = {username:username};
    Student.findOne(query,function(err,user){
      if (err) throw err;
      if(!user){
        return done(null, false, {message: 'Unknown User'});
      }

      bcrypt.compare(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        }else{
          return done(null, false, {message: 'Incorrect Password'});
        }
      });
    });
  }));
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Student.getUserById(id, function(err, user) {
      done(err, user);
  });
});

}