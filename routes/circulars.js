var express=require('express');
const router=express.Router();
var fileupload=require('express-fileupload');
var path=require('path');
var fs=require('fs');

var circularData=require('../models/data-circular');

var user={
  _id: '5ac6fbb3c348ca4134fef9e7',
 name: 'Dilan',
 designation: 'Teacher',
 email: 'dilan@123.com',
 username: 'dilan',
 password: '123',
 __v: 0,
 grade: 5,
 leavesTaken:0
};
var message={
  status:'',
  msg:''
}

router.get('/circulars',function(req,res){
  circularData.find({grade:user.grade},function(err,data){
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

router.get('/upload',function(req,res){
  res.render('principal/circularsUpload');
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
                  req.flash('success','File Uploaded Successfully');
                  res.send('success');
                }
              });
            }
          });
        }else{
          req.flash('success','File already exists');
          console.log('File already exists');
          res.status(500).send(err);
        }
      }
    });
  }
});

router.get('/',function(req,res){
  circularData.find({},function(err,data){
    res.render('principal/circulars',{data:data});
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
          req.flash('success','Deleted Successfully');
          res.send('success');
        }
      });
    }
  });
});

module.exports=router;
