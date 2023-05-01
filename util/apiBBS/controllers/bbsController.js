let config = require('../util/config')
let globalURL = require('../routes/global');

//获取所有帖子信息
getPostData = (req,res) => {
    let sql = "select * from posts where is_pass = 1 order by create_time DESC"
    let sqlArr = [];
    let callBack = (err,data)=> {
        if(err) {
            console.log("连接出错了")
            console.log(err)
        } else {
            //处理data对象数组中的time属性和image属性
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
                let time = create_time.getMinutes()
                let hours = create_time.getHours()
                if( hours < 10) {
                    hours = '0' + hours
                }
                if(time < 10) {
                    time = '0' + create_time.getMinutes()
                }
                item.create_time = `${create_time.getFullYear()}年${create_time.getMonth() + 1}月${create_time.getDate() + 1}日 ${hours}:${time}`
            })
            res.send({
                'data':data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//获取所有帖子信息，包括浏览量、点赞量、板块名称等信息
getPostDeatilData = (req,res) => {
    let sql = `select posts.* ,name,count(DISTINCT post_likes.user_id) as like_count,
    count(DISTINCT collect.user_id) as collect_count 
    FROM posts LEFT JOIN post_likes ON posts.id = post_likes.post_id LEFT JOIN collect ON posts.id = collect.post_id 
    LEFT JOIN categories ON posts.category_id = categories.id where is_pass = 1 GROUP BY posts.id order by posts.create_time DESC`
    let sqlArr = [];
    let callBack = (err,data)=> {
        if(err) {
            console.log("连接出错了")
            console.log(err)
        } else {
            //处理data对象数组中的time属性和image属性
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
                let time = create_time.getMinutes()
                let hours = create_time.getHours()
                if( hours < 10) {
                    hours = '0' + hours
                }
                if(time < 10) {
                    time = '0' + create_time.getMinutes()
                }
                item.create_time = `${create_time.getFullYear()}年${create_time.getMonth() + 1}月${create_time.getDate() + 1}日 ${hours}:${time}`
            })
            res.send({
                data:data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

// 获取所有帖子信息，包括浏览量、点赞量、板块名称等信息
getPostDeatilDataByBlock = (req,res) => {
    let {
        name
    } = req.body
    let sql = `select posts.* ,name,count(DISTINCT post_likes.user_id) as like_count,
    count(DISTINCT collect.user_id) as collect_count 
    FROM posts LEFT JOIN post_likes ON posts.id = post_likes.post_id LEFT JOIN collect ON posts.id = collect.post_id 
    LEFT JOIN categories ON posts.category_id = categories.id where is_pass = 1 and name = ? GROUP BY posts.id`
    let sqlArr = [name];
    let callBack = (err,data)=> {
        if(err) {
            console.log("连接出错了")
            console.log(err)
        } else {
            //处理data对象数组中的time属性和image属性
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
                let time = create_time.getMinutes()
                let hours = create_time.getHours()
                if( hours < 10) {
                    hours = '0' + hours
                }
                if(time < 10) {
                    time = '0' + create_time.getMinutes()
                }
                item.create_time = `${create_time.getFullYear()}年${create_time.getMonth() + 1}月${create_time.getDate() + 1}日 ${hours}:${time}`
            })
            res.send({
                data:data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//获取近15天的热门帖子
getHotPosts =  (req,res) => {
    let sql = "select * from posts where is_pass = 1 and create_time >= DATE_SUB(NOW(),INTERVAL 15 DAY) order by visit_count DESC"
    let sqlArr = [];
    let callBack = (err,data)=> {
        if(err) {
            console.log("连接出错了")
            console.log(err)
        } else {
            //处理data对象数组中的time属性和image属性
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
                let time = create_time.getMinutes()
                let hours = create_time.getHours()
                if( hours < 10) {
                    hours = '0' + hours
                }
                if(time < 10) {
                    time = '0' + create_time.getMinutes()
                }
                item.create_time = `${create_time.getFullYear()}年${create_time.getMonth() + 1}月${create_time.getDate() + 1}日 ${hours}:${time}`
            })
            res.send({
                'data':data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//获取待审核的帖子 
getCheckPost =(req,res) => {
    let {
    } = req.query
    let sql = `select * from posts where is_pass = 0 order by create_time desc`
    let sqlArr = [];
    let callBack = (err,data) => {
    // 处理data对象数组中的time属性和image属性
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
            let create_time = new Date(item.create_time)
            let updated_time = new Date(item.updated_time)
            item.create_time = `${create_time.getFullYear()}年${create_time.getMonth()+1}月${create_time.getDate()+1}日 ${create_time.getHours()}:${create_time.getMinutes()}`
            item.updated_time = `${updated_time.getFullYear()}年${updated_time.getMonth()+1}月${updated_time.getDate()+1}日 ${updated_time.getHours()}:${create_time.getMinutes()}`
        })

        if(err) {
            res.send(err)
            console.log("连接出错了")
        } else {
            res.send({
                "data":data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}


// 帖子审核通过 
checkPassPost =(req,res) => {
    let {
        user_id,post_id
    } = req.body
    let sql = `update posts set is_pass = 1,failed_reson = null where user_id = ? and id = ?`
    let sqlArr = [user_id,post_id];
    let callBack = (err,data) => {
        if(err) {
            res.send({err:err,
                msg:"审核出错"
            })
        } else {
            res.send({data:data,
                msg:"帖子审核通过，可正常展示"
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}


//获取精选帖子
getWonderfulPost = (req,res) => {
        let {
        } = req.query
        let sql = `select * from posts where is_wonderful = 1 and is_pass = 1`
        let sqlArr = [];
        let callBack = (err,data) => {
                        //处理data对象数组中的time属性和image属性
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
                }})
            if(err) {
                res.send(err)
                console.log("连接出错了")
            } else {
                res.send({
                    "data":data
                })
            }
        }
        config.sqlConnect(sql,sqlArr,callBack)
    }

// 根据帖子ID对其设置精选
setPostWonderful = (req,res) => {
    let {
        post_id
    } = req.body
    let sql = `update posts set is_wonderful = 1 where id = ?`
    let sqlArr = [post_id];
    let callBack = (err,data) => {
        if(err) {
            res.send({
                err:err,
                msg:"发生错误"
            })
        } else {
            res.send({
                data:data,
                msg:"已精选该贴"
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

// 根据帖子ID对其取消精选
cancelPostWonderful = (req,res) => {
    let {
        post_id
    } = req.body
    let sql = `update posts set is_wonderful = 0 where id = ?`
    let sqlArr = [post_id];
    let callBack = (err,data) => {
        if(err) {
            res.send({
                err:err,
                msg:"发生错误"
            })
        } else {
            res.send({
                data:data,
                msg:"已取消精选"
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//置顶该帖子
setPostTop = (req,res) => {
    let {
        post_id
    } = req.body
    let sql = `update posts set is_top = 1 where id = ?`
    let sqlArr = [post_id];
    let callBack = (err,data) => {
        if(err) {
            res.send({
                err:err,
                msg:"发生错误"
            })
        } else {
            res.send({
                data:data,
                msg:"已置顶该贴"
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//取消置顶该帖子
canclePostTop = (req,res) => {
    let {
        post_id
    } = req.body
    let sql = `update posts set is_top = 0 where id = ?`
    let sqlArr = [post_id];
    let callBack = (err,data) => {
        if(err) {
            res.send({
                err:err,
                msg:"发生错误"
            })
        } else {
            res.send({
                data:data,
                msg:"已取消置顶"
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//根据帖子ID删除该贴
deletePostByPostID = (req,res) => {
    let {
        post_id
    } = req.body
    let sql = `delete from posts where id = ?`
    let sqlArr = [post_id];
    let callBack = (err,data) => {
        if(err) {
            res.send({
                err:err,
                msg:"发生错误"
            })
        } else {
            res.send({
                data:data,
                msg:"已删除该贴"
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}



//根据帖子ID获取详情 
getTargetPostData = (req,res) => {
    let {
        post_id
    } = req.query
    let sql = `select * from posts where id = ? and is_pass = 1`
    let sqlArr = [post_id];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
            res.send(err)
        } else {
            let imgURl=globalURL.imgGlobalURL
            data.forEach(item => {
                if(item.image !== null) {
                    item.image = item.image.split(",")
                    // 将存储的地址加入服务器的绝对路径，后面存的时候直接存绝对路径，可以不要这个
                    item.image.forEach((imgitem,itemIndex) => {
                        imgitem = `${imgURl}${imgitem}`
                        item.image[itemIndex] = imgitem
                    })
                }
                //处理对象
                let create_time = new Date(item.create_time)
                let updated_time = new Date(item.updated_time)
                item.create_time = `${create_time.getFullYear()}年${create_time.getMonth()+1}月${create_time.getDate()+1}日 ${create_time.getHours()}:${create_time.getMinutes()}`
                item.updated_time = `${updated_time.getFullYear()}年${updated_time.getMonth()+1}月${updated_time.getDate()+1}日 ${updated_time.getHours()}:${create_time.getMinutes()}`
            })
            res.send({
                data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}


//根据帖子ID获取点赞消息的数量 
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
            res.send({
                'data':data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//根据用户ID获取帖子
getPostByUserID = (req,res) => {
        let {
            user_id
        } = req.query
        let sql = `select * from posts where user_id=? and is_pass = 1 order by create_time desc`
        let sqlArr = [user_id];
        let callBack = (err,data) => {
            if(err) {
                console.log("连接出错了")
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
                let updated_time = new Date(item.updated_time)
                item.create_time = `${create_time.getFullYear()}年${create_time.getMonth()+1}月${create_time.getDate()+1}日 ${create_time.getHours()}:${create_time.getMinutes()}`
                item.updated_time = `${updated_time.getFullYear()}年${updated_time.getMonth()+1}月${updated_time.getDate()+1}日 ${updated_time.getHours()}:${create_time.getMinutes()}`
            })
            
                res.send({
                    'data':data
                })
            }
        }
        config.sqlConnect(sql,sqlArr,callBack)
    }


//根据用户ID删除对应的帖子
deletePost = (req,res) => {
    let {
        post_id,user_id
    } = req.body
    let sql = `Delete from posts where id = ? and user_id = ?`
    let sqlArr = [post_id,user_id];
    let callBack = (err,data) => {
        if(err) {
            res.send(err)
            console.log("连接出错了")
        } else {
            if(data.affectedRows !== 0) {
                res.send({
                    "msg":"删除成功",
                    "data":data
                })
            }else {
                res.send({
                    "msg":"没有可删除的数据",
                })
            }
            
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

//获取对应用户所点赞的帖子
getLikesPostByUserID = (req,res) => {
    let {
       user_id
    } = req.query
    let sql = `select * from posts,post_likes WHERE post_likes.post_id = posts.id and post_likes.user_id = ? and is_pass = 1
    ORDER BY post_likes.created_time desc`
    let sqlArr = [user_id];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了") 
            res.send(err)
        } else {
            let imgURl = globalURL.imgGlobalURL
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
                let create_time = new Date(item.create_time)
                let time = create_time.getMinutes()
                let hours = create_time.getHours()
                if( hours < 10) {
                    hours = '0' + hours
                }
                if(time < 10) {
                    time = '0' + create_time.getMinutes()
                }
                item.create_time = `${create_time.getFullYear()}年${create_time.getMonth() + 1}月${create_time.getDate() + 1}日 ${hours}:${time}`
            })
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//根据用户ID获取，关注用户的信息
getFocusUerInfoByUserID =  (req,res) => {
    let {
        user_id
    } = req.body
    let sql = `select * from user where user_id IN (SELECT followed_id from follows where follower_id = ?) `
    let sqlArr = [user_id];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了") 
            res.send(err)
        } else {
              //处理data对象数组中的time属性和image属性
              let imgURl=globalURL.imgGlobalURL
              data.forEach(item => {
                  if(item.icon === "null" || item.icon === null) {
                      item.icon = null
                  } else {
                      item.icon = item.icon.split(",")
                      // 将存储的地址加入服务器的绝对路径，后面存的时候直接存绝对路径，可以不要这个
                      item.icon.forEach((imgitem,itemIndex) => {
                          imgitem = `${imgURl}${imgitem}`
                          item.icon[itemIndex] = imgitem
                      })
                  }})
            res.send({
                "data":data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}


//根据用户ID获取，关注粉丝的信息
getFansInfoByUserID = (req,res) => {
    let {
        user_id
    } = req.body
    let sql = `select * from user where user_id IN (SELECT follower_id from follows where followed_id = ?)`
    let sqlArr = [user_id];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了") 
            res.send(err)
        } else {
              //处理data对象数组中的time属性和image属性
              let imgURl=globalURL.imgGlobalURL
              data.forEach(item => {
                  if(item.icon === "null" || item.icon === null) {
                      item.icon = null
                  } else {
                      item.icon = item.icon.split(",")
                      // 将存储的地址加入服务器的绝对路径，后面存的时候直接存绝对路径，可以不要这个
                      item.icon.forEach((imgitem,itemIndex) => {
                          imgitem = `${imgURl}${imgitem}`
                          item.icon[itemIndex] = imgitem
                      })
                  }})
            res.send({
                "data":data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}



//获取关注数量
getFollowNum = (req,res) => {
        let { follower_id
        } = req.query
        let sql = `select count(*) as FollowNum  from follows where follower_id = ?`
        let sqlArr = [follower_id];
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

//获取粉丝数量
getFansNum = (req,res) => {
    let { followed_id
    } = req.query
    let sql = `select count(*) as FansNum from follows where followed_id = ?`
    let sqlArr = [followed_id];
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

//关注用户获取粉丝数量
getFansNum = (req,res) => {
    let { followed_id
    } = req.query
    let sql = `select count(*) as FansNum from follows where followed_id = ?`
    let sqlArr = [followed_id];
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

// 获取帖子浏览量
getVisitCount =(req,res) => {
    let {
        post_id
    } = req.query
    let sql = `select visit_count from posts where id = ?`
    let sqlArr = [post_id];
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


//帖子浏览量加1
addVisitCount =(req,res) => {
        let {
            post_id
        } = req.query
        let sql = `update posts set visit_count = visit_count +1 where id = ?`
        let sqlArr = [post_id];
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



//获取关注状态
getFollowState =(req,res) => {
    let {
        user_id,followed_id
    } = req.query
    let sql = `select * from follows where follower_id = ?`
    let sqlArr = [user_id];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
            res.send(err)
        } else {
          const isFollowed = data.filter(item => item.followed_id == followed_id)
          console.log(isFollowed)
          console.log(isFollowed.length)
          if(isFollowed.length > 0) {
            res.send(true)
          } else {
            res.send(false)
          }
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}


//关注用户
follows = (req,res) => {
    let {
        user_id,follow_id
    } = req.query
    let sql = `insert into follows values (?,?) `
    let sqlArr = [user_id,follow_id];
    let callBack = (err,data) => {
        if(err) {
            console.log(err)
            console.log("连接出错了")
            res.send(err)
        } else {
            if(data.affectedRows) {
                res.send("关注成功")
            }
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

// 取消关注
cancleFollow = (req,res) => {
        let {
            user_id,follow_id
        } = req.query
        let sql = `delete from follows where follower_id = ? and followed_id = ?`
        let sqlArr = [user_id,follow_id];
        let callBack = (err,data) => {
            if(err) {
                console.log("连接出错了")
            } else {
                res.send("已取消关注")
            }
        }
        config.sqlConnect(sql,sqlArr,callBack)
    }

//根据帖子ID获取其收藏量
getCollectByID = (req,res) => {
        let { 
            post_id
        } = req.query
        let sql = `select count(*) as collectNum from collect where post_id=?`
        let sqlArr = [post_id];
        let callBack = (err,data) => {
            if(err) {
                console.log("连接出错了")
            } else {
                res.send(data)
            }
        }
        config.sqlConnect(sql,sqlArr,callBack)
    }

//添加收藏
addCollect =  (req,res) => {
    let { 
        user_id,post_id
    } = req.body
    let sql = `insert into collect (user_id,post_id) values (?,?)`
    let sqlArr = [user_id,post_id];
    let callBack = (err,data) => {
        console.log(sqlArr)
        if(err) {
            console.log("连接出错了")
            res.send(err)
        } else {
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//取消收藏
cancelCollect =  (req,res) => {
    let { 
        user_id,post_id
    } = req.body
    let sql = `delete from collect where user_id =? and post_id = ?`
    let sqlArr = [user_id,post_id];
    let callBack = (err,data) => {
        console.log(sqlArr)
        if(err) {
            console.log("连接出错了")
            res.send(err)
        } else {
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//根据用户ID获取收藏帖子
getPostsByID =  (req,res) => {
    let { 
        user_id
    } = req.body
    let sql = `select * from posts where id IN (SELECT post_id from collect where user_id = ?)`
    let sqlArr = [user_id]
    let callBack = (err,data) => {
        if(err) {
            res.send(err)
            console.log("连接出错了")
        } else {
             //处理data对象数组中的time属性和image属性
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
                 let create_time = new Date(item.create_time)
                 let updated_time = new Date(item.updated_time)
                 item.create_time = `${create_time.getFullYear()}年${create_time.getMonth()+1}月${create_time.getDate()+1}日 ${create_time.getHours()}:${create_time.getMinutes()}`
                 item.updated_time = `${updated_time.getFullYear()}年${updated_time.getMonth()+1}月${updated_time.getDate()+1}日 ${updated_time.getHours()}:${create_time.getMinutes()}`
                })
            res.send({
                "data":data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}



//获取用户关注的状态
getCollectState = (req,res) => {
        let {
            user_id,post_id
        } = req.query
        let sql = `SELECT COUNT(*) as collectCount FROM collect WHERE user_id = ? and post_id = ?`
        let sqlArr = [user_id,post_id];
        let callBack = (err,data) => {
            if(err) {
                console.log("连接出错了")
                res.send(err)
            } else {
                if(data[0].collectCount)
                {
                    res.send(true)
                }else {
                    res.send(false)
                }
               
            }
        }
        config.sqlConnect(sql,sqlArr,callBack)
    }

//根据帖子ID获取评论条数
getCommentCountByPostID =  (req,res) => {
        let {
            post_id
        } = req.query
        let sql = `select count(*) as commentNum from comments where post_id = ?`
        let sqlArr = [post_id];
        let callBack = (err,data) => {
            if(err) {
                
                console.log("连接出错了")
            } else {
                res.send(data)
            }
        }
        config.sqlConnect(sql,sqlArr,callBack)
    }

//获取指定帖子的评论内容
getCommentData =  (req,res) => {
    let {
        post_id
    } = req.query
    let sql = `select * from comments where post_id = ?`
    let sqlArr = [post_id];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
            res.send(err)
        } else {
            data.forEach(item => {
                let create_time = new Date(item.create_time)
                let updated_time = new Date(item.updated_time)
                item.create_time = `${create_time.getFullYear()}年${create_time.getMonth()+1}月${create_time.getDate()+1}日 ${create_time.getHours()}:${create_time.getMinutes()}`
                item.updated_time = `${updated_time.getFullYear()}年${updated_time.getMonth()+1}月${updated_time.getDate()+1}日 ${updated_time.getHours()}:${create_time.getMinutes()}`
            })
            //parent_id属性不为null的评论，这些评论就是子评论
         const children = data.filter(comment => comment.parent_id !== null)
         //将每个子评论添加到对应的父评论中，遍历children数组，找到该子评论对应的父评论
         children.forEach(child => {
            const parent = data.find(comment => comment.id === child.parent_id)
            //返回parent后判断，如果能够找到父评论
            if(parent) {    
                //判断父评论中是否存在                
                if(!parent.children) {
                    parent.children = []
                }
                parent.children.push(child)
                // console.log(parent)
            }
         })
         const result = data.filter(comment => comment.parent_id === null)
         res.send(result)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//提交评论 
replyPost =  (req,res) => {
    let {
        post_id,user_id,content,parent_id
    } = req.body
    let sql = `insert into comments (user_id,post_id,parent_id,content) values (?,?,?,?)`
    let sqlArr = [user_id,post_id,parent_id,content];
    let callBack = (err,data) => {
        console.log(sqlArr)
        if(err) {
            console.log("连接出错了")
            res.send(err)
        } else {
           
            res.send({
                "data":data
            })
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//删除评论
deleteComment= (req,res) => {
    let {
       comment_id
    } = req.body
    console.log(req.body)
    let sql = `delete from comments where id = ?`
    let sqlArr = [comment_id];
    let callBack = (err,data) => {
        if(err) {
            res.send(err)
            console.log("连接出错了")
        } else {
            
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//发布新帖
sendPost = (req,res) => {
    let {
        user_id,
        category_id,
        title,
        content,
        is_pass,
        image
    } = req.body
    console.log(req.body)
    let sql = `insert into posts (user_id,category_id,title,content,is_pass,image) values (?,?,?,?,?,?)`
    let sqlArr = [user_id,
        category_id,
        title,
        content,
        is_pass,
        image];
    let callBack = (err,data) => {
        if(err) {
            res.send(err)
            console.log("连接出错了")
        } else {
            
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//获取该用户已发帖子条数
getPostNumByUserID = (req,res) => {
        let {
            user_id
        } = req.body
        let sql = `select count(*) as post_num from posts where user_id = ?`
        let sqlArr = [user_id];
        console.log(sql)
        console.log(sqlArr)
        let callBack = (err,data) => {
            if(err) {
                res.send(err)
                console.log("连接出错了")
            } else {
                res.send(data)
            }
        }
        config.sqlConnect(sql,sqlArr,callBack)
    }

////获取该用户已收藏帖子条数
getCollectNumByUserID = (req,res) => {
    let {
        user_id
    } = req.body
    let sql = `select count(*) as collect_num from collect where user_id = ?`
    let sqlArr = [user_id];
    console.log(sql)
    console.log(sqlArr)
    let callBack = (err,data) => {
        if(err) {
            res.send(err)
            console.log("连接出错了")
        } else {
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//获取该用户关注数量
getFollowNumByUserID = (req,res) => {
    let {
        user_id
    } = req.body
    let sql = `select count(*) as follow_num from follows where follower_id = ?`
    let sqlArr = [user_id];
    console.log(sql)
    console.log(sqlArr)
    let callBack = (err,data) => {
        if(err) {
            res.send(err)
            console.log("连接出错了")
        } else {
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}


//获取该用户的粉丝数量 
getFansNumByUserID = (req,res) => {
    let {
        user_id
    } = req.body
    let sql = `select count(*) as fans_num from follows where followed_id = ?`
    let sqlArr = [user_id];
    console.log(sql)
    console.log(sqlArr)
    let callBack = (err,data) => {
        if(err) {
            res.send(err)
            console.log("连接出错了")
        } else {
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//搜索帖子
searchPost = (req,res) => {
    let {
        keywords
    } = req.body
    let sql = `select * from posts where title like ? or content like ?`
    let sqlArr = [`%${keywords}%`,`%${keywords}%`];

    console.log(sql)
    console.log(sqlArr)
    let callBack = (err,data) => {
        if(err) {
            res.send(err)
            console.log("连接出错了")
        } else {
            //处理data对象数组中的time属性和image属性
            let imgURl = globalURL.imgGlobalURL
            data.forEach(item => {
                if (item.image === "null" || item.image === null) {
                    item.image = null
                } else {
                    item.image = item.image.split(",")
                    // 将存储的地址加入服务器的绝对路径，后面存的时候直接存绝对路径，可以不要这个
                    item.image.forEach((imgitem, itemIndex) => {
                        imgitem = `${imgURl}${imgitem}`
                        item.image[itemIndex] = imgitem
                    })
                }
                //处理对象
                let create_time = new Date(item.create_time)
                item.create_time = `${create_time.getFullYear()}年${create_time.getMonth() + 1}月${create_time.getDate() + 1}日 ${create_time.getHours()}:${create_time.getMinutes()}`
            })
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//获取指定用户ID的已评论条数，包括评论内容、所评论帖子的标题内容、评论时间等信息
getCommentByUserID = (req,res) => {
        let {
            user_id
        } = req.query
        let sql = `select comments.id AS commment_id,post_id,comments.content AS comment_content,posts.create_time,title,posts.content AS post_content,posts.id AS post_id
        from posts,comments 
        WHERE posts.id = comments.post_id and comments.user_id = ? order by comments.create_time DESC`
        let sqlArr = [user_id];
        let callBack = (err,data) => {
            if(err) {
                console.log("连接出错了")
                console.log(err)
            } else {
                data.forEach(item => {
                    let create_time = new Date(item.create_time)
                    let time = create_time.getMinutes()
                    let hours = create_time.getHours()
                    if( hours < 10) {
                        hours = '0' + hours
                    }
                    if(time < 10) {
                        time = '0' + create_time.getMinutes()
                    }
                    item.create_time = `${create_time.getFullYear()}年${create_time.getMonth() + 1}月${create_time.getDate() + 1}日 ${hours}:${time}`
                })
                res.send(data)
            }
        }
        config.sqlConnect(sql,sqlArr,callBack)
    }

//获取所有二级板块信息
getAllBlock =  (req,res) => {
    let {
    } = req.query
    let sql = `select * from categories`
    let sqlArr = [];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
            console.log(err)
        } else {
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//获取板块大类类别
getClassify = (req,res) => {
    let {
    } = req.query
    let sql = `select classify,classify_name from categories GROUP BY classify`
    let sqlArr = [];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
            console.log(err)
        } else {
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//获取指定分类中的板块名称和ID
getBlockName = (req,res) => {
    let {
        classifyID
    } = req.query
    let sql = `select name,id from categories where classify = ?`
    let sqlArr = [classifyID];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
            console.log(err)
        } else {
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//获取所有板块中的帖子数量
getBlockPostNum = (req,res) => {
    let {
    } = req.query
    let sql = `select category_id,count(*) as post_num from posts GROUP BY category_id`
    let sqlArr = [];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
            console.log(err)
        } else {
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

// 获取指定板块的发帖数量
getTargetBlockPostNum = (req,res) => {
    let {
        block_id
    } = req.query
    let sql = `select count(*) as post_num from posts where category_id = ?`
    let sqlArr = [block_id];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
            console.log(err)
        } else {
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}


// 获取热门板块
getHotBlock = (req,res) => {
    let {
    } = req.query
    let sql = `select * from categories where is_top = 1`
    let sqlArr = [];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
            console.log(err)
        } else {
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//获取指定板块的POST帖子信息
getPostByBlock = (req,res) => {
    let {
        block_id
    } = req.query
    let sql = `select * from posts where category_id = ? and is_pass = 1 order by create_time DESC`
    let sqlArr = [block_id];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
            console.log(err)
        } else {
            let imgURl = globalURL.imgGlobalURL
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
                let create_time = new Date(item.create_time)
                let time = create_time.getMinutes()
                let hours = create_time.getHours()
                if( hours < 10) {
                    hours = '0' + hours
                }
                if(time < 10) {
                    time = '0' + create_time.getMinutes()
                }
                item.create_time = `${create_time.getFullYear()}年${create_time.getMonth() + 1}月${create_time.getDate() + 1}日 ${hours}:${time}`
            })
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//获取指定板块的信息
getBlockInfoByID = (req,res) => {
    let {
        block_id
    } = req.query
    let sql = `select * from categories where id=?`
    let sqlArr = [block_id];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
            console.log(err)
        } else {
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//获取指定帖子的所属板块
getPostFromBlock = (req,res) => {
    let {
        post_id
    } = req.query
    let sql = `select name,category_id from categories,posts where categories.id = posts.category_id and posts.id = ?`
    let sqlArr = [post_id];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
            console.log(err)
        } else {
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}


//插入浏览记录
addVisit = (req,res) => {
    let {
        user_id,post_id
    } = req.body
    let sql = `insert into visit_history VALUES (?,?,CURRENT_TIMESTAMP) ON DUPLICATE KEY UPDATE visited_time = CURRENT_TIMESTAMP`
    let sqlArr = [user_id,post_id];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
            console.log(err)
        } else {
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//获取指定ID用户的浏览历史记录
getVisitByUserID = (req,res) => {
    let {
        user_id
    } = req.query
    let sql = `select * from visit_history,posts where visit_history.user_id = ? and visit_history.post_id = posts.id ORDER BY visited_time desc`
    let sqlArr = [user_id];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
            console.log(err)
        } else {
            let imgURl = globalURL.imgGlobalURL
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
                let visited_time = new Date(item.visited_time)
                let time = visited_time.getMinutes()
                let hours = visited_time.getHours()
                if( hours < 10) {
                    hours = '0' + hours
                }
                if(time < 10) {
                    time = '0' + visited_time.getMinutes()
                }
                item.visited_time = `${visited_time.getFullYear()}年${visited_time.getMonth() + 1}月${visited_time.getDate() + 1}日 ${hours}:${time}`
            })
            res.send(data)
        }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//清除指定用户ID的浏览记录
clearVisit = (req,res) => {
    let {
        user_id
    } = req.query
    let sql = `delete from visit_history where user_id = ?`
    let sqlArr = [user_id];
    let callBack = (err,data) => {
        if(err) {
            console.log("连接出错了")
            console.log(err)
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
    getTargetPostData,
    getFollowNum,
    getFansNum,
    getPostByUserID,
    follows,
    getFollowState,
    cancleFollow,
    getVisitCount,
    addVisitCount,
    getCollectByID,
    addCollect,
    cancelCollect,
    getCollectState,
    getCommentCountByPostID,
    getCommentData,
    sendPost,
    getWonderfulPost,
    deletePost,
    getPostsByID,
    getFocusUerInfoByUserID,
    getFansInfoByUserID,
    getPostNumByUserID,
    getCollectNumByUserID,
    getFollowNumByUserID,
    getFansNumByUserID,
    getCheckPost,
    replyPost,
    deleteComment,
    searchPost,
    getCommentByUserID,
    getClassify,
    getBlockName,
    getBlockPostNum,
    getHotBlock,
    getPostByBlock,
    getBlockInfoByID,
    getTargetBlockPostNum,
    getPostFromBlock,
    getAllBlock,
    getHotPosts,
    getLikesPostByUserID,
    addVisit,
    getVisitByUserID,
    clearVisit,
    checkPassPost,
    getPostDeatilData,
    getPostDeatilDataByBlock,
    deletePostByPostID,
    canclePostTop,
    setPostTop,
    cancelPostWonderful,
    setPostWonderful
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