var express = require('express');
var router = express.Router();
var moment = require('moment');
var Customer = require('../models/customer');
var Ticket = require('../models/ticket');


/* GET home page. */
router.get('/', function(req, res, next) {
  Ticket.find({"status.status":{$ne:'Completed',$ne:'Cancelled'}}).then(data=>{
    res.render('ticket/index',{ticket:data});
  })
});

router.get('/new/:id',(req,res,next)=>{
  Customer.findOne({_id:req.params.id},(err,data)=>{
  if(err) res.render('error',{error:err})
  else res.render('ticket/new',{customer:data})
  })
});

router.post('/new',(req,res,next)=>{
  var data = {
    "customer":req.body.customer,
    "customerID":req.body.customerID,
    "date":moment().format('MMMM Do YYYY, h:mm:ss a'),
    "device":{
      "make":req.body.make,
      "model":req.body.model,
      "carrier":req.body.carrier,
      "serial":req.body.imei,
      "passcode":req.body.passcode
    },
    "status":{
      "status":"NEW",
      "class":"btn btn-success"
    },
    "issue":req.body.issue,
    "description":req.body.description,
    "notes":[]
  };
  var ticket = new Ticket(data);
  ticket.save(err=>{
    if(err) res.render('error',{error:err})
    else res.redirect('/ticket/edit/'+ticket._id+'')
  })
})

router.get('/edit/:id',(req,res,next)=>{
  Ticket.findOne({_id:req.params.id},(err,ticket)=>{
    if(err) res.render('error',{error:err})
    else{
      Customer.findOne({_id:ticket.customerID},(err,customer)=>{
        if(err) res.render('error',{error:err});
        else res.render('ticket/edit',{customer:customer,ticket:ticket})
      })
    }
  })
})

module.exports = router;
