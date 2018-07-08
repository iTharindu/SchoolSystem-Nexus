var express=require('express');
const router=express.Router();
var path=require('path');
var fs=require('fs');

var leaveData=require('../models/teacher-leaves');

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

router.get('/msgs/reset',function(req,res){
  message.status='';
  message.msg='';
});

router.get('/getmsg',function(req,res){
  res.status('200').send({message});
});

//teacher//////////////////////////////////////////

router.get('/leaveMenu',ensureAuthenticatedTeacher,function(req,res){
  leaveData.find({teacherName:user.name},function(err,data){
    if(err){
      console.log(err);
    }else{
      res.render('teacher/leaveMenu',{data:data,message:message});
    }
  });
});

router.delete('/leaveApp/delete/:id',ensureAuthenticatedTeacher,function(req,res){
  leaveData.findOneAndRemove({_id:req.params.id},function(err,data){
    if(err){
      console.log(err);
      message.status='danger';
      message.msg='Delete Failed';
      res.send('success');
    }else{
      message.status='danger';
      message.msg='Deleted Successfully';
      //res.status('200').send({data:"cra[]"});
      res.send('success');
    }
  });
});

router.get('/applyLeave',ensureAuthenticatedTeacher,function(req,res){
  res.render('teacher/leave-application',{user:user});
});

router.post('/processLeaveApp',ensureAuthenticatedTeacher,function(req,res){
  var leavedata=new leaveData();
  leavedata.teacherName=user.name;
  leavedata.designation=user.designation;
  leavedata.noOfLeaveDays=req.body.noOfLeaveDays;
  leavedata.leavesTaken=user.leavesTaken;
  leavedata.dateOfCommencingLeave=req.body.dateOfCommencingLeave;
  leavedata.dateOfResumingLeave=req.body.dateOfResumingDuty;
  leavedata.reason=req.body.reason;
  leavedata.approved="Not Yet Decided";
  user.leavesTaken=user.leavesTaken+parseInt(req.body.noOfLeaveDays);
  leavedata.save(function(err){
    if(err){
      console.log(err);
      req.flash('danger','There is an error with the data you entered');
      res.send('error');
    }else{
      message.status='success';
      message.msg='Leave Request Sent';
      res.send('success');
    }
  });
});
//////////////////////////////////////////////////////////////
//principal/////////////////////////////////////////////////////////

router.get('/leaveApps',ensureAuthenticatedPrincipal,function(req,res){
  leaveData.find({},function(err,data){
    res.render('principal/leaveList',{data});
  });
});

router.get('/leaveDetails/:id',ensureAuthenticatedPrincipal,function(req,res){
  leaveData.findById(req.params.id,function(err,data){
    if(err){
      console.log(err);
    }else{
      res.render('principal/leaveDetails',{data});
    }
  });
});

router.post('/leave/approval/:id',ensureAuthenticatedPrincipal,function(req,res){
  var approved;
  if(req.body.approval=='Approve'){
    approved="Approved";
  }else{
    approved="Disapproved";
  }
  leaveData.update({_id:req.params.id},{approved:approved},function(err){
    if(err){
      console.log(err);
    }else{
      //res.redirect('/principal/');
      res.json({approval:approved});
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
