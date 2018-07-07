const express = require('express');
const record = express.Router();


// Bring in models
let Mark=require('../models/marks');





// Add Route
record.get('/add',function(req,res){
  res.render('mark/add_marks',{
    title:'Add Marks'
  });
});



// submit post Route
record.post('/add',function(req,res){
  req.checkBody('StudentID','Student ID is required').notEmpty();
  req.checkBody('Subject1','Subject1 is required').notEmpty();
  req.checkBody('Marks1','Marks1 is required').notEmpty();
  req.checkBody('Marks1','Marks1 should be between 0-100!').isInt({min:0,max:100});
  req.checkBody('Subject2','Subject2 is required').notEmpty();
  req.checkBody('Marks2','Marks2 is required').notEmpty();
  req.checkBody('Marks2','Marks2 should be between 0-100!').isInt({min:0,max:100});
  req.checkBody('Subject3','Subject3 is required').notEmpty();
  req.checkBody('Marks3','Marks3 is required').notEmpty();
  req.checkBody('Marks3','Marks3 should be between 0-100!').isInt({min:0,max:100});

  //Get errors
  let errors = req.validationErrors();

  if(errors){
    res.render('mark/add_marks',{
      title:'Add Marks',
      errors:errors
    });
  }else{
    let mark =new Mark();
      mark.StudentID = req.body.StudentID;
      mark.Subject1 = req.body.Subject1;
      mark.Marks1 = req.body.Marks1;
      mark.Subject2 = req.body.Subject2;
      mark.Marks2 = req.body.Marks2;
      mark.Subject3 = req.body.Subject3;
      mark.Marks3 = req.body.Marks3;

      mark.save(function(err){
        if(err){
          console.log(err);
          return;
        }else{
          req.flash('success','Marks Added')
          res.redirect('/');
        }
      });
  }


});

//Load edit form
record.get('/edit/:id',function(req,res){
  Mark.findById(req.params.id, function(err, mark){
    res.render('mark/edit_marks',{
        title:'Edit Marks',
        mark:mark
    });
  });
});

//update post request
record.post('/edit:id',function(req,res){
  req.checkBody('StudentID','Student ID is required').notEmpty();
  req.checkBody('Subject1','Subject1 is required').notEmpty();
  req.checkBody('Marks1','Marks1 is required').notEmpty();
  req.checkBody('Marks1','Marks1 should be between 0-100!').isInt({min:0,max:100});
  req.checkBody('Subject2','Subject2 is required').notEmpty();
  req.checkBody('Marks2','Marks2 is required').notEmpty();
  req.checkBody('Marks2','Marks2 should be between 0-100!').isInt({min:0,max:100});
  req.checkBody('Subject3','Subject3 is required').notEmpty();
  req.checkBody('Marks3','Marks3 is required').notEmpty();
  req.checkBody('Marks3','Marks3 should be between 0-100!').isInt({min:0,max:100});


  let errors = req.validationErrors();

  if(errors){
    res.render('mark/add_marks',{
      title:'Add Marks',
      errors:errors
    });
  }else{
    let mark ={};
      mark.StudentID = req.body.StudentID;
      mark.Subject1 = req.body.Subject1;
      mark.Marks1 = req.body.Marks1;
      mark.Subject2 = req.body.Subject2;
      mark.Marks2 = req.body.Marks2;
      mark.Subject3 = req.body.Subject3;
      mark.Marks3 = req.body.Marks3;

      let query={_id:req.params.id}

      Mark.update(query, mark,function(err){
        if(err){
          console.log(err);
          return;
        }else{
          req.flash('success','Marks Updated')
          res.redirect('/');
        }
      });
  }

});

record.delete('/:id',function(req,res){
  let query ={_id:req.params.id}

  Mark.remove(query, function(err){
    if(err){
      console.log(err)
    }
    res.send('Success');
  });
});

//Get single mark
record.get('/:id',function(req,res){
  Mark.findById(req.params.id, function(err, mark){
    res.render('mark/mark',{
      mark:mark
    });
  });
});


module.exports=record;
