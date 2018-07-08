const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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

router.get('/changepassword',ensureAuthenticated, function(req, res){
  res.render('change_password');
});

router.post('/changepassword',function(req,res){
  var password = req.body.current_password;
  const new_password = req.body.new_password;
  const repeat_password = req.body.repeat_password;
  User.findById(req.user._id,function(err,user){
    if(err){
      req.flash('failure','There are errors')
      res.redirect('/users/changepassword');
      return;
    }

    bcrypt.compare(password, user.password, function(err, isMatch){
      console.log("Hello");
      if(err) throw err;
      if(isMatch){
        req.checkBody('new_password','password is required').notEmpty();
        req.checkBody('repeat_password','passwordRepeat is required').notEmpty();
        req.checkBody('repeat_password','passwords do not match').equals(req.body.new_password);
        let errors = req.validationErrors();
        let query = {_id:req.user._id};
        if(errors){
          res.render('change_password',{
            errors:errors
          });
        }else{
          let new_user = {};
          new_user.password = req.body.new_password;
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(new_user.password, salt, function(err, hash) {
              new_user.password = hash;
              User.update(query,new_user,function(err){
                    if(err){
                      req.flash('failure','There are errors');
                      res.redirect('/users/changepassword');
                      return;
                    }else{
                      res.redirect('/');
                    }
              });
            });
          });
        }
      }
      else{
        return done(null, false, {message: 'Incorrect Password'});
      }
    });
  });
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

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
});
});

module.exports = router;
