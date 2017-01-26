var express = require('express');
require('webduino-js');
require('webduino-blockly');

var router = express.Router();

let ledState = {
  open: false,
}

var rgbled;
boardReady({board: 'Smart', device: '10XMWGQM', transport: 'mqtt'}, function (board) {
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
