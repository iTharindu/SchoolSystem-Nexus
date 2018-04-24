const express = require('express');
const router = express.Router();

let Assignment = require('../models/assignment');
let Submission = require('../models/assignment_submission');

router.get('/add',function(req,res){
  res.render('add_assignment');
});

router.post('/add',function(req,res){
  var assignment = new Assignment();
  assignment.title = req.body.title;
  assignment.due_date = req.body.due_date;
  assignment.marks_allocated = req.body.marks_allocated;
  assignment.assignment_type = req.body.assignment_type;
  assignment.has_to_upload_a_file = req.body.has_to_upload_a_file;
  assignment.body = req.body.body;
  console.log(req.body.title);
  console.log('Hello');

  assignment.save(function(err){
    if(err){
      console.log(err);
      return;
    }else{
      req.flash('success','Assignment added');
      res.redirect('/');
    }
  });
});

router.get('/edit/:id',function(req,res){
  Assignment.findById(req.params.id,function(err,assignment){
    res.render('edit_assignment', {
      tittle: 'Edit Assignment',
      assignment:assignment
    });
  });
});

router.get('/student',function(req,res){
  Assignment.find(function(err,assignments){
    if(err){
      console.log(err);
      return;
    } else{
      res.render('assignment_student',{
        title:'Assignment',
        assignments : assignments
      });
    }
  });
});

router.get('/teacher',function(req,res){
  Assignment.find(function(err,assignments){
    if(err){
      console.log(err);
      return;
    } else{
      res.render('assignment_teacher',{
        title:'Assignment',
        assignments : assignments
      });
    }
  });
});


router.post('/edit/:id',function(req,res){
  let assignment = {};
  assignment.title = req.body.title;
  assignment.due_date = req.body.due_date;
  assignment.marks_allocated = req.body.marks_allocated;
  assignment.assignment_type = req.body.assignment_type;
  assignment.has_to_upload_a_file = req.body.has_to_upload_a_file;
  assignment.body = req.body.body;
  let query = {_id:req.params.id};

  Assignment.update(query,assignment,function(err){
    if(err){
      console.log(err);
      return;
    }else{
      res.redirect('/assignments/teacher');
    }
  });
});
router.post('/submission/:id',function(req,res){
  let submission = {};
  submission.submission = req.body.submission;
  let query = {_id:req.params.id};
  Submission.update(query,submission,function(err){
    if(err){
      console.log(err);
      return
    }else{
      res.redirect('/assignments/student')
    }
  });
});

router.delete('/:id',function(req,res){
  let query = {_id:req.params.id};
  Assignment.remove(query,function(err){
    if(err){
      console.log(err);
    }
    res.send("Success");
  });
});

router.get('/:id',function(req,res){
  Assignment.findById(req.params.id,function(err,assignment){
    res.render('assignment', {
      assignment:assignment
    });
  });
});

router.get('/details/:id',function(req,res){
  Assignment.findById(req.params.id,function(err,assignment){
    res.render('assignment_details', {
      assignment:assignment
    });
  });
});

router.get('/info/:id',function(req,res){
  Assignment.findById(req.params.id,function(err,assignment){
    res.render('assignment_info', {
      assignment:assignment,
      id:this.id
    });
  });
});

router.get('/submission/:id',function(req,res){
  Assignment.findById(req.params.id,function(err,assignment){
    res.render('assignment_submission', {
      assignment:assignment
    });
  });
});


module.exports = router;
