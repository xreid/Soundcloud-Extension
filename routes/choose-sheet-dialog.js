var express = require('express');
var router = express.Router();

/* GET choose-sheet-dialog listing. */
router.get('/', function(req, res, next) {
  res.render('choose-sheet-dialog');
});

module.exports = router;
