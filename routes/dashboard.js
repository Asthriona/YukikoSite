var express = require('express');
var passport = require('passport');
var router = express.Router();
var title = "Yukiko Bot | ";
var fs = require('fs-extra');

function isAuthorise(req,res,next){
    if(req.user){
        console.log(`User ${req.user.username} is logged in (${req.user.email})/${req.user.did}`);
        next();
    }else{
        res.redirect('/');
    }
}
function animeavatar(req,res,next){
    if(req.user.avatar.startsWith('a_')){
        avatar = "https://cdn.discordapp.com/avatars/"+req.user.did+"/"+req.user.avatar+".gif"
    }else{
        avatar = "https://cdn.discordapp.com/avatars/"+req.user.did+"/"+req.user.avatar+".png"
    }
}
router.get('/', isAuthorise, (req,res)=>{
    res.render('dashboard', {
        title: title+' | Dashboard',
        username: req.user.username,
        //avatar: avatar,
        avatar: "https://cdn.discordapp.com/avatars/"+req.user.did+"/"+req.user.avatar+".png",
        guilds: req.user.guilds
    })
});
router.post('/upload', async function(req,res){
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);

        //Path where image will be uploaded
        fstream = fs.createWriteStream('./public/cards');
        file.pipe(fstream);
        fstream.on('close', function () {    
            console.log("Upload Finished of " + filename);              
            res.redirect('back');           //where to go next
        });
    });
});

module.exports = router;
