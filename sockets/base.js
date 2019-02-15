var mongoose = require('mongoose');
module.exports = function(io){
  io.on('connection',socket=>{
    require('./tickets')(socket);
  })
}
