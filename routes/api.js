var express = require('express');
var router = express.Router();

let ledState = {
  open: false,
}

router.get('/status', function(req, res, next) {
  res.json(ledState);
});

router.post('/led', function(req, res, next) {
  ledState.open = (req.body.open == 'true') ? true : false;
  res.json({
    status: true,
    data: {
      ledState,
    }
  });
});

module.exports = router;
