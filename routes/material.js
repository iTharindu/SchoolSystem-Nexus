var express=require('express');
const router=express.Router();
var fileupload=require('express-fileupload');
var path=require('path');
var fs=require('fs');

var studyMaterial=require('../models/study_material');

var message={
  status:'',
  msg:''
}

//student section
router.get('/material',ensureAuthenticatedStudent,function(req,res){
  studyMaterial.find({},function(err,data){
    if(err){
      console.log(err);
    }else{
      res.render('student/material',{data:data});
    }
  });
});

router.get('/msgs/reset',function(req,res){
  message.status='';
  message.msg='';
});

router.get('/getmsg',function(req,res){
  res.status('200').send({message});
});


//teacher section

router.get('/upload',ensureAuthenticatedTeacher,function(req,res){
  res.render('teacher/materialUpload',{message:message});
});

router.post('/upload',fileupload(),function(req,res){
  if(!req.files.pho){
    return res.status(400).send('No files were uploaded.');
  }else{
    let sampleFile = req.files.pho;
    studyMaterial.findOne({fileName:sampleFile.name},function(err,file){
      if(err){
        console.log(err);
      }else{
        if(file==null){
          var dir='./public/uploads/material/'+sampleFile.name;
          var newMaterial=new studyMaterial();
          newMaterial.fileName=sampleFile.name;
          newMaterial.grade=req.body.grade;
          newMaterial.save(function(err){
            if(err){
              console.log(err);
            }else{
              sampleFile.mv(dir, function(err) {
                if(err){
                  return res.status(500).send(err);
                }else{
                  message.status='success';
                  message.msg='File uploaded successfully';
                  res.send('success');
                }
              });
            }
          });
        }else{
          message.status='danger';
          message.msg='File already exists';
          console.log('File already exists');
          res.status(500).send(err);
        }
      }
    });
  }
});

router.get('/',function(req,res){
  studyMaterial.find({},function(err,data){
    res.render('teacher/material',{data:data,message:message});
  });
});

router.delete('/delete/:id',ensureAuthenticatedTeacher,function(req,res){
  studyMaterial.findOneAndRemove({_id:req.params.id},function(err,data){
    if(err){
      console.log(err);
    }else{
      var fpath=path.join(__dirname,'../public/uploads/material/'+data.fileName);
      fs.unlink(fpath,function(errr){
        if(errr){
          console.log(errr);
        }else{
          message.status='success';
          message.msg='File deleted successfully';
          res.send('success');
        }
      });
    }
  });
});

function ensureAuthenticatedStudent(req,res,next){
  if(req.isAuthenticated() && (req.user.type=='Student')){
    return next();
  }else{
    req.logout();
    req.flash('success','You are now logged out');
    res.redirect('/users/login');
  }
}

function ensureAuthenticatedTeacher(req,res,next){
  if(req.isAuthenticated() && (req.user.type=='Teacher')){
    return next();
  }else{
    req.logout();
    req.flash('success','You are now logged out');
    res.redirect('/users/login');
  }
}

module.exports=router;
