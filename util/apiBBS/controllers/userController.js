var config = require('../util/config')
//引入 jsonwebtoken以用来验证用户登录状态
const jwt = require('jsonwebtoken');

//获取所有用户信息
getUser = (req,res)=> {
  var sql = "select * from user";
  var sqlArr = [];
  var callBack = (err,data)=> {
    if(err){
      console.log('连接出错了')
    }else{
      res.send({
        'list':data
      })
    }
  }
  config.sqlConnect(sql,sqlArr,callBack)
}


//获取指定用户信息
getTargetUser = (req,res)=> {
  let {username} = req.query;
  let sql = `select * from user where username=?`
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


//获取用户名
getUserName = (req,res) => {
  let {
    name
  } = req.query
  let sql = `select username from user where username=?`
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
  const sql = `insert into user (username,nickname,password,gender) values (?,?,?,?)`
  const sqlArr = [username,
    nickname,
    password,
    gender];
    let callBack = (err,data) => {
      if (err) {
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
  let sql = `select * from user where username=?`
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
verifyToken = (req,res) => {
   const authHeader = req.headers.authorization;
   if(authHeader) {
    const token = authHeader.split(' ')[1];
    //验证token
    jwt.verify(token,'secret',(err,user) => {
      if(err) {
        return res.json({ code: 403, message: '登录信息已过期'});
      }
      res.json({ code: 200, message: '获取用户信息成功', user });
    });}
    else {
      res.sendStatus(401);
    }
   }


module.exports = {
    getUser,
    getTargetUser,
    userRegister,
    getUserName,
    userLogin,
    verifyToken
}