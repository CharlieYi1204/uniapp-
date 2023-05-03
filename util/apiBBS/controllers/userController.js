let config = require('../util/config')
let globalURL = require('../routes/global');
//引入 jsonwebtoken以用来验证用户登录状态
const jwt = require('jsonwebtoken');


  // //处理data对象数组中的time属性和image属性
  // let imgURl=globalURL.imgGlobalURL
  // data.forEach(item => {
  //     if(item.image === "null" || item.image === null) {
  //         item.image = null
  //     } else {
  //         item.image = item.image.split(",")
  //         // 将存储的地址加入服务器的绝对路径，后面存的时候直接存绝对路径，可以不要这个
  //         item.image.forEach((imgitem,itemIndex) => {
  //             imgitem = `${imgURl}${imgitem}`
  //             item.image[itemIndex] = imgitem
  //         })
  //     }
  //     let create_time = new Date(item.create_time)
  //     let updated_time = new Date(item.updated_time)
  //     item.create_time = `${create_time.getFullYear()}年${create_time.getMonth()+1}月${create_time.getDate()+1}日 ${create_time.getHours()}:${create_time.getMinutes()}`
  //     item.updated_time = `${updated_time.getFullYear()}年${updated_time.getMonth()+1}月${updated_time.getDate()+1}日 ${updated_time.getHours()}:${create_time.getMinutes()}`
  //    })

//获取所有用户信息
getUser = (req,res)=> {
  let sql = "select * from user";
  let sqlArr = [];
  let callBack = (err,data)=> {
    if(err){
      console.log('连接出错了')
    }else{
      let imgURl = globalURL.imgGlobalURL
      data.forEach(item => {
        if (item.icon === "null" || item.icon === null) {
          item.icon = null
        } else {
          item.icon = item.icon.split(",")
          // 将存储的地址加入服务器的绝对路径，后面存的时候直接存绝对路径，可以不要这个
          item.icon.forEach((imgitem, itemIndex) => {
            imgitem = `${imgURl}${imgitem}`
            item.icon[itemIndex] = imgitem
          })
        }
      })
      res.send({
        'list':data
      })
    }
  }
  config.sqlConnect(sql,sqlArr,callBack)
}


//获取指定user_id用户信息
getIDTargetUser = (req,res)=> {
  let {user_id} = req.query;
  let sql = `select * from user where user_id=?`
  let sqlArr = [user_id];
  let callBack = (err,data) => {
    if (err) {
      console.log("连接出错了",err)
    } else {
      let imgURl = globalURL.imgGlobalURL
      data.forEach(item => {
        if (item.icon === "null" || item.icon === null) {
          item.icon = null
        } else {
          item.icon = item.icon.split(",")
          // 将存储的地址加入服务器的绝对路径，后面存的时候直接存绝对路径，可以不要这个
          item.icon.forEach((imgitem, itemIndex) => {
            imgitem = `${imgURl}${imgitem}`
            item.icon[itemIndex] = imgitem
          })
        }
      })
      res.send({
        'data':data
      })
    }
  }
  config.sqlConnect(sql,sqlArr,callBack)
}

//修改用户信息
updateUserInfo =  (req,res)=> {
  let {nickname,gender,signature,icon,user_id} = req.body;
  let sql = `update user set nickname=?,gender=?,signature=?,icon=? where user_id=?`
  let sqlArr = [nickname,gender,signature,icon,user_id];
  console.log(sql)
  console.log(sqlArr)
  let callBack = (err,data) => {
    if (err) {
      console.log("连接出错了")
    } else {
      res.send({
        "message":"修改成功",
          "data":data
      })
    }
  }
  config.sqlConnect(sql,sqlArr,callBack)
}

//后台修改用户信息
updateUserInfoAdmin =  (req,res)=> {
  let {nickname,gender,signature,user_id,rule_break_count} = req.body;
  let sql = `update user set nickname=?,gender=?,signature=?,rule_break_count=? where user_id=?`
  let sqlArr = [nickname,gender,signature,rule_break_count,user_id];
  console.log(sql)
  console.log(sqlArr)
  let callBack = (err,data) => {
    if (err) {
      console.log("连接出错了")
    } else {
      res.send({
        "message":"修改成功",
          "data":data
      })
    }
  }
  config.sqlConnect(sql,sqlArr,callBack)
}

//获取指定用户信息
getTargetUser = (req,res)=> {
  let {username} = req.query;
  let sql = `select * from user where user_name=?`
  let sqlArr = [username];
  let callBack = (err,data) => {
    if (err) {
      console.log("连接出错了")
    } else {
      console.log(req.query)
      console.log(sqlArr)
      res.send({
        'list': data
      })
    }
  }
  config.sqlConnect(sql,sqlArr,callBack)
}

