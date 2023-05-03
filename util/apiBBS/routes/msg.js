var express = require('express');
var router = express.Router();
var msg = require('../controllers/msgController')

router.get('/',msg.getNotice)
router.get('/getNoticeByID',msg.getNoticeByID)
router.get('/getTopNotice',msg.getTopNotice)
router.post('/addNotice',msg.addNotice)
router.post('/delNotice',msg.delNotice)
router.post('/updateNotice',msg.updateNotice)
router.post('/setTopNotice',msg.setTopNotice)
router.post('/cancelTopNotice',msg.cancelTopNotice)
module.exports = router;