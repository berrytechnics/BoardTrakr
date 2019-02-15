var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Customer = new Schema({
  company:  String,
  contact:  String,
  phone:    String,
  facebook: String,
  website:  String,
  paypal:   String,
  tickets:  Array,

});


module.exports = mongoose.model('Customers', Customer)
