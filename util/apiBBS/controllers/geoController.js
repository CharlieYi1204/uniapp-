
const fs = require('fs');
const path = require('path')

//获取省市的GeoJson数据文件
getGeo = (req,res) => {
    //获取请求参数中的文件名
    const fileName = req.query.filename
    const extName = path.extname(fileName)
    if(extName == extName) {
        //获取文件的完整路径
        console.log(fileName)
        const endStr = fileName.indexOf('省') !== -1
        let filePath = null
        if (endStr){
            filePath = path.join(path.dirname(__dirname) + '/public/geoJson' , fileName);
        }
        else{
            filePath = path.join(path.dirname(__dirname) + '/public/geoJson/city' , fileName);
        }
        const fileContent = fs.readFileSync(filePath)
        res.send(fileContent)
        console.log(filePath)
    }
    else {
        res.status(400).send('Bad Request'); // 返回 400 错误码
    }
    
}
module.exports = {
    getGeo
}