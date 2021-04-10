## PROJECT NO LONGER SUPPORTED!  
This project has been created a long time ago, back then we didnt really know what we were doing.  
We (The [Yukiko Dev Team](https://github.com/Yukiko-Dev-Team)) do not support this project anymore instead we are using a private version on our Git ([github.com/Yukiko-Dev-Team](https://github.com/Yukiko-Dev-Team))  
I may will work on a new version as soon as we finished the new production website for [Yukiko](https://Yukiko.app) and the open Yukiko version is updated.  

# Yukiko's Website
This web app works with [Asthriona/Yukiko](https://github.com/Asthriona/Yukiko).  
Yukiko is a pretty powerfull Discord bot that include XP system, Leaderboard, Music, Welcome and farewell message, Moderation, and much more!
  
This Web panel is in developement state and actively updated.  
  
  # Install 
  

``` 
 $ apt update && apt upgrade && curl -sL https://deb.nodesource.com/setup_12.x | bash - && apt install nodejs build-essential -y

git clone https://github.com/Asthriona/YukikoSite .
cd YukikoSite/
npm install 
```

# Configuration:

This panel has been developed for [Asthriona/Yukiko](https://github.com/Asthriona/Yukiko), you need to run Yukiko for it to work. 
 
You also need to setup a Oauth2 app on [Discord developper portal](https://discord.com/developers/applications).

``` 
cp siteconfig.json.exemple siteconfig.json
```

``` json
    "dbLink": "mongodb://[USER]:[PASSWORD]@[IP/DNS]/[discordbot]",
    "client_id": "[APP CLIENT ID]",
    "client_secret": "[APP SECRET]",
    "client_redirect": "/auth/redirect",
    "secret": "[What ever you want but keep it secret.]"
```

The secret is for the sessions. they are stored encrypted in your databse. keep the bit secret, never disclose it, same for your client id, ***KEEP IT SECRET!***

Then start the bot.

``` 
npm start
```

don't forget to setup your redirect URI on the [Discord developper portal](https://discord.com/developers/applications).
  

# Help us

Hi, I'am [Asthriona](https://Asthriona.com) Some kind of developper. i'm doing stuff on internet for quite a long time... a decade now, and I love making software that can be usefull or help other.  
But if you want to help me, Feel free to take a look at the code, Create issue for idea/bugs, or pull request.  
  
  As I said, i'm full time doing this, and now days, being indie developper don't really pay the bills (not even talking about server bill.), so if you really want to help, and have some bucks to spare, Feel free to pay me a ko-fi   

    

  [![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/C0C61FCVH)

  
By supporting me on Ko-Fi you are helping the Yukiko Dev team.  

  Thanks for your interest in Yukiko! *<3*
