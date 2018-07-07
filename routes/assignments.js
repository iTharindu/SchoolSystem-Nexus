const express = require('express');
const router = express.Router();

let Assignment = require('../models/assignment');
let Submission = require('../models/assignment_submission');
let User = require('../models/user')

router.get('/add',ensureAuthenticatedTeacher,function(req,res){
  res.render('teacher/add_assignment');
});

router.post('/add',function(req,res){
  var assignment = new Assignment();
  var m = new Date();
  assignment.title = req.body.title;
  assignment.uploaded_date = m;
  assignment.uploaded_date_toString = m.toString();
  assignment.due_date = req.body.due_date;
  console.log(assignment.due_date);
  assignment.marks_allocated = req.body.marks_allocated;
  assignment.assignment_type = req.body.assignment_type;
  if (req.body.has_to_upload_a_file == "1"){
    assignment.has_to_upload_a_file = "Has to upload a file";
  }else{
    assignment.has_to_upload_a_file = "Does not require to upload anything"
  }
  assignment.body_assignment = req.body.body_assignment;
  if(isNaN(assignment.marks_allocated)){
    req.flash('failure','The marks allocated is not a number');
    res.render('teacher/add_assignment');
    return;
  }else if(m.getTime() >= assignment.due_date.getTime()){
    req.flash('failure','due date is invalid');
    res.render('teacher/add_assignment');
    return;
  }else if(assignment.marks_allocated < 0){
    req.flash('failure','The marks allocated is less than 0');
    res.render('teacher/add_assignment');
    return;
  }
  assignment.save(function(errors){
    if(errors){
      req.flash('failure','There are errors.....');
      res.render('teacher/add_assignment');
      return;
    }else{
      req.flash('success','Assignment added');
      res.redirect('/assignments/teacher');
    }
  });
});

router.get('/edit/:id',ensureAuthenticatedTeacher,function(req,res){
  Assignment.findById(req.params.id,function(err,assignment){
    res.render('teacher/edit_assignment', {
      tittle: 'Edit Assignment',
      assignment:assignment
    });
  });
});

router.get('/submission/:id',ensureAuthenticatedStudent,function(req,res){
  var submission_status = null;
  Assignment.findById(req.params.id,function(err,assignment){
    Submission.findOne(({"student_id": req.user._id},{"assignment_id":req.params.id}),function(err,submission){
      res.render('student/assignment_submission', {
        assignment:assignment,
        submission:submission
        /*if(submission == null){
          submission_satus = "No Submissions";
        }else {
          submission_status = "Submitted for grading";
        }*/
      });
    });
  });
});

router.get('/submissionedit/:id',ensureAuthenticatedStudent,function(req,res){
  var submission_status = null;
  Assignment.findById(req.params.id,function(err,assignment){
    Submission.findOne(({"student_id": req.user._id},{"assignment_id":req.params.id}),function(err,submission){
      res.render('student/assignment_submission', {
        assignment:assignment,
        submission:submission
      });
    });
  });
});


router.post('/submissionedit/:id',function(req,res){
  let submissionEdit = {};
  submissionEdit.assignment_submission = req.body.assignment_submission;
  let query = {};
  Assignment.findById(req.params.id,function(err,assignment){
    Submission.findOne(({"student_id": req.user._id},{"assignment_id":req.params.id}),function(err,submission){
      query = {_id:submission._id};
      console.log(submission._id);
      Submission.update(query,submissionEdit,function(err){
        if(err){
          console.log(err);
          req.flash('failure','Failed to upload the marks')
          res.redirect('assignments/submissionedit/:id')
          return;
        }else{
          res.redirect('/assignments/student/');
          console.log(query)
        }
      });
    });
  });
});

