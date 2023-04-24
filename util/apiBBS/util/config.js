const mysql = require('mysql')
const config = {
    host:'localhost',
    port:'3306',
    user:'root',
    password:'991204',
    database:'bbs_database',
    connectionLimit: 100
}
const pool = mysql.createPool(config)
function sqlConnect(sql,sqlArr,callBack){
    pool.getConnection((err,conn)=> {
        if(err){
            console.log('数据库连接失败');
            return;
        }
        conn.query(sql, sqlArr,callBack)
            // 释放连接
            conn.release();
          });
    }
        module.exports = {
            sqlConnect: sqlConnect
     };

//     //连接数据库,使用mysql的连接池连接方式
//     //连接池对象
//     sqlConnect: function(sql,sqlArr,callBack){
//         var pool = mysql.createPool(this.config)
//         pool.getConnection((err,conn)=> {
//             if(err){
//                 console.log('数据库连接失败');
//                 console.log(err);
//                 return;
//             }
//             //事件驱动回调
//             conn.query(sql,sqlArr,callBack);
//             //释放连接
//             conn.release();
//         })
//     }
// }