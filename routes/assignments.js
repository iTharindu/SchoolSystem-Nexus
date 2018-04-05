const express = require('express');
const router = express.Router();

let Assignment = require('../models/assignment');


router.get('/add',function(req,res){
  res.render('add_assignment');
});

router.post('/add',function(req,res){
  var assignment = new Assignment();
  assignment.title = req.body.title;
  assignment.author = req.body.author;
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
  assignment.author = req.body.author;
  assignment.body = req.body.body;

  let query = {_id:req.params.id};

  Assignment.update(query,assignment,function(err){
    if(err){
      console.log(err);
      return;
    }else{
      res.redirect('/');
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



module.exports = router;
