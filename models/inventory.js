var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Inventory = new Schema({
  name:String,
  cost:Number,
  quantity:Number,
  reorder:Number
});


module.exports = mongoose.model('inventory', Inventory)
