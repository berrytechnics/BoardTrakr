var mongoose = require('mongoose');
var Inventory = require('../models/inventory');
var Ticket = require('../models/ticket');

module.exports = function(socket){

  socket.on('ticketUpdate',data=>{
    Ticket.findOne({_id:data.id},(err,ticket)=>{
      if(err) console.log(err)
      else{
        if(!data.notes || data.notes == "") data.notes = "STATUS UPDATED: "+data.status;
        ticket.status.status = data.status;
        ticket.status.class = data.class+" btn-block";
        ticket.notes.push(data.notes);
        ticket.save(err=>{
          err ? socket.emit('error',err) : socket.emit('success',{message:"Ticket Updated!"})
        })
      }
    })
  })

  socket.on('partScan',data=>{
    if(data.partName=='' || !data.partName) socket.emit('partScan',"")
    else{
      Inventory.find({"name":{"$regex":data.partName,"$options":"i"}},(err,parts)=>{
        if(err) socket.emit('error',err)
        else socket.emit('partScan',parts)
      })
    }
  })

  socket.on('addPart',data=>{
    Inventory.findOne({"name":data.part},(err,part)=>{
      if(err) socket.emit('error',err)
      else{
        part.quantity -= 1;
        part.save(err=>{
          if(err) socket.emit('error',err)
          else{
            Ticket.findOne({_id:data.ticketID},(err,ticket)=>{
              ticket.parts.push(data.part)
              ticket.save(err=>{
                if(err) socket.emit('error',err)
                else socket.emit('partAdded',data.part)
              })
            })
          }
        })
      }
    })
  })

  socket.on('removePart',data=>{
    Ticket.findOne({_id:data.ticketID},(err,ticket)=>{
      if(err) socket.emit('error',err)
      else{
        ticket.parts = ticket.parts.filter(part=>{
          part !== data.part
        })
        ticket.save(err=>{
          if(err) socket.emit('error',err)
          else{
            Inventory.findOne({name:data.part},(err,part)=>{
              if(err) socket.emit('error',err)
              else{
                part.quantity += 1;
                part.save(err=>{
                  if(err) socket.emit('error',err)
                  else socket.emit('partRemoved',data.part)
                })
              }
            })
          }
        })
      }
    })
  })

}
