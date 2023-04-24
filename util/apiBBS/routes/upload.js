var express = require('express');
var router = express.Router();
var upload = require('../controllers/upLoadController')
const multer = require('multer');
const path = require('path')
const uploaddir = multer({dest: 'public/multertmp',fileFilter: (req,file,callback)=> {
    const mimeType = file.mimetype;
    //正则表达式
    const fileTypes = /jpeg|jpg|png|gif/;
    //使用test方法通过获取文件扩展名、并将其转换为小写，然后通过text方法与filetype的正则表达式进行匹配
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const isMimeTypeMatched = fileTypes.test(mimeType);
    if (extname && isMimeTypeMatched) {
      callback(null, true);
    } else {
      callback(new Error('仅限上传图片文件'));
    }
}}

)

router.post("/upimg",uploaddir.array('image',9),upload.upimg)

module.exports = router;