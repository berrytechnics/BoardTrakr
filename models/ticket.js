var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Ticket = new Schema({
  customer:String,
  customerID:String,
  date:String,
  device:{
    make:String,
    model:String,
    carrier:String,
    serial:String,
    passcode:String
  },
  status:{
    status:String,
    class:String,
  },
  issue:String,
  description:String,
  notes:Array,
  tracking:String,
  parts:Array
});


module.exports = mongoose.model('Ticket', Ticket)
