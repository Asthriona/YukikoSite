var mongoose = require("mongoose");

var serverListSchema = new mongoose.Schema({
    sid: String,
    sname: String,
    sicon: String,
    sowner: String
})
module.exports = mongoose.model("ServerList", serverListSchema);