// 引入multer中间件,实现文件上传
const multer = require('multer')
const fs = require('fs')
const path = require('path')


// 文件上传
upimg =async (req,res) => {
    let imgArr = []
   const promises = req.files.map((file) => {
        return new Promise(resolve => {
            if(!file) {
                return res.status(400).json({ message: '请上传文件' });
            }
             // 生成文件名，格式为日期+文件名
          const date = new Date();
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const filename = `${year}${month}${day}_${file.originalname}`;
          // 拼接文件路径
          const filepath = path.join('public/postimg', filename);
          // 将文件从临时目录移动到指定目录
          fs.rename(file.path, filepath, (err) => {
            if (err) {
              console.error(err);
              return reject({ message: '文件上传失败' });
            //   return res.status(500).json({ message: '文件上传失败' });
            }
            // 返回文件的 URL 地址
            // const url = `${req.protocol}://${req.get('host')}/${filepath}`;
             const url = `/${filepath}`;
            const url1 = url.replace("/public","")
            const url2 = url1.split('\\').join('/')
            console.log(url2)
            imgArr.push(url2)
            resolve();
          });
        })
    })
    try {
        await Promise.all(promises);
        res.send({
            "data":imgArr
        })
        console.log({"data":imgArr})
    } catch (err) {
        res.status(500)
    }
}
module.exports = {
    upimg
}