var express = require('express');
var router = express.Router();

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
router.get('/login', function(req, res, next) {
  res.render('wp-admin', { title: title + "you got jebaited" });
});
module.exports = router;
