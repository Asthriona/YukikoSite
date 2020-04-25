console.log('%c Yukiko', 'font-size:100px;color:#fff;text-shadow:0 3px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);');
console.log("Website developed by Asthriona & Heather");
console.log("Hosted by Asthriona ltd.");
console.log("GitHub: https://github.com/Asthriona/Yukiko");

var oldTime = new Date('2019/04/12 16:50:52');
var timer = setInterval(function () {
  var nowTime = new Date();
  var longTime = nowTime - oldTime;
  var days = parseInt(longTime / 1000 / 60 / 60 / 24, 10);
  var hours = parseInt(longTime / 1000 / 60 / 60 % 24, 10);
  var minutes = parseInt(longTime / 1000 / 60 % 60, 10);
  var seconds = parseInt(longTime / 1000 % 60, 10);
  $('.uptime').html(longTime = days + " Days " + hours + " Hours " + minutes + " Minutes and " + seconds + " seconds");
}, 1000);