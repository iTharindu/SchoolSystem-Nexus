var express=require('express');
const router=express.Router();
var fileupload=require('express-fileupload');
var path=require('path');
var fs=require('fs');

var circularData=require('../models/data-circular');

var message={
  status:'',
  msg:''
}

router.get('/circulars',ensureAuthenticatedTeacher,function(req,res){
  circularData.find({},function(err,data){
    if(err){
      console.log(err);
    }else{
      res.render('teacher/circulars',{data:data});
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


//////////////////////////////////////////////////////////////
//principal/////////////////////////////////////////////////////////

router.get('/upload',ensureAuthenticatedPrincipal,function(req,res){
  res.render('principal/circularsUpload',{message:message});
});

router.post('/upload',fileupload(),function(req,res){
  if(!req.files.pho){
    return res.status(400).send('No files were uploaded.');
  }else{
    let sampleFile = req.files.pho;
    circularData.findOne({fileName:sampleFile.name},function(err,file){
      if(err){
        console.log(err);
      }else{
        if(file==null){
          var dir='./public/uploads/circulars/'+sampleFile.name;
          var newCircular=new circularData();
          newCircular.fileName=sampleFile.name;
          newCircular.grade=req.body.grade;
          newCircular.save(function(err){
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

router.get('/',ensureAuthenticatedPrincipal,function(req,res){
  circularData.find({},function(err,data){
    res.render('principal/circulars',{data:data,message:message});
  });
});

router.delete('/delete/:id',function(req,res){
  circularData.findOneAndRemove({_id:req.params.id},function(err,data){
    if(err){
      console.log(err);
    }else{
      var fpath=path.join(__dirname,'../public/uploads/circulars/'+data.fileName);
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

function ensureAuthenticatedTeacher(req,res,next){
  if(req.isAuthenticated() && (req.user.type=='Teacher')){
    return next();
  }else{
    req.logout();
    req.flash('success','You are now logged out');
    res.redirect('/users/login');
  }
}

function ensureAuthenticatedPrincipal(req,res,next){
  if(req.isAuthenticated() && (req.user.type=='Principal')){
    return next();
  }else{
    req.logout();
    req.flash('success','You are now logged out');
    res.redirect('/users/login');
  }
}

module.exports=router;
