var express = require('express');
var router = express.Router();
var bbs = require('../controllers/bbsController')

router.get("/",bbs.getPostData)
router.get("/getLikesNum",bbs.getLikesData)
router.get("/getIsLikes",bbs.getIsLikes)
router.get("/delLikes",bbs.delLikes)
router.get("/addLikes",bbs.addLikes)
router.get("/getTargetPostData",bbs.getTargetPostData)
router.get("/getFollowNum",bbs.getFollowNum)
router.get("/getFansNum",bbs.getFansNum)
router.get("/getPostByUserID",bbs.getPostByUserID)
router.get("/follows",bbs.follows)
router.get("/getFollowState",bbs.getFollowState)
router.get("/cancleFollow",bbs.cancleFollow)
router.get("/addVisitCount",bbs.addVisitCount)
router.get("/getVisitCount",bbs.getVisitCount)
router.get('/getCollectByID',bbs.getCollectByID)
router.post("/addCollect",bbs.addCollect)
router.post("/cancelCollect",bbs.cancelCollect)
router.get("/getCollectState",bbs.getCollectState)
router.get("/getCommentCountByPostID",bbs.getCommentCountByPostID)
router.get("/getCommentData",bbs.getCommentData)
router.post("/sendPost",bbs.sendPost)
router.get("/getWonderfulPost",bbs.getWonderfulPost)
router.post("/deletePost",bbs.deletePost)
router.post("/getPostsByID",bbs.getPostsByID)
router.post("/getFocusUerInfoByUserID",bbs.getFocusUerInfoByUserID)
router.post("/getFansInfoByUserID",bbs.getFansInfoByUserID)
router.post("/getPostNumByUserID",bbs.getPostNumByUserID)
router.post("/getCollectNumByUserID",bbs.getCollectNumByUserID)
router.post("/getFollowNumByUserID",bbs.getFollowNumByUserID)
router.post("/getFansNumByUserID",bbs.getFansNumByUserID)
router.get('/getCheckPost',bbs.getCheckPost)
router.post("/replyPost",bbs.replyPost)
router.post('/deleteComment',bbs.deleteComment)
router.post('/searchPost',bbs.searchPost)
router.get('/getCommentByUserID',bbs.getCommentByUserID)
router.get('/getClassify',bbs.getClassify)
router.get('/getBlockName',bbs.getBlockName)
router.get('/getBlockPostNum',bbs.getBlockPostNum)
router.get("/getHotBlock",bbs.getHotBlock)
router.get('/getPostByBlock',bbs.getPostByBlock)
router.get('/getBlockInfoByID',bbs.getBlockInfoByID)
router.get('/getTargetBlockPostNum',bbs.getTargetBlockPostNum)
router.get('/getPostFromBlock',bbs.getPostFromBlock)
module.exports = router;


// uni.$u.http.post("https://aip.baidubce.com/rest/2.0/solution/v1/text_censor/v2/user_defined?access_token=24.5ad0345de5d7b3092ded668b39d1bc15.2592000.1684510068.282335-32035516"
//     , { text: content }, { header: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' } }
// ).then(res => {
//     console.log(res)
//     let conclusion = res.data.conclusion
//     let message = null
//     if (conclusion === "合规") {
//         //若API判定内容通过，则用户所发帖会成功提交至数据库
//         this.model1.postInfo.is_pass = 1
//         this.sendPost(this.model1.postInfo.is_pass)
//     }



// //监听websocket连接
// io.on('connect',socket => {
//     console.log('捕获到一个连接')
// })
// //监听消息事件
// socket.on('msg',data => {
//     console.log(`msg from ${data.from}  to ${data.to}:${data.msg}`)
//     this.messages.push(data)
// })

// //将消息保存至数据库
// saveMessage(data.from,data.to,data.message)

// //发送消息给指定用户
// io.to(data.to).emit('msg',data)

// //断开监听 
// socket.on('disconnect',()=> {
//     console.log('连接断开')
// })