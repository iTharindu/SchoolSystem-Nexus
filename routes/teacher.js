var express=require('express');
const router=express.Router();
var fileupload=require('express-fileupload');
var path=require('path');
var fs=require('fs');

var leaveData=require('../models/teacher-leaves');
var schemeData=require('../models/data-schemes');
var circularData=require('../models/data-circular');

var user={
  _id: '5ac6fbb3c348ca4134fef9e7',
 name: 'Dilan',
 designation: 'Teacher',
 email: 'dilan@123.com',
 username: 'dilan',
 password: '123',
 __v: 0,
 grade: 5
};

router.get('/',function(req,res){
  res.render('teacher/teacher');
});

//circulars...................................................................

router.get('/circulars',function(req,res){
  circularData.find({grade:user.grade},function(err,data){
    if(err){
      console.log(err);
    }else{
      res.render('teacher/circulars',{data:data});
    }
  });
});


//leave app...................................................................

router.get('/leaveMenu',function(req,res){
  leaveData.find({teacherName:user.name},function(err,data){
    if(err){
      console.log(err);
    }else{
      res.render('teacher/leaveMenu',{data:data});
    }
  });
});

router.delete('/leaveApp/delete/:id',function(req,res){
  leaveData.findOneAndRemove({_id:req.params.id},function(err,data){
    if(err){
      console.log(err);
    }else{
      res.send('success');
    }
  });
});

router.get('/applyLeave',function(req,res){
  res.render('teacher/leave-application');
});

router.post('/processLeaveApp',function(req,res){
  var leavedata=new leaveData();
  leavedata.teacherName=user.name;
  leavedata.designation=user.designation;
  leavedata.noOfLeaveDays=req.body.noOfLeaveDays;
  leavedata.leavesTaken=req.body.leavesTaken;
  leavedata.dateOfCommencingLeave=req.body.dateOfCommencingLeave;
  leavedata.dateOfResumingLeave=req.body.dateOfResumingDuty;
  leavedata.reason=req.body.reason;
  leavedata.approved="Not Yet Decided";
  leavedata.save(function(err){
    if(err){
      console.log(err);
    }else{
      res.redirect('/teacher/leaveMenu');
    }
  });
});

//schemes...................................................................

router.get('/schemes',function(req,res){
  res.render('teacher/schemes-teacher');
});

router.get('/schemes/upload',function(req,res){
  res.render('teacher/schemes-upload');
});

//var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
router.post('/schemes/upload',fileupload(),function(req,res){
  if(!req.files.pho.name){
    return res.status(400).send('No files were uploaded.');
  }else{
    var sampleFile = req.files.pho;
    schemeData.findOne({fileName:sampleFile.name},function(err,file){
      if(err){
        console.log(err);
      }else{
        if(file==null){
          var dir='./public/uploads/schemes/'+sampleFile.name;
          var schemedata=new schemeData();
          schemedata.fileName=sampleFile.name;
          schemedata.year=req.body.year,
          schemedata.grade=req.body.grade;
          schemedata.author=user.name;
          schemedata.save(function(err){
            if(err){
              console.log(err);
            }else{
              sampleFile.mv(dir, function(err) {
                if(err){
                  return res.status(500).send(err);
                }else{
                  res.send('success');
                }
              });
            }
          });
        }else{
          /////////////////////////////////////////////////////////////////////////////////////make code to send a message to front end
          console.log('File already exists');
          res.status(500).send(err);
        }
      }
    });
  }
});

router.get('/schemes/view-previous',function(req,res){
  schemeData.find({author:user.name},function(err,data){
    if(err){
      console.log(err);
    }else{
      res.render('teacher/schemes-list',{data});
    }
  });
});

router.get('/scheme/:index',function(req,res){
  schemeData.find({author:user.name},function(err,data){
    res.locals.scheme=data[req.params.index];
    res.render('teacher/edit-scheme',{data:res.locals.scheme});
  });
});


router.post('/schemes/edit-data/:fname',fileupload(),function(req,res){
  var sampleFile = req.files.pho;
  console.log(sampleFile.name);
  var dir='./public/uploads/schemes/'+sampleFile.name;
  schemeData.findOne({fileName:sampleFile.name},function(err,file){
    if(file==null){
      schemeData.update({fileName:req.params.fname},{
        fileName:sampleFile.name,
        year:req.body.year,
        grade:req.body.grade
      },function(err){
        if(err){
          console.log(err);
        }
        var fpath=path.join(__dirname,'../public/uploads/schemes/'+req.params.fname);
        fs.unlink(fpath,function(err){
          if(err){
            console.log(err);
          }
          sampleFile.mv(dir, function(err) {
            if(err){
              return res.status(500).send(err);
            }else{
              res.redirect('/teacher/schemes');
            }
          });
        });
      });
    }else if(file.fileName==req.params.fname){
      schemeData.update({fileName:req.params.fname},{
        fileName:sampleFile.name,
        year:req.body.year,
        grade:req.body.grade
      },function(err){
        if(err){
          console.log(err);
        }
        sampleFile.mv(dir, function(err) {
          if(err){
            return res.status(500).send(err);
          }else{
            res.send('success');
          }
        });
      });
    }else{
      console.log('Another file with this name already exists.');
      res.send('failure');
    }
  });
});

router.delete('/schemes/delete/:id',function(req,res){
  schemeData.findOneAndRemove({_id:req.params.id},function(err,data){
    var fpath=path.join(__dirname,'../public/uploads/schemes/'+data.fileName);
    fs.unlink(fpath,function(errr){
      if(errr){
        console.log(err);
      }else{
        res.send('success');
      }
    });
  });
});

function ensureAuthenticated(req,res,next){
  if(req.isAuthenticated() && (req.user.designation=='Teacher')){
    return next();
  }else{
    req.logout();
    res.redirect('/user/login');
  }
}
module.exports=router;
