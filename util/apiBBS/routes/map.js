var express = require('express');
var router = express.Router();
var map = require('../controllers/mapController')

router.get('/',map.getMapData)
router.post('/addMapData',map.addMapData)
router.get('/getSupportInfo',map.getCardSupport)
router.get('/getCardDiscount',map.getCardDiscount)
router.get('/getCardInfo',map.getCardInfo)
router.post('/deleteSupportDelete',map.deleteSupportDelete)
module.exports = router;