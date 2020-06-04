var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Site = require('../model/DiscordSite')
var siteconfig = require('../siteconfig.json')
mongoose.connect(siteconfig.dbLink, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var userDataSchema = new mongoose.Schema({
  did: String,
  username: String,
  serverID: String,
  xp: Number,
  level: Number,
  message: Number,
  avatarURL: String,
}, { collection: 'users' });
var UsersData = mongoose.model('Users', userDataSchema);

/* GET home page. */
var title = "Yukiko Bot"
router.get('/', function (req, res, next) {
    if(req.user){
      console.log(req.user.username)
      res.render('home', { title: title, username: req.user.username, avatar: "https://cdn.discordapp.com/avatars/"+req.user.did+"/"+req.user.avatar+".png", login:1});
    }else{
      res.render('home', { title: title, username: "User", avatar: "https://cdn.asthriona.com/6debd47ed13483642cf09e832ed0bc1b.png", login:0});
    }
});
var title = "Yukiko Bot"
router.get('/fr', function (req, res, next) {
  res.render('indexfr', { title: title });
});
router.get('/wp-admin', function (req, res, next) {
  res.render('wp-admin', { title: title + "you got jebaited" });
});
router.get('/wp-login', function (req, res, next) {
  res.render('wp-admin', { title: title + " you got jebaited" });
});
//LeaderBoard
router.get('/lb?:id', function (req, res, next) {
  if(req.user){
    console.log(req.user.username)
    UsersData.find({ serverID: req.query.id })
    .sort([['xp', 'descending']])
    .then(function (users) {
      res.render('data', { 
        items: users,
        username: req.user.username,
        avatar: "https://cdn.discordapp.com/avatars/"+req.user.did+"/"+req.user.avatar+".png",
        login:1
      })
    })
  }else{
    UsersData.find({ serverID: req.query.id })
    .sort([['xp', 'descending']])
    .then(function (users) {
      res.render('data', { 
        items: users,
        username: "User",
        avatar: "https://cdn.asthriona.com/6debd47ed13483642cf09e832ed0bc1b.png",
        login:0
      })
    })
  }
});
router.get('/forbidden', (req,res)=>{
  res.send("woops! An error happened!").status('403')
  res.end()
})

//Login

module.exports = router;
