var mongoose = require("mongoose");
var siteconfig = require("./siteconfig.json")
let dbusername = siteconfig.dbuser;
let dbpasswd = siteconfig.dbpass;
var db = mongoose.connection;
var Users = require('./model/xp.js')

mongoose.connect('mongodb+srv://' + dbusername + ':'+ dbpasswd +'@yukiko-pcvs8.mongodb.net/discordbot?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
db.on('error', console.error.bind(console, 'YukikoDB connection error Error'))
console.log("Logged in to YukikoDB")
Users.findOne({
  did: 186195458182479874,
  serverID: 612216766680268811
}, (err, users) =>{
  if(err) console.log(err);
  console.log(users.xp)
})