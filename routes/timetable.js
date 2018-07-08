var express=require('express');
const router=express.Router();
var path=require('path');
var fs=require('fs');

let Timetable=require('../models/timetable');

router.get('/add',function(req,res){
   res.render('add_timetable'  );
});


router.post('/add',function(req,res){
    let timetable=new Timetable();
    timetable.class=req.body.claa;

    timetable.monday_first=req.body.monday_first;
    timetable.monday_second=req.body.monday_second;
    timetable.monday_third=req.body.monday_third;
    timetable.monday_fourth=req.body.monday_fourth;
    timetable.monday_fifth=req.body.monday_fifth;
    timetable.monday_sixth=req.body.monday_sixth;
    timetable.monday_seventh=req.body.monday_seventh;
    timetable.monday_eighth=req.body.monday_eighth;

    timetable.tuesday_first=req.body.tuesday_first;
    timetable.tuesday_second=req.body.tuesday_second;
    timetable.tuesday_third=req.body.tuesday_third;
    timetable.tuesday_fourth=req.body.tuesday_fourth;
    timetable.tuesday_fifth=req.body.tuesday_fifth;
    timetable.tuesday_sixth=req.body.tuesday_sixth;
    timetable.tuesday_seventh=req.body.tuesday_seventh;
    timetable.tuesday_eighth=req.body.tuesday_eighth;

    timetable.wednesday_first=req.body.wednesday_first;
    timetable.wednesday_second=req.body.wednesday_second;
    timetable.wednesday_third=req.body.wednesday_third;
    timetable.wednesday_fourth=req.body.wednesday_fourth;
    timetable.wednesday_fifth=req.body.wednesday_fifth;
    timetable.wednesday_sixth=req.body.wednesday_sixth;
    timetable.wednesday_seventh=req.body.wednesday_seventh;
    timetable.wednesday_eighth=req.body.wednesday_eighth;

    timetable.thursday_first=req.body.thursday_first;
    timetable.thursday_second=req.body.thursday_second;
    timetable.thursday_third=req.body.thursday_third;
    timetable.thursday_fourth=req.body.thursday_fourth;
    timetable.thursday_fifth=req.body.thursday_fifth;
    timetable.thursday_sixth=req.body.thursday_sixth;
    timetable.thursday_seventh=req.body.thursday_seventh;
    timetable.thursday_eighth=req.body.thursday_eighth;

    timetable.friday_first=req.body.friday_first;
    timetable.friday_second=req.body.friday_second;
    timetable.friday_third=req.body.friday_third;
    timetable.friday_fourth=req.body.friday_fourth;
    timetable.friday_fifth=req.body.friday_fifth;
    timetable.friday_sixth=req.body.friday_sixth;
    timetable.friday_seventh=req.body.friday_seventh;
    timetable.friday_eighth=req.body.friday_eighth;

    timetable.save(function(err){
        if(err){
            console.log(err);
            return;
        } else{
            res.redirect('/');
        }
    })
});

router.get('/view',function(req,res){
    Timetable.find({},function(err,timetable){
        if(err){
          console.log(err);
        }else{
          res.render('student/view_timetable',{timetable:timetable});
        }
      });

});


module.exports=router;
