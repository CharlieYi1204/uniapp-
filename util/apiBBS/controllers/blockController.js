let config = require('../util/config')

//获取板块信息
getBlockInfo = (req,res) => {
    let sql = `select * from categories`
    let sqlArr = [];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
        } else {
            res.send({
                data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//获取板块大类信息 
getBlockFirst = (req,res) => {
    let sql = `select classify_name,classify from categories GROUP BY classify_name`
    let sqlArr = [];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
        } else {
            res.send({
                data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

module.exports = {
    getBlockInfo,
    getBlockFirst
}


//接口模板
// getLikesData = (req,res) => {
//     let {
//     } = req.query
//     let sql = ``
//     let sqlArr = [];
//     let callBack = (err,data) => {
//         if(err) {
//             console.log("连接出错了")
//         } else {
//             
//             res.send({
                
//             })
//         }
//     }
    // config.sqlConnect(sql,sqlArr,callBack)
// }