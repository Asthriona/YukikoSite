var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var siteconfig = require('../siteconfig.json')
  mongoose.connect(siteconfig.dbLink,{
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
}, {collection: 'users'});

var UsersData = mongoose.model('Users', userDataSchema);

/* GET home page. */
var title = "Yukiko Bot"
router.get('/', function(req, res, next) {
  res.render('index', { title: title });
});
var title = "Yukiko Bot"
router.get('/fr', function(req, res, next) {
  res.render('indexfr', { title: title });
});
router.get('/wp-admin', function(req, res, next) {
  res.render('wp-admin', { title: title + "you got jebaited" });
});
router.get('/wp-login', function(req, res, next) {
  res.render('wp-admin', { title: title + "you got jebaited" });
});
//LeaderBoard
router.get('/lb?:id', function(req, res, next){
  UsersData.find({serverID: req.query.id})
  .sort([['xp', 'descending']])
    .then(function(users){
      res.render('data', {items: users, title: title + "'s Leaderboard"})
    })
  });
module.exports = router;
