let globalURL = require('../routes/global');
let config = require('../util/config')


//获取所有公告信息
getNotice = (req,res) => {
    let {
    } = req.query
    let sql = `select * from notice order by create_time desc`
    let sqlArr = [];
    let callBack = (err,data) => {
        if(err) {
            res.send("连接出错")
        } else {
            let imgURl=globalURL.imgGlobalURL
            data.forEach(item => {
                if(item.image === "null" || item.image === null) {
                    item.image = null
                } else {
                    item.image = item.image.split(",")
                    // 将存储的地址加入服务器的绝对路径，后面存的时候直接存绝对路径，可以不要这个
                    item.image.forEach((imgitem,itemIndex) => {
                        imgitem = `${imgURl}${imgitem}`
                        item.image[itemIndex] = imgitem
                    })
                }
                //处理对象
                let create_time = new Date(item.create_time)
                item.create_time = `${create_time.getFullYear()}年${create_time.getMonth() + 1}月${create_time.getDate() + 1}日`
            })
                res.send({
                data:data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

// 根据帖子ID获取数据
getNoticeByID = (req,res) => {
    let {
        notice_id 
    } = req.query
    let sql = `select * from notice where id = ? order by create_time desc`
    let sqlArr = [notice_id];
    let callBack = (err,data) => {
        if(err) {
            res.send("连接出错")
        } else {
            let imgURl=globalURL.imgGlobalURL
            data.forEach(item => {
                if(item.image === "null" || item.image === null) {
                    item.image = null
                } else {
                    item.image = item.image.split(",")
                    // 将存储的地址加入服务器的绝对路径，后面存的时候直接存绝对路径，可以不要这个
                    item.image.forEach((imgitem,itemIndex) => {
                        imgitem = `${imgURl}${imgitem}`
                        item.image[itemIndex] = imgitem
                    })
                }
                //处理对象
                let create_time = new Date(item.create_time)
                item.create_time = `${create_time.getFullYear()}年${create_time.getMonth() + 1}月${create_time.getDate() + 1}日`
            })
                res.send({
                data:data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

// 根据公告ID获取数据
getNoticeByID = (req,res) => {
    let {
        notice_id 
    } = req.query
    let sql = `select * from notice where id = ? order by create_time desc`
    let sqlArr = [notice_id];
    let callBack = (err,data) => {
        if(err) {
            res.send("连接出错")
        } else {
            let imgURl=globalURL.imgGlobalURL
            data.forEach(item => {
                if(item.image === "null" || item.image === null) {
                    item.image = null
                } else {
                    item.image = item.image.split(",")
                    // 将存储的地址加入服务器的绝对路径，后面存的时候直接存绝对路径，可以不要这个
                    item.image.forEach((imgitem,itemIndex) => {
                        imgitem = `${imgURl}${imgitem}`
                        item.image[itemIndex] = imgitem
                    })
                }
                //处理对象
                let create_time = new Date(item.create_time)
                item.create_time = `${create_time.getFullYear()}年${create_time.getMonth() + 1}月${create_time.getDate() + 1}日`
            })
                res.send({
                data:data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}


//  获取置顶的公告
getTopNotice = (req,res) => {
    let {
    } = req.query
    let sql = `select * from notice where is_top = 1 order by create_time desc`
    let sqlArr = [];
    let callBack = (err,data) => {
        if(err) {
            res.send("连接出错")
        } else {
            let imgURl=globalURL.imgGlobalURL
            data.forEach(item => {
                if(item.image === "null" || item.image === null) {
                    item.image = null
                } else {
                    item.image = item.image.split(",")
                    // 将存储的地址加入服务器的绝对路径，后面存的时候直接存绝对路径，可以不要这个
                    item.image.forEach((imgitem,itemIndex) => {
                        imgitem = `${imgURl}${imgitem}`
                        item.image[itemIndex] = imgitem
                    })
                }
                //处理对象
                let create_time = new Date(item.create_time)
                item.create_time = `${create_time.getFullYear()}年${create_time.getMonth() + 1}月${create_time.getDate() + 1}日`
            })
                res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//添加公告
addNotice = (req,res) => {
    let {
        title,
        content,
        image
    } = req.body
    let sql = `insert into notice (title,content,image) values (?,?,?)`
    let sqlArr = [ title,
        content,
        image];
    let callBack = (err,data) => {
        if(err) {
            res.send({
                data:err,
                msg:"添加失败"
            })
        } else {
            res.send({
                data:data,
                msg:"添加成功"
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

// 删除公告
delNotice = (req,res) => {
    let {
        id
    } = req.body
    let sql = `delete from notice where id = ?`
    let sqlArr = [ id];
    let callBack = (err,data) => {
        if(err) {
            res.send({
                data:err,
                msg:"删除失败"
            })
        } else {
            res.send({
                data:data,
                msg:"删除成功"
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

// 更新公告
updateNotice = (req,res) => {
    let {
        id,
        title,
        content,
        image
    } = req.body
    let sql = `update notice set title=?,content=?,image=? where id =?`
    let sqlArr = [
        title,
        content,
        image,
        id];
    let callBack = (err,data) => {
        if(err) {
            res.send({
                data:err,
                msg:"更新信息失败"
            })
        } else {
            res.send({
                data:data,
                msg:"更新信息成功"
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

// 置顶公告
setTopNotice = (req,res) => {
    let {
        id
    } = req.body
    let sql = `update notice set is_top = 1 where id =?`
    let sqlArr = [id];
    let callBack = (err,data) => {
        if(err) {
            res.send({
                data:err,
                msg:"公告置顶失败" 
            })
        } else {
            res.send({
                data:data,
                msg:"公告置顶成功"
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

// 取消置顶公告
cancelTopNotice = (req,res) => {
    let {
        id
    } = req.body
    let sql = `update notice set is_top = 0 where id =?`
    let sqlArr = [id];
    let callBack = (err,data) => {
        if(err) {
            res.send({
                data:err,
                msg:"取消置顶失败" 
            })
        } else {
            res.send({
                data:data,
                msg:"取消置顶成功"
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

module.exports = {
    getNotice,
    getNoticeByID,
    getTopNotice,
    addNotice,
    delNotice,
    updateNotice,
    setTopNotice,
    cancelTopNotice
}