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
      return next(err);
    }
    
    // look up if user has voted on this poll
    var hasVoted = false;
    if (req.session && req.session.hasVoted && req.session.hasVoted[poll._id]){
      hasVoted = true;
    }
    
    res.render('polls/poll',{
      poll:poll,
      title:poll.name,
      hasVoted:hasVoted
    });
  
  });
  
};

exports.submitResponse = function(req,res,next){
  
  var pollId = req.params.id;
  
  if (req.session && req.session.hasVoted && req.session.hasVoted[pollId]){
    req.flash('errors',{msg:'You have already voted!'});
    return res.redirect(req.url);
  }
  
  
  Poll.findById(pollId,function(err,poll){
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
        poll.save(function(er){
          if(er)return next(er);
          //record that session has voted
          if (req.session){
            req.session.hasVoted = req.session.hasVoted || {};
            req.session.hasVoted[poll._id] = true;
          }
          
          req.flash('success',{msg:'Your vote has been recorded'})
          res.redirect(req.url);
        });
      }else{
        return next('poll choice not valid');
      }
      
    }else{//poll choice not sumbitted
      req.flash('errors',{msg:'Please select an option'});
      return res.redirect(req.url);
    }
    
  });
  
};

exports.getPollJson = function(req,res,next){
  Poll.findById(req.params.id,function(err,poll){
    if(err) return next(err);
    res.json(poll);
  });
};