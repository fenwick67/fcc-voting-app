var _ = require('lodash');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var User = require('../models/User');
var Poll = require('../models/Poll');
var secrets = require('../config/secrets');

/**
 * GET /poll/:id
 * 
 */
exports.getPoll = function(req,res,next){
  Poll.findById(req.params.id, function(err, poll) {
    if (err) {
      //console.log('cannot get poll',req.params.id)
      return next(err);
    }
    //console.log('rendering poll',poll)
    
    res.render('polls/poll',{
      poll:poll,
      title:poll.name
    });
  
  });
  
};

exports.submitResponse = function(req,res,next){
  
  Poll.findById(req.params.id,function(err,poll){
    if(err) return next(err);
    if (poll.active === false){
      return next('Poll is no longer active.  Sorry!');
    }
    //find index of poll choice
    if (typeof req.body.pollchoice == 'string'){//poll choice is a string
      var choiceIndex = null;
      for(var i=0,l=poll.options.length;i<l;i++){
        if (poll.options[i] === req.body.pollchoice){//find poll choice in poll options
          choiceIndex = i;
          break;
        }
      }
      
      //increment results array at that index
      if(typeof choiceIndex === 'number'){
        
        if (typeof poll.results[choiceIndex] !== 'number'){
          poll.results[choiceIndex]=0;
        }
        
        poll.results[choiceIndex] = poll.results[choiceIndex] + 1;
        poll.markModified('results');
        //console.log(poll);
        poll.save(function(er){
          console.log(poll);
          if(er)return next(er);
          req.flash('success',{msg:'Your vote has been recorded'})
          res.redirect('/poll/'+req.params.id);
        });
      }else{
        return next('poll choice not valid');
      }
      
    }else{//poll choice not sumbitted
      return next('poll choice not submitted');
    }
    
  });
  
};

exports.getPollJson = function(req,res,next){
  Poll.findById(req.params.id,function(err,poll){
    if(err) return next(err);
    console.log('from json: ',poll);
    res.json(poll);
  });
};