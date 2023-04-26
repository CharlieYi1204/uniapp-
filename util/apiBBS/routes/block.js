var express = require('express');
var router = express.Router();
var block = require('../controllers/blockController')

// 根路径：/block

router.get('/',block.getBlockInfo)
router.get('/getBlockFirst',block.getBlockFirst)

module.exports = router;