const express = require('express');
const router = express.Router();

let Assignment = require('../models/assignment');
let Submission = require('../models/assignment_submission');

router.get('/add',function(req,res){
  res.render('teacher/add_assignment');
});

router.post('/add',function(req,res){
  var assignment = new Assignment();
  var m = new Date();
  assignment.title = req.body.title;
  assignment.uploaded_date = m;
  assignment.uploaded_date_toString = m.toString();
  assignment.due_date = req.body.due_date;
  assignment.marks_allocated = req.body.marks_allocated;
  assignment.assignment_type = req.body.assignment_type;
  if (req.body.has_to_upload_a_file == "1"){
    assignment.has_to_upload_a_file = "Has to upload a file";
  }else{
    assignment.has_to_upload_a_file = "Does not require to upload anything"
  }
  assignment.body_assignment = req.body.body_assignment;
  console.log(req.body.title);
  console.log('Hello');

  assignment.save(function(errors){
    if(isNaN(assignment.marks_allocated)){
      req.flash('failure','The marks allocated is not a number');
      res.render('teacher/add_assignment');
      return
    }else if(m.getTime() >= assignment.due_date.getTime()){
      req.flash('failure','due date is invalid');
      res.render('teacher/add_assignment');
      return
    }else{
      req.flash('success','Assignment added');
      res.redirect('/');
    }
  });
});

router.get('/edit/:id',function(req,res){
  Assignment.findById(req.params.id,function(err,assignment){
    res.render('teacher/edit_assignment', {
      tittle: 'Edit Assignment',
      assignment:assignment
    });
  });
});

router.get('/submission/:id',function(req,res){
  Assignment.findById(req.params.id,function(err,assignment){
    res.render('student/assignment_submission', {
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
      res.render('student/assignment_student',{
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
      res.render('teacher/assignment_teacher',{
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
  if (req.body.has_to_upload_a_file == "1"){
    assignment.has_to_upload_a_file = "Has to upload a file";
  }else{
    assignment.has_to_upload_a_file = "Does not require to upload anything"
  }
  assignment.body_assignment = req.body.body_assignment;
  let query = {_id:req.params.id};
  console.log(assignment.has_to_upload_a_file)
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
  var submission = new Submission();
  submission.assignment_id = req.params.id;
  submission.assignment_submission = req.body.assignment_submission;
  //submission.student_id = req.user._id;
  submission.save(function(err){
    if(err){
      req.flash('failure','Submission failed')
      //res.render('/assignments/submission/:id')
      console.log(err);
      return;
    }else{
      req.flash('success','Submission save');
      res.redirect('/assignments/student');
    }
  });
});

router.delete('/:id',function(req,res){
  let query = {_id:req.params.id};
  Assignment.remove(query,function(err){
    if(err){
      req.flash('failure','delete failed')
      res.render('/assignments/:id')
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
    res.render('teacher/assignment_details', {
      assignment:assignment
    });
  });
});

router.post('/details/:id',function(req,res){
  var submission = new Submission();
  submission.assignment_id = req.params.id;
  submission.assignment_submission = req.body.assignment_submission;
  submission.save(function(err){
    if(err){
      console.log(err);
      return;
    }else{
      req.flash('success','Submission save');
      res.redirect('/assignments/student');
    }
  });
});

router.get('/info/:id',function(req,res){
  Assignment.findById(req.params.id,function(err,assignment){
    res.render('teacher/assignment_info', {
      assignment:assignment,
      id:this.id
    });
  });
});



/*router.get('/submissions/:id',function(req,res){
  Submission.find(function(err,submissions){
    if(err){
      console.log(err);
      req.flash('failure','Loading failed');
      return;
    }else{
      if(assignment_submission.assignment_id === req.params.id){
        res.render('teacher/assignment_submissions',{
          submissions : submissions
      });
    }
    }
  });
});*/
router.get('/submissions/:id',function(req,res){
  Submission.find(({"assignment_id": req.params.id}),function(err,submissions){
    res.render('teacher/assignment_submissions',{
      submissions : submissions
    });
  });
});

router.get('/submission_mark/:id',function(req,res){
  Submission.findById(req.params.id,function(err,submission){
    Assignment.findById(submission.assignment_id,function(err,assignment){
      res.render('teacher/submission_mark', {
        assignment:assignment,
        submission:submission,
        id:this.id
      });
    });
  });
});



module.exports = router;
