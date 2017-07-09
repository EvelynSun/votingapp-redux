const Authentication = require('./controllers/authentication');
const Vote = require('./controllers/vote');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt',{session:false});
const requireSignin = passport.authenticate('local',{session:false})
module.exports = function(app) {
    app.get('/',requireAuth,function(req,res,next) {
        res.send('hi hihi')
    })

    app.post('/signup',Authentication.signup)

    app.post('/signin',requireSignin,Authentication.signin)

    app.get('/vote/all',Vote.allVotes);
    app.post('/vote/new',Vote.newVote);
    app.get('/vote/:id', Vote.getVote);
    app.get('/vote/myvotes/:user',Vote.getMyVote);
    app.post('/vote/:id',Vote.userVote);
    app.delete('/vote/:id',Vote.deleteVote);
}