router.get('/student',ensureAuthenticatedStudent,function(req,res){
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

router.get('/teacher',ensureAuthenticatedTeacher,function(req,res){
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
  var m = new Date();
  assignment.title = req.body.title;
  var date = new Date(req.body.due_date);
  console.log(date);
  assignment.due_date = date;
  assignment.uploaded_date_toString = m.toString();
  assignment.marks_allocated = req.body.marks_allocated;
  assignment.assignment_type = req.body.assignment_type;
  if (req.body.has_to_upload_a_file == "1"){
    assignment.has_to_upload_a_file = "Has to upload a file";
  }else{
    assignment.has_to_upload_a_file = "Does not require to upload anything"
  }
  assignment.body_assignment = req.body.body_assignment;
  if(isNaN(assignment.marks_allocated)){
    req.flash('failure','The marks allocated is not a number');
    res.redirect('/assignments/edit/:id');
    return;
  }else if(assignment.marks_allocated < 0){
    req.flash('failure','The marks allocated is less than 0');
    res.redirect('/assignments/edit/:id');
    return;
  }else if(m.getTime() >= date.getTime()){
    req.flash('failure','due date is invalid');
    res.redirect('/assignments/edit/:id');
    return;
  }
  let query = {_id:req.params.id};
  console.log(assignment.has_to_upload_a_file)
  Assignment.update(query,assignment,function(err){
    if(err){
      req.flash('failure','Errors occured');
      res.redirect('/assignments/edit/:id');
      return;
    }else{
      req.flash('success','Assignment added');
      res.redirect('/assignments/teacher');
    }
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
});

router.post('/submission_mark/:id',function(req,res){
  let submission = {}
  submission.comments_on_submission = req.body.comments_on_submission;
  submission.marks_given = req.body.marks_given;
  var assignment_id;
  let query = {_id:req.params.id};
  Submission.findById(req.params.id,function(err,submission){
    assignment_id = submission.assignment_id;
    Assignment.findById(submission.assignment_id,function(err,assignment){
      if(isNaN(submission.marks_given)){
        req.flash('failure','Marks should be a number');
        return;
      }else if(submission.marks_given > assignment.marks_allocated){
        req.flash('failure','Marks given is higher than allocated');
        return;
      }else if(submission.marks_given < 0){
        req.flash('failure','Marks given is less than 0');
        return;
      }
    });
  });

  Submission.update(query,submission,function(err){
    if(err){
      console.log(err);
      req.flash('failure','Failed to upload the marks')
      return;
    }else{
      res.redirect('/assignments/submissions/'+assignment_id);
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
    }else{
      res.send("Success");
    }
  });
});

router.get('/:id',ensureAuthenticatedTeacher,function(req,res){
  Assignment.findById(req.params.id,function(err,assignment){
    res.render('assignment', {
      assignment:assignment
    });
  });
});

router.get('/details/:id',ensureAuthenticatedTeacher,function(req,res){
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

router.get('/info/:id',ensureAuthenticatedTeacher,function(req,res){
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
router.get('/submissions/:id',ensureAuthenticatedTeacher,function(req,res){
  Submission.find(({"assignment_id": req.params.id}),function(err,submissions){
    res.render('teacher/assignment_submissions',{
      submissions : submissions
    });
  });
});

router.get('/submission_mark/:id',ensureAuthenticatedTeacher,function(req,res){
  Submission.findById(req.params.id,function(err,submission){
    Assignment.findById(submission.assignment_id,function(err,assignment){
      res.render('teacher/submission_mark', {
        assignment:assignment,
        submission:submission
      });
    });
  });
});

function ensureAuthenticatedTeacher(req,res,next){
  if(req.isAuthenticated() && req.user.type === "Teacher"){
    return next();
  }else{
    req.flash('danger','Please Login');
    res.redirect('/users/login');
  }
}

function ensureAuthenticatedStudent(req,res,next){
  if(req.isAuthenticated() && req.user.type === "Student"){
    return next();
  }else{
    req.flash('danger','Please Login');
    res.redirect('/users/login');
  }
}

module.exports = router;
