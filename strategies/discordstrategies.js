var DiscordStrategies = require('passport-discord').Strategy;
var passport = require('passport');
var Site = require('../model/DiscordSite')
config = require("../siteconfig.json");

passport.serializeUser((user, done) => {
    console.log("Serializing user");
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    console.log("Deserializing user");
    var user = await Site.findById(id);
    if (user) done(null, user)
});

passport.use(new DiscordStrategies({
    clientID: config.client_id,
    clientSecret: config.client_secret,
    callbackURL: config.client_redirect,
    scope: ['identify', 'guilds']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        var user = await Site.findOne({ did: profile.id });
        if (user) {
            var updatedUser = await Site.findOneAndUpdate({ did: profile.id },
                {
                    username: profile.username,
                    tag: profile.discriminator,
                    avatar: profile.avatar,
                    email: profile.email,
                    guilds: profile.guilds,
                    premium: profile.premium_type,
                    local: profile.locale,
                    flags: profile.flags
                });
            var savedUser = await updatedUser.save();
            done(null, savedUser);
        } else {
            var newUser = await Site.create({
                did: profile.id,
                username: profile.username,
                tag: profile.discriminator,
                avatar: profile.avatar,
                email: profile.email,
                guilds: profile.guilds,
                premium: profile.premium_type,
                local: profile.locale,
                flags: profile.flags
            });
            var savedUser = await newUser.save();
            done(null, savedUser);
        }
    } catch (error) {
        console.log(error);
        done(error, null);
    }
}));

