var express = require('express');
var router = express.Router();
var bbs = require('../controllers/bbsController')

router.get("/",bbs.getPostData)
router.get("/getLikesNum",bbs.getLikesData)
router.get("/getIsLikes",bbs.getIsLikes)
router.get("/delLikes",bbs.delLikes)
router.get("/addLikes",bbs.addLikes)
module.exports = router;