var express = require('express');
var router = express.Router();
var block = require('../controllers/blockController')

// 根路径：/block

router.get('/',block.getBlockInfo)
router.get('/getBlockFirst',block.getBlockFirst)
router.post('/changeBlockName',block.changeBlockName)
router.post('/addBlock',block.addBlock)
router.post('/deleteBlock',block.deleteBlock)
router.post('/addBlockDetail',block.addBlockDetail)
router.post('/deleteBlockDeatil',block.deleteBlockDeatil)
router.post('/updateBlockDeatil',block.updateBlockDeatil)
router.post('/cancelBlockTop',block.cancelBlockTop)
router.post('/setBlockTop',block.setBlockTop)
module.exports = router;