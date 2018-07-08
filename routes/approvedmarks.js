const express = require('express');
const record = express.Router();


// Bring in models
let Mark=require('../models/marks');
let ApporvedMarks=require('../models/approvedmarks');
let User=require('../models/user');




//Get single mark
/*record.get('/',function(req,res){
  User.findById(req.params._id,function(err,user){
    Mark.find({"StudentID": req.user.username}, function(err,mark){
      res.render('mark/singleresult',{
        mark:mark
      });
    });
  });
});*/








module.exports=record;