//根据用户ID获取用户信息 get请求
getUserInfoByUserID = (req,res) => {
  let {
    user_id
  } = req.query
  let sql = `select * from user where user_id = ?`
  let sqlArr = [user_id]
  let callBack = (err,data) => {
    if(err) {
        console.log("连接出错")
        console.log(err)
    }else {
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

//获取用户名
getUserName = (req,res) => {
  let {
    name
  } = req.query
  let sql = `select user_name from user where user_name=?`
  let sqlArr = [name]
  let callBack = (err,data) => {
    if(data.length > 0 ) {
      res.send({
        'msg': true
      })
    }else {
      res.send({
        'msg': false
      })
    }
  }
  config.sqlConnect(sql,sqlArr,callBack)
}



//用户注册
userRegister = (req,res) => {
  let  {
    username,
    nickname,
    password,
    gender
  } = req.body
  const sql = `insert into user (user_name,nickname,password,gender) values (?,?,?,?)`
  const sqlArr = [username,
    nickname,
    password,
    gender];
    let callBack = (err,data) => {
      if (err) {
        console.log(err)
        res.send({
          msg :"注册失败"
        })
      } else {
        res.send({
          msg :"注册成功"
        })
      }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//用户登录
userLogin = (req,res) => {
  let {
    username
    ,password
  } = req.body
  let sql = `select * from user where user_name=?`
  let sqlArr = [username,password]
  let callBack = (err,data) => {
    if (data.length == 0) {
      res.json({ code: 401, message: '用户名不存在，请先注册'});
    }
    else if (data[0].password == password){
      //若用户名和密码正确则登录成功
      //生成token，token中保存了当前用户的用户名和密码
      const secretKey = 'secret'
      const tokenData = data[0]
      console.log({tokenData})
      let token = jwt.sign({tokenData} ,secretKey,{ expiresIn: '3h' })
      //返回token给客户端
      res.json({ code: 200, message: '登录成功', token });
    } else {
      res.json({ code: 401, message: '账户密码错误'});
    }
  }
  config.sqlConnect(sql,sqlArr,callBack)
}

//验证token，获取登录信息
verifyToken = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    //验证token
    jwt.verify(token, 'secret', (err, user) => {
      if (err) {
        return res.json({ code: 403, message: '登录信息已过期' });
      }
      res.json({ code: 200, message: '获取用户信息成功', user });
    });
  }
  else {
    res.sendStatus(401);
  }
}

//设置用户封禁状态
changUserBanned = (req,res) => {
  let {
    user_id,banned
  } = req.body
  const sql = `update user set is_banned = ? where user_id = ?`
  const sqlArr = [ banned,user_id];
    let callBack = (err,data) => {
      if (err) {
        console.log(err)
        res.send({
          msg :"更新失败"
        })
      } else {
        if(banned === 1){
          res.send({
            msg :"已封禁用户",
            data:data
          })
        } else {
          res.send({
            msg :"用户解封成功",
            data:data
          })
        }
      }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

//搜索用户
searchUser = (req,res) => {
  let {
    keywords
  } = req.query
  const sql = `select user_id,user_name,nickname,signature,gender,icon from user where user_id like ? or user_name like ? or nickname like ?`
  const sqlArr = [`%${keywords}%`,`%${keywords}%`,`%${keywords}%`];
  console.log(sqlArr)
    let callBack = (err,data) => {
      if (err) {
        console.log(err)
        res.send({
          msg :"检索失败"
        })
      } else {
        let imgURl = globalURL.imgGlobalURL
        data.forEach(item => {
          if (item.icon === "null" || item.icon === null) {
            item.icon = null
          } else {
            item.icon = item.icon.split(",")
            // 将存储的地址加入服务器的绝对路径，后面存的时候直接存绝对路径，可以不要这个
            item.icon.forEach((imgitem, itemIndex) => {
              imgitem = `${imgURl}${imgitem}`
              item.icon[itemIndex] = imgitem
            })
          }
        })
        res.send(data)
      }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

// 使用户违规数+1
addUserBanned = (req,res) => {
  let {
    user_id
  } = req.body
  const sql = `update user set rule_break_count = rule_break_count + 1 where user_id = ?`
  const sqlArr = [user_id];
    let callBack = (err,data) => {
      if (err) {
        console.log(err)
        res.send({
          err:err,
          msg:"设置失败"
        })
      } else {
          res.send({
            msg :"违规次数+1",
            data:data
          })
      }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}


//按照用户ID，进行删除用户
deletUserByID = (req,res) => {
  let {
    user_id
  } = req.body
  const sql = `delete from user where user_id = ?`
  const sqlArr = [user_id];
    let callBack = (err,data) => {
      if (err) {
        console.log(err)
        res.send({
          err:err,
          msg:"设置失败"
        })
      } else {
          res.send({
            msg :"已删除该用户",
            data:data
          })
      }
    }
    config.sqlConnect(sql,sqlArr,callBack)
}

module.exports = {
    getUser,
    getTargetUser,
    userRegister,
    getUserName,
    userLogin,
    verifyToken,
    getIDTargetUser,
    updateUserInfo,
    changUserBanned,
    searchUser,
    addUserBanned,
    deletUserByID,
    updateUserInfoAdmin
}


