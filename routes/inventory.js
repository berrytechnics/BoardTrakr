var express = require('express');
var router = express.Router();
var Inventory = require('../models/inventory');

/* GET home page. */
router.get('/',(req,res,next)=>{
  Inventory.find({}).then(data=>{
    var index = [];
    data.forEach(entry=>{
      index.push(entry);
    })
    res.render('inventory/index',{data:index,user:req.user})
  })
})

router.get('/edit/:id',(req,res,next)=>{
  Inventory.findOne({_id:req.params.id}).then(data=>{
    res.render('inventory/edit',{data:data,user:req.user})
  })
})
router.post('/edit',(req,res,next)=>{
  Inventory.findOneAndUpdate(
      {_id: req.body._id},
      req.body,
      {new: true},
      (err, data) => {
      if (err) {
         res.render('error',{error:err,user:req.user})
      }
      else res.redirect('/inventory')
    }
  )
})

router.get('/delete/:id',(req,res,next)=>{
  console.log(req.params.id)
  Inventory.findByIdAndRemove(req.params.id,err=>{
    if(err) res.render('error',{error:err,user:req.user})
    else res.redirect('/inventory')
  })
})

router.get('/new',(req,res,next)=>{
  res.render('inventory/new',{user:req.user})
})
router.post('/new',(req,res,next)=>{
  req.body.quantity = 0;
  var part = new Inventory(req.body)
  part.save(err=>{
    if(err) res.render('error',{error:err,user:req.user})
    else res.redirect('/inventory')
  })
})

router.get('/reorder',(req,res,next)=>{
  Inventory.find({}).$where('this.reorder >= this.quantity').then(parts=>{
    parts.forEach(part=>{
      part.needed = part.reorder-part.quantity+1
    })
    console.log(parts)
    res.render('inventory/reorder',{data:parts,user:req.user})
  })
})



module.exports = router;
