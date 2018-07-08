var express=require('express');
const router=express.Router();
var path=require('path');
var fs=require('fs');

var leaveData=require('../models/teacher-leaves');

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
  leaveData.find({teacherName:req.user.username},function(err,data){
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
      res.send('success');
    }
  });
});

router.get('/applyLeave',ensureAuthenticatedTeacher,function(req,res){
  leaveData.find({teacherName:req.user.username},function(err,data){
    var dat=data.pop();
    if(dat!=null){
      var teacherData=dat;
      var user={leavesTaken:(teacherData.leavesTaken+teacherData.noOfLeaveDays)};
      res.render('teacher/leave-application',{user:user});
    }else{
      var user={leavesTaken:0}
      res.render('teacher/leave-application',{user:user});
    }
  })
});

router.post('/processLeaveApp',ensureAuthenticatedTeacher,function(req,res){
  leaveData.find({teacherName:req.user.username},function(err,data){
    var user=data.pop();
    if(user==null){
      var user={leavesTaken:0,noOfLeaveDays:0}
    }
    var leavedata=new leaveData();
    leavedata.teacherName=req.user.username;
    leavedata.designation=req.user.type;
    leavedata.noOfLeaveDays=req.body.noOfLeaveDays;
    leavedata.leavesTaken=user.leavesTaken+user.noOfLeaveDays;
    leavedata.dateOfCommencingLeave=req.body.dateOfCommencingLeave;
    leavedata.dateOfResumingLeave=req.body.dateOfResumingDuty;
    leavedata.reason=req.body.reason;
    leavedata.approved="Not Yet Decided";
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
      res.json({approval:approved});////////////////////////////////////////////////////////////////////////////////////////////////////
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
