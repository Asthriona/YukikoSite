var mongoose = require('mongoose');
config = require("../siteconfig.json");

module.exports = mongoose.connect(config.dbLink, { useUnifiedTopology: true, useNewUrlParser: true })


