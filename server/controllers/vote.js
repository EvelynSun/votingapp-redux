const Vote = require('../models/vote');
const mongoose = require('mongoose');

exports.allVotes = function(req,res,next){

    Vote.find({},function(err,votes) {
        if(err) {return next(err);}
        
        res.send(votes)
    })
}

exports.newVote = function(req,res,next) {
    const title = req.body.title;
    const options = req.body.options;
    const user = req.body.user;
    
    const vote = new Vote({
        title:title,
        options:options,
        user:user
    })

    vote.save(function(err) {
        if(err) {return err;}
        res.send('new vote saved')
    })
}

exports.getVote = function(req,res,next) {
    const id = req.params.id;
     Vote.find({_id:id},function(err,vote) {
        if(err) {return next(err);}
        
        res.send(vote)
    })
}

exports.getMyVote = function(req,res,next){
    const user = req.params.user;
   Vote.find({user:user},function(err,votes){
       if(err) {return next(err);}
       res.send(votes);
   })
}


exports.userVote = function(req,res,next) {
   const id = req.params.id;
   const option = req.body.option;
   const vote_user = req.body.vote_user;

  // res.send({id,option,vote_user})

  // find the ID vote

  Vote.findOne({_id:id},function(err,vote){

      //find whether the user alerady voted
      if(vote.vote_user.indexOf(vote_user) >= 0) {
         res.send( {error:"The User already voted!"});
      }else{
          //find choosed option
            vote.options.map((item,index) => {
                if(item.option === option) {
             //res.send('options[index]',vote.options[index])
             // const event ={vote_user:{}};
            // event.vote_user[vote_user] = {option}
            
                    const  update = { vote_user:vote.vote_user,
                               $inc: {}};
             // res.send(vote.vote_user)
                    update.vote_user.push(vote_user);
                    update.$inc['options.' + index + ".votes"] = 1;
             //const choosed_option = vote.options[index]
                    Vote.update({_id:id},update,function(err,updated){
                        if(err) return err;
                        res.send(updated)
                    })
                }
            }) 
         }         
  })

 
}

exports.deleteVote = function(req,res,next){
    const id = mongoose.Types.ObjectId(req.params.id);
    console.log('id',id)
    Vote.remove({_id:id},function(err){
        if(err) return err;
        // Vote.find({},function(err,votes){
        // res.send(votes)
        //  })
        res.json({message:"the vote successfully deleted"})
    })

    
}
