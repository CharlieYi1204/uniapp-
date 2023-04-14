var config = require('../util/config')
//向地图数据库中增加数据（用于存放四川省内所有地级市及其区县的code和name）
addMapData = (req,res) => {
    let {
        citycode,
        cityname,
        districtname,
        districrtcode
    } = req.body
    const sql = `insert into sichuan_map values (?,?,?,?)`
    const sqlArr = [
        citycode,
        cityname,
        districtname,
        districrtcode
    ]
    console.log(sqlArr)
    let callBack = (err,data) => {
        if(err){
            res.sendStatus(400)
        }
        else {
            res.send({
                scMapData: data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//获取四川省内所有行政区名称和adcode
getMapData = (req,res) => {
    const sql = `select * from sichuan_map`
    const sqlArr = []
    let callBack = (err,data) => {
        if(err){
            console.log("连接出错")
        }
        else {
            res.send({
                scMapData: data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//获取天府通卡/码支持市(区)
getCardSupport = (req,res) => {
    const sql = `select supportcity.citycode,cityname,supportcity.districtcode,districtname from sichuan_map,supportcity 
    where sichuan_map.citycode = supportcity.citycode AND sichuan_map.districtcode = supportcity.districtcode 
    ORDER BY citycode`
    const sqlArr = []
    let callBack = (err,data) => {
        if(err){
            res.send({msg:"数据获取失败"})
        }
        else {
            res.send({
                data:data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}
//根据adcode，获取区(县)区域卡/码支持的支付方式和具体优惠
getCardDiscount = (req,res) => {
    let {districtcode} = req.body
    const sql = `select * from card_payment where districtcode=?`
    const sqlArr = [
        districtcode
    ]
    let callBack = (err,data) => {
        if(err){
            res.send({msg:"数据获取失败"})
        }
        else {
            res.send({
                data:data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}
module.exports = {
    addMapData,
    getMapData,
    getCardSupport,
    getCardDiscount
}