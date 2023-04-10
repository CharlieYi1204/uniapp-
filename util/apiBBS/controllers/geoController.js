
const fs = require('fs');
const path = require('path')

//获取省市的GeoJson数据文件
getGeo = (req,res) => {
    //获取请求参数中filename的值
    const fileName = req.query.filename
    //获取文件的扩展名
    const extName = path.extname(fileName)
    //判断文件是否为.json文件
    if(extName == extName) {
        console.log(fileName)
        //判断文件名中是否包含"省"字
        const endStr = fileName.indexOf('省') !== -1
        let filePath = null
        //如果文件名含省字，则文件路径为'/public/geoJson'，并根据省的名字查找文件
        if (endStr){
            filePath = path.join(path.dirname(__dirname) + '/public/geoJson' , fileName);
        }
        //如果不包含省，则目录到存放市级的json目录，则文件路径为'/public/geoJson/city'，并根据市的名字查找文件
        else{
            filePath = path.join(path.dirname(__dirname) + '/public/geoJson/city' , fileName);
        }
        //根据filePath读取文件内容
        const fileContent = fs.readFileSync(filePath)
        //返回读取到的相应省市的GeoJSON数据
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