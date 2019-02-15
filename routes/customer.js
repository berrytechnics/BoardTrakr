var express = require('express');
var router = express.Router();
var customers = require('../models/customer');
/* GET home page. */
router.get('/index',(req,res,next)=>{
  customers.find({}).then(data=>{
    var index = [];
    data.forEach(entry=>{
      index.push(entry);
    })
    res.render('customer/index',{data:index})
  })
})

router.get('/new',(req,res,next)=>{
  res.render('customer/new')
})
router.post('/new',(req,res,next)=>{
  var data = new customers(req.body);
  data.save(err=>{
    err ? console.log(err) : console.log('Customer Saved!')
    res.redirect('/customer/index')
  })
})

router.get('/delete/:id',(req,res,next)=>{
  customers.findByIdAndRemove(req.params.id,err=>{
    if(err) res.render('error',{error:err})
    else res.redirect('/customer/index')
  })
})

router.get('/edit/:id',(req,res,next)=>{
  var id = req.params.id;
  customers.findOne({_id:id},(err,data)=>{
    if (err) res.render('error',{error:err})
    else res.render('customer/edit',{data:data})
  })
})
router.post('/edit',(req,res,next)=>{
  customers.findOneAndUpdate(
      {_id: req.body._id},
      req.body,
      {new: true},
      (err, data) => {
      if (err) {
         res.render('error',{error:err})
      }
      else res.redirect('/customer/index')
    }
  )
})

module.exports = router;
