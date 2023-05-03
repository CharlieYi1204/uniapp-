let config = require('../util/config')

//获取板块信息
getBlockInfo = (req,res) => {
    let sql = `select * from categories where name is not null`
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

// 更改大类的名称 
changeBlockName = (req,res) => {
    let {
        classify,
        classify_name
    } = req.body
    let sql = `update categories set classify_name = ? where classify = ?`
    let sqlArr = [classify_name,classify];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
        } else {
            res.send({data:data,
            msg:"修改名称成功"})
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//添加block大类
 addBlock = (req,res) => {
    let {
        classify,
        classify_name
    } = req.body
    let sql = `insert into categories (classify,classify_name) values (?,?)  `
    let sqlArr = [classify,classify_name];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
        } else {
            res.send({data:data,
            msg:"添加板块成功"})
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//删除blocl大类 
deleteBlock = (req,res) => {
    let {
        classify
    } = req.body
    let sql = `delete from categories where classify = ?`
    let sqlArr = [classify];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
        } else {
            res.send({data:data,
            msg:"已删除该类别"})
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//添加板块详情
addBlockDetail = (req,res) => {
    let {
        classify,
        classify_name,
        name,
        description
    } = req.body
    let sql = `insert into categories (classify,classify_name,name,description) values (?,?,?,?)`
    let sqlArr = [classify,
        classify_name,
        name,
        description];
    let callBack = (err,data) => {
        if(err) {
            res.send({
                data:err
            })
            console.log("连接出错了")
        } else {
            res.send({data:data,
            msg:"板块添加成功"})
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}


//删除blocl大类 
deleteBlockDeatil = (req,res) => {
    let {
        id
    } = req.body
    let sql = `delete from categories where id = ?`
    let sqlArr = [id];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
        } else {
            res.send({data:data,
            msg:"已删除该板块"})
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//更新block 
updateBlockDeatil = (req,res) => {
    let {
        id,
        classify,
        classify_name,
        name,
        description
    } = req.body
    let sql = `update categories set classify=?,classify_name=?,name=?,description=? where id =?`
    let sqlArr = [classify,
        classify_name,
        name,
        description,id];
    let callBack = (err,data) => {
        if(err) {
            res.send(err)
            console.log("连接出错了")
        } else {
            res.send({data:data,
            msg:"已更新该板块信息"})
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

// 置顶板块
setBlockTop = (req,res) => {
    let {
        id,
    } = req.body
    let sql = `update categories set is_top = 1 where id =?`
    let sqlArr = [id];
    let callBack = (err,data) => {
        if(err) {
            res.send(err)
            console.log("连接出错了")
        } else {
            res.send({data:data,
            msg:"该板块已设为热门"})
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

// 取消置顶板块
cancelBlockTop = (req,res) => {
    let {
        id,
    } = req.body
    let sql = `update categories set is_top = 0 where id =?`
    let sqlArr = [id];
    let callBack = (err,data) => {
        if(err) {
            res.send(err)
            console.log("连接出错了")
        } else {
            res.send({data:data,
            msg:"已取消置顶"})
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

module.exports = {
    getBlockInfo,
    getBlockFirst,
    changeBlockName,
    addBlock,
    deleteBlock,
    addBlockDetail,
    deleteBlockDeatil,
    updateBlockDeatil,
    setBlockTop,
    cancelBlockTop
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