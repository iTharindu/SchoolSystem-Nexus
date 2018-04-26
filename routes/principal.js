var express=require('express');
var router=express.Router();
var bodyparser=require('body-parser');
var fs=require('fs');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());
var path=require('path');

var leaveDB=require('../models/teacher-leaves');
var circularData=require('../models/data-circular');
var schemeDB=require('../models/data-schemes');

var user={
  _id: '5ac6fbb3c348ca4134fef9e7',
 name: 'Sachintha',
 designation: 'Principal',
 email: 'dilan@123.com',
 username: 'dilan',
 password: '123',
 __v: 0,
 grade: 5
};

router.get('/',function(req,res){
  res.render('principal/principal');
});

//circulars/////////////////////////////////////////////////////////////////////
router.get('/circulars',function(req,res){
  res.render('principal/circularsMenu');
});

router.get('/circulars/upload',function(req,res){
  res.render('principal/circularsUpload');
});

router.post('/circulars/upload',function(req,res){
  if(!req.files.sampleFile){
    return res.status(400).send('No files were uploaded.');
  }else{
    let sampleFile = req.files.sampleFile;
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
                  res.redirect('/principal/circulars');
                }
              });
            }
          });
        }else{
          console.log('File already exists');
          res.redirect(req.get('referer'));
        }
      }
    });
  }
});

router.get('/circulars/view-previous',function(req,res){
  circularData.find({},function(err,data){
    res.render('principal/circularsPrevious',{data:data});
  });
});

router.delete('/circulars/delete/:id',function(req,res){
  circularData.findOneAndRemove({_id:req.params.id},function(err,data){
    if(err){
      console.log(err);
    }else{
      var fpath=path.join(__dirname,'../public/uploads/circulars/'+data.fileName);
      fs.unlink(fpath,function(errr){
        if(errr){
          console.log(err);
        }else{
          res.send('success');
        }
      });
    }
  });
});

//leaveApp///////////////////////////////////////////////////////////////////
router.get('/leaveApps',function(req,res){
  leaveDB.find({},function(err,data){
    res.render('principal/leaveList',{data});
  });
});

router.get('/leaveDetails/:id',function(req,res){
  leaveDB.findById(req.params.id,function(err,details){
    if(err){
      console.log(err);
    }else{
      res.render('principal/leaveDetails',{details});
    }
  });
});

router.post('/leave/approval/:id',function(req,res){
  var approved;
  if(req.body.approval=='Approve'){
    approved="Approved";
  }else{
    approved="Disapproved";
  }
  leaveDB.update({_id:req.params.id},{approved:approved},function(err){
    if(err){
      console.log(err);
    }else{
      //res.redirect('/principal/');
      res.json({approval:approved});
    }
  });
});

///schemes//////////////////////////////////////////////////////////////////////////////////////////////
router.get('/schemes',function(req,res){
  schemeDB.find({},function(err,data){
    if(err){
      console.log(err);
    }else{
      res.render('principal/schemes',{data:data});
    }
  });
});

router.delete('/schemes/delete/:id',function(req,res){
  schemeDB.findOneAndRemove({_id:req.params.id},function(err,data){
    if(err){
      console.log(err);
    }else{
      var fpath=path.join(__dirname,'../public/uploads/schemes/'+data.fileName);
      fs.unlink(fpath,function(errr){
        if(errr){
          console.log(err);
        }else{
          res.send('success');
        }
      });
    }
  });
});

router.get('/logout',function(req,res){
  req.logout();
  res.redirect('/');
});

/*
router.get('/getSchemes',ensureAuthenticated,function(req,res){
  res.sendFile(path.join(__dirname,'../views/principal/x.ejs'));
});
*/

function ensureAuthenticated(req,res,next){
  if(req.isAuthenticated() && (req.user.designation=='Principal')){
    return next();
  }else{
    req.logout();
    res.redirect('/');
  }
}

module.exports=router;
