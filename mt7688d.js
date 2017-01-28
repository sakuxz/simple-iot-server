// run on LinkIt™ Smart 7688 Duo

var m = require('mraa');
var myLed = new m.Gpio(21);
myLed.dir(m.DIR_OUT);
var request = require('superagent');

setInterval(function () {
  request
  .get('192.168.0.12:3000/api/status')
  .end(function(err, res){
    console.log(JSON.parse(res.text));
    myLed.write(JSON.parse(res.text).open ? 1 : 0);
  });

}, 500);
