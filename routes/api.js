var express = require('express');
var router = express.Router();
var webduino = require('webduino-js');

let ledState = {
  open: false,
}

var rgbled;

board = new webduino.WebArduino('10XMWGQM');
board.on('ready', function () {
  board.systemReset();
  board.samplingInterval = 50;
  rgbled = getRGBLedCathode(board, 15, 12, 13);
});

router.get('/status', function(req, res, next) {
  res.json(ledState);
});

router.post('/led', function(req, res, next) {
  ledState.open = (req.body.open == 'true') ? true : false;
  if (ledState.open) {
    rgbled.setColor('#00cccc');
  } else {
    rgbled.setColor('#000000');
  }
  res.json({
    status: true,
    data: {
      ledState,
    }
  });
});

module.exports = router;
