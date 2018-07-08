const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in User Model
let User = require('../models/user');

// Register Form
router.get('/adduser',function(req,res){
  res.render('add_user');
});

router.post('/adduser',function(req,res){
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const passwordRepeat = req.body.passwordRepeat;
  var type = null;
  if (req.body.type == "1"){
     type = "Teacher";
  }else if(req.body.type == "2"){
     type = "Student"
  }else if(req.body.type == "3"){
    type = "Principal"
  }else if(req.body.type == "4"){
    type = "Admin"
  }
  req.checkBody('username','name is required').notEmpty();
  req.checkBody('email','email is required').notEmpty();
  req.checkBody('type','Type of the user is required').notEmpty();
  req.checkBody('email','email is incorrect').isEmail();
  req.checkBody('password','password is required').notEmpty();
  req.checkBody('passwordRepeat','passwordRepeat is required').notEmpty();
  req.checkBody('passwordRepeat','passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors){
    res.render('add_user',{
      errors:errors
    });
  }else{
      let user = new User({
        username:username,
        email:email,
        password:password,
        type:type
      });
      User.createUser(user, function(err, user){
			  if(err) throw err;
			  console.log(user);
	    });

      res.redirect('/users/login');
  }

});

router.get('/edit',ensureAuthenticated,function(req,res){
  User.findById(req.user._id,function(err,user){
    console.log(user.address);
    res.render('edit_user',{
      user:user

    });
  });
});

router.post('/edit',function(req,res){
  let user = {};
  var m = new Date();
  user.username = req.body.username;
  user.email = req.body.email;
  req.checkBody('username','name is required').notEmpty();
  req.checkBody('email','email is required').notEmpty();
  req.checkBody('email','email is incorrect').isEmail();
  user.address = req.body.address;
  user.date_of_birth = req.body.date_of_birth;
  var d = new Date(user.date_of_birth);
  user.guardians_name = req.body.guardians_name;
  user.telephone_no = req.body.telephone_no;
  if(d.getTime() >= m.getTime()){
    req.flash('failure','Date of birth is incorrect');
    res.redirect('/users/edit');
    return;
  }
  let query = {_id:req.user._id};
  User.update(query,user,function(err){
    if(err){
      req.flash('failure','There are errors');
      res.redirect('/users/edit');
      return;
    }else{
      res.redirect('/')
    }
  });
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

router.get('/changepassword', function(req, res){
  res.render('change_password');
});
// logout
router.get('/logout',function(req,res){
  req.logout();
  res.render('login');
});


function ensureAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }else{
    req.flash('danger','Please Login');
    res.redirect('/users/login');
  }
}

function ensureAuthenticatedAdmin(req,res,next){
  if(req.isAuthenticated() && req.user.type === "Admin"){
    return next();
  }else{
    req.flash('danger','Please Login');
    res.redirect('/users/login');
  }
}
module.exports = router;
