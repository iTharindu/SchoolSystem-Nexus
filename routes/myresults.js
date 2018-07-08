const express = require('express');
const record = express.Router();


// Bring in models
let Mark=require('../models/marks');


//get marks

record.get('/',function(req,res){
  Mark.find({}, function(err,marks){
    if(err){
      console.log(err);
    }else{
      res.render('mark/myresult',{
        title:"Marks",
        marks:marks
      });
    }
  });

});

//Get single mark
record.get('/:id',function(req,res){
  Mark.findById(req.params.id, function(err, mark){
    res.render('mark/singleresult',{
      mark:mark
    });
  });
});




module.exports=record;
