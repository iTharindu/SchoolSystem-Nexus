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

router.get('/edit',function(req,res){
  User.findById(req.user._id,function(err,user){
    console.log(user.address);
    res.render('edit_user',{
      user:user
<<<<<<< HEAD
=======
    //  console.log(user.address);
>>>>>>> bfbfd85332b394581a092e7135d298f22b2aa467
    });
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
