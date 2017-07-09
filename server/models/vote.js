
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    title:{type:String},
    options:{type:Array,default:[]},
    user:{type:String},
    vote_user:{type:Array,default:[]}

})

const Votes = mongoose.model('votes',voteSchema);
module.exports = Votes;