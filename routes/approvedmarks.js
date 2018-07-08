const express = require('express');
const record = express.Router();


// Bring in models
let Mark=require('../models/marks');
let ApporvedMarks=require('../models/approvedmarks');
let User=require('../models/user');

let user = new User();


//Get single mark
record.get('/',function(req,res){
  User.findById(req.user._id,function(err,user){
    Mark.find({"StudentID": user.username}, function(err,mark){
      res.render('mark/singleresult',{
        mark:mark
      });
    });
  });
});








module.exports=record;
