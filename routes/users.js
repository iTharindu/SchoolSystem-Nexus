const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in User Model
let Student = require('../models/student');

// Register Form
router.get('/student',function(req,res){
  res.render('add_student');
});

router.post('/student',function(req,res){
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const passwordRepeat = req.body.passwordRepeat;

  req.checkBody('username','name is required').notEmpty();
  req.checkBody('email','email is required').notEmpty();
  req.checkBody('email','email is incorrect').isEmail();
  req.checkBody('password','password is required').notEmpty();
  req.checkBody('passwordRepeat','passwordRepeat is required').notEmpty();
  req.checkBody('passwordRepeat','passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors){
    res.render('add_student',{
      errors:errors
    });
  }else{
      let student = new Student({
        username:username,
        email:email,
        password:password
      });
      Student.createStudent(student, function(err, user){
			  if(err) throw err;
			  console.log(student);
	    });

      res.redirect('/users/login');
  }

});

// Login Form
router.get('/login', function(req, res){
  res.render('login');
});

// Login Process
router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/users/login',
    failureFlash: true
  })(req, res, next);
});

// logout
module.exports = router;
