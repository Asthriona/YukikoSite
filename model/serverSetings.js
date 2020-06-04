var mongoose = require("mongoose");

var serverSetingsSchema = new mongoose.Schema({
    sid: String,
    level: Boolean,
    musicbot: Boolean,
    welcome: Boolean,
    farewell: Boolean,
    usercount: Boolean,
    rankcard: Boolean,
    rankchannel: String
})
module.exports = mongoose.model("serverSetings", serverSetingsSchema);