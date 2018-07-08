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

//Get single mark
/*record.get('/:id',function(req,res){
  Mark.findById(req.user._id, function(err, mark){
    res.render('mark/singleresult',{
      mark:mark
    });
  });
});


router.post('/submission/:id',function(req,res){
  var submission = new Submission();
  submission.assignment_id = req.params.id;
  submission.assignment_submission = req.body.assignment_submission;
  submission.student_id = req.user._id;
  User.findById(submission.student_id,function(err,user){
    submission.student_name = user.username;
    submission.save(function(err){
      if(err){
        req.flash('failure','Submission failed')
        res.redirect('/assignments/student')
        console.log(err);
        return;
      }else{
        req.flash('success','Submission save');
        res.redirect('/assignments/student');
      }
    });
  });
});*/



module.exports=record;
