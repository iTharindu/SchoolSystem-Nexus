var express=require('express');
const router=express.Router();
var path=require('path');
var fs=require('fs');

let Payment=require('../models/payment');

router.get('/add',function(req,res){
    res.render("add_payment");
});
router.post('/add',function(req,res){
    let payment=new Payment();
    payment.student=req.body.student;
    payment.description=req.body.description;
    payment.amount=req.body.amount;

    payment.save(function(err){
        if(err){
            console.log(err);
            return;
        } else{
            res.redirect('/payment/view');
        }
    });
});


router.get('/view',function(req,res){
    Payment.find({},function (err,payments){

        if(err){
            console.log(err);
            return;
        }
        else{
        res.render("view_payment",{
            payments:payments
        });
    }
  });

});


module.exports=router;
