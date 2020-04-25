var mongoose = require('mongoose');

var SiteShchema = new mongoose.Schema({
    did: {type: String, required: true},
    username: {type: String, required: true},
    avatar: {type: String, required: false},
    email: {type: String, required: true},
    guilds: {type: Array, required: true},

})
var Site = module.exports = mongoose.model('Site', SiteShchema);

