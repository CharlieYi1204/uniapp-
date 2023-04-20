let config = require('../util/config')
let globalURL = require('../routes/global')
//获取所有帖子信息
getPostData = (req,res) => {
    let sql = "select * from posts order by create_time DESC"
    let sqlArr = [];
    let callBack = (err,data)=> {
        if(err) {
            console.log("连接出错了")
        } else {
            //处理data对象数组中的time属性和image属性
            let imgURl=globalURL.imgGlobalURL
            data.forEach(item => {
                item.image = item.image.split(",")
                // 将存储的地址加入服务器的绝对路径，后面存的时候直接存绝对路径，可以不要这个
                item.image.forEach((imgitem,itemIndex) => {
                    imgitem = `${imgURl}${imgitem}`
                    item.image[itemIndex] = imgitem
                })
                //处理对象
                let create_time = new Date(item.create_time)
                let updated_time = new Date(item.updated_time)
                item.create_time = `${create_time.getFullYear()}年${create_time.getMonth()+1}月${create_time.getDate()+1}日 ${create_time.getHours()}:${create_time.getMinutes()}`
                item.updated_time = `${updated_time.getFullYear()}年${updated_time.getMonth()+1}月${updated_time.getDate()+1}日 ${updated_time.getHours()}:${create_time.getMinutes()}`
            })
            console.log(data)
            res.send({
                'data':data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//根据帖子ID获取点赞消息 
getLikesData = (req,res) => {
    let {
        post_id
    } = req.query
    let sql = `SELECT count(user_id) AS likesNum FROM post_likes WHERE post_id = ? `
    let sqlArr = [post_id];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
        } else {
            console.log()
            res.send({
                'data':data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//获取当前用户点赞状态
getIsLikes = (req,res) => {
    let {
        post_id,user_id
    } = req.query
    let sql = `SELECT count(*) as isLike FROM post_likes WHERE post_id = ? AND user_id = ? `
    let sqlArr = [post_id,user_id];
   
    let callBack = (err,data) => {
        console.log(sqlArr)
        console.log(data)
        if(err) {
            console.log("连接出错了")
        } else {
            //若可以数据库中找到postid
            if(data[0].isLike) {
                data = true
            }
            else {
                data = false
            }
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

// // 新增点赞
// addLikes = (req,res) => {
//     let {
//         post_id,user_id
//     } = req.query
//     let sql = ``
//     let sqlArr = [post_id,user_id];
   
//     let callBack = (err,data) => {
//         console.log(sqlArr)
//         console.log(data)
//         if(err) {
//             console.log("连接出错了")
//         } else {
//             //若可以数据库中找到postid
//             if(data[0].isLike) {
//                 data = true
//             }
//             else {
//                 data = false
//             }
//             res.send(data)
//         }
//     }
//     config.sqlConnect(sql,sqlArr,callBack)
// }

//删除点赞
delLikes = (req,res) => {
    let {
        post_id,user_id
    } = req.query
    let sql = `delete from post_likes where post_id=? and user_id=?`
    let sqlArr = [post_id,user_id];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
        } else {
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//新增点赞
addLikes = (req,res) => {
    let {
        post_id,user_id
    } = req.query
    let sql = `insert into post_likes (user_id,post_id) values (?,?) `
    let sqlArr = [user_id,post_id];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了") 
            res.send(err)
        } else {
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

module.exports = {
    getPostData,
    getLikesData,
    getIsLikes,
    delLikes,
    addLikes,
}



//接口模板
// getLikesData = (req,res => {
//     let {
//     } = req.body
//     let sql = ``
//     let sqlArr = [];
//     let callBack = (err,data) => {
//         if(err) {
//             console.log("连接出错了")
//         } else {
//             console.log()
//             res.send({
                
//             })
//         }
//     }
// })