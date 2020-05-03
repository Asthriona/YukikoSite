var express = require('express');
var passport = require('passport');
var router = express.Router();
var title = "Yukiko Bot | ";
var fs = require('fs-extra');
var formidable = require('formidable');
var axios = require('axios');
var Site = require('../model/DiscordSite');
var Cards = require('../model/cards');

function isAuthorise(req, res, next) {
    if (req.user) {
        console.log(`User ${req.user.username} is logged in (${req.user.email})/${req.user.did}`);
        next();
    } else {
        res.redirect('/');
    }
}
function animeavatar(req, res, next) {
    if (req.user.avatar.startsWith('a_')) {
        avatar = "https://cdn.discordapp.com/avatars/" + req.user.did + "/" + req.user.avatar + ".gif"
        next();
    } else {
        avatar = "https://cdn.discordapp.com/avatars/" + req.user.did + "/" + req.user.avatar + ".png"
        next();
    }
}
function addcards(req, res, next) {
    Cards.findOne({ did: req.user.did }, (err, cards) => {
        if (!cards) {
            var newCards = new Cards({
                did: req.user.did,
                link: "https://cdn.asthriona.com/DefaultYukikocard.jpg"
            });
            newCards.save().catch(error => console.log(error));
            console.log(`Card created for ${req.user.username}`)
            res.redirect('/dashboard');
        } else {
            next();
        }
    });
}
router.get('/', isAuthorise, addcards, async (req, res) => {
    res.render('dashboard', {
        title: title + ' | Dashboard',
        username: req.user.username,
        avatar: "https://cdn.discordapp.com/avatars/" + req.user.did + "/" + req.user.avatar + ".png",
        guilds: req.user.guilds,
    })
});
router.get('/guilds', isAuthorise, (req, res) => {
    res.render('guildPanel', {
        title: title + ' | Dashboard',
        username: req.user.username,
        avatar: "https://cdn.discordapp.com/avatars/" + req.user.did + "/" + req.user.avatar + ".png",
        guilds: req.user.guilds,
    });
});
router.get('/cards', isAuthorise, (req, res) => {
    Cards.findOne({ did: req.user.did }, (err, cards) => {
        if (!cards) { newCards() }
        res.render('cards', {
            title: title + ' | Dashboard',
            username: req.user.username,
            avatar: "https://cdn.discordapp.com/avatars/" + req.user.did + "/" + req.user.avatar + ".png",
            guilds: req.user.guilds,
            card: cards.link
        });
    });
});
router.get('/status', isAuthorise, addcards, async (req, res) => {
    res.render('status', {
        title: title + ' | Status',
        username: req.user.username,
        avatar: "https://cdn.discordapp.com/avatars/" + req.user.did + "/" + req.user.avatar + ".png",
        guilds: req.user.guilds,
    })
});
router.post('/upload', (req, res) => {
    new formidable.IncomingForm().parse(req)
        .on('field', (name, field) => {
            if (name === null) res.redirect("/");
            console.log('Field', name, field)
        })
        .on('fileBegin', async (name, file) => {
            var filenanme = req.user.did + "." + file.type.slice(6)
            file.path = './public/cards/' + filenanme;
        })
        .on('file', (name, file) => {
            console.log('Uploaded file', name, file)
            Cards.findOne({
                did: req.user.did
            }, async (err, cards) => {
                console.log('Uploaded file', name, file)
                var filenanme = req.user.did + "." + file.type.slice(6)
                cards.link = "http://cdn.yukiko.ovh/cards/" + filenanme
                var updateCards = cards.save().catch(error => console.log(error)).then(updateCards)
            })
        })
        .on('error', (err) => {
            console.error('Error', err)
            throw err
        })
        .on('end', (name, file, savedCard) => {
            res.redirect('/dashboard/cards')
        })
});
router.get('/cardReset', (req,res,next)=>{
    Cards.findOne({
        did: req.user.did
    }, async (err, cards)=>{
        cards.link = "https://cdn.asthriona.com/DefaultYukikocard.jpg"
        cards.save()
    });
    res.redirect('/dashboard/cards')
})

module.exports = router;