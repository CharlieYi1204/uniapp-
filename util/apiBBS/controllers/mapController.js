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
    let {districtcode} = req.query
    const sql = `select * from card_payment where districtcode=?`
    const sqlArr = [
        districtcode
    ]
    let callBack = (err,data) => {
        if(err){
            res.send({msg:"数据获取失败"})
        }
        else {
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//获取卡/码支持的所有信息
getCardInfo = (req,res) => {
    let {} = req.query
    const sql = `select sichuan_map.cityname,supportcity.citycode,sichuan_map.districtname,supportcity.districtcode from supportcity,sichuan_map WHERE sichuan_map.citycode = supportcity.citycode and sichuan_map.districtcode = supportcity.districtcode`
    const sqlArr = [
        
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

//删除卡/码支持城市
deleteSupportDelete = (req,res) => {
    let {code} = req.body
    const sql = `delete from supportcity where districtcode = ?`
    const sqlArr = [
        code
    ]
    let callBack = (err,data) => {
        if(err){
            res.send({msg:"失败"})
        }
        else {
            res.send({
                msg:"删除成功",
                data:data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

// 新增支持城市
addSupportCity = (req,res) => {
    let {citycode,discode} = req.body
    const sql = `insert into supportcity values (?,?)`
    const sqlArr = [
        citycode,discode
    ]
    let callBack = (err,data) => {
        if(err){
            res.send('添加失败，已存在该区域')
        }
        else {
            res.send('添加成功')
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//区域范围优惠新增  
addSupportInfo = (req,res) => {
    let {districtcode,
    method_card,
    card_discount,
    method_nfc,
    nfc_discount,
    method_qr,
    qr_discount,
    unit
    } = req.body
    const sql = `insert into card_payment values (?,?,?,?,?,?,?,?)`
    const sqlArr = [
        districtcode,
    method_card,
    card_discount,
    method_nfc,
    nfc_discount,
    method_qr,
    qr_discount,
    unit
    ]
    let callBack = (err,data) => {
        if(err){
            res.send({
                data:err,
                msg:"提交失败"
            })
        }
        else {
            res.send({
                data:data,
                msg:"提交成功"
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}


//区域范围优惠修改
editSupportInfo = (req,res) => {
    let {
    method_card,
    card_discount,
    method_nfc,
    nfc_discount,
    method_qr,
    qr_discount,
    unit,
    districtcode
    } = req.body
    const sql = `update card_payment set method_card=?,card_discount=?,
    method_nfc=?,nfc_discount=?,
    method_qr=?,qr_discount=?,
    unit=? where districtcode=? `
    const sqlArr = [
    method_card,
    card_discount,
    method_nfc,
    nfc_discount,
    method_qr,
    qr_discount,
    unit,
    districtcode
    ]
    let callBack = (err,data) => {
        if(err){
            res.send({
                data:err,
                msg:"提交失败"
            })
        }
        else {
            res.send({
                data:data,
                msg:"提交成功"
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}


module.exports = {
    addMapData,
    getMapData,
    getCardSupport,
    getCardDiscount,
    getCardInfo,
    deleteSupportDelete,
    addSupportCity,
    editSupportInfo,
    addSupportInfo
}