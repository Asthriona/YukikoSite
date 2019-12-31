var express = require('express');
var router = express.Router();

var title = "Yukiko Bot | Leaderboard"
router.get('/', function(req, res, next) {
  res.render('lb/index', { title: title, layout: "layoutlb" });
});

module.exports = router;
