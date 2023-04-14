var express = require('express');
var router = express.Router();
var map = require('../controllers/mapController')

router.get('/',map.getMapData)
router.post('/addMapData',map.addMapData)
router.get('/getSupportInfo',map.getCardSupport)
router.post('/getDiscount',map.getCardDiscount)
module.exports = router;