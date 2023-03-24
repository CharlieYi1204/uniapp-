var express = require('express');
var router = express.Router();
var geo = require('../controllers/geoController')

router.get('/',geo.getGeo)

module.exports = router;