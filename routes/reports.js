const express = require('express');
const record = express.Router();


// Bring in models
let Mark=require('../models/marks');


record.get('/',function(req,res){
  Mark.find({}, function(err,marks){
    if(err){
      console.log(err);
    }else{
      res.render('mark/report',{
        title:"Marks",
        marks:marks
      });
    }
  });

});

module.exports=record;
