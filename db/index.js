// const mongoose = require('mongoose')

// module.exports = () => {
//     mongoose.connect('mongodb://localhost:27017/reverse',{useUnifiedTopology:true,useNewUrlParser:true})
//     .then(() => {
//         console.log('数据库连接成功');
//     }).catch(err => {
//         console.error('数据库连接失败',err);
//     })
// }

const mysql = require('mysql')

var pool = mysql.createPool({
    host:'localhost', //链接的服务器（代码托管到线上后，需要改为内网IP）
    port:3306, //mysql运行端口
    database:'reverse', //库
    user:'root',
    password:'sunhui666'
})

exports.query = function(sql,values) {
    return new Promise((resolve , reject) => {
        pool.getConnection(function(err,connection){
            if(err) {
                reject(err)
                resolve({
                    status:500,
                });
            } else {
                //链接数据库成功
                connection.query(sql,values,(err,results) => {
                    if(err) {
                        reject(err);
                        resolve({
                            status:400
                        });
                    } else {
                        connection.release()
                        resolve({
                            status:200,
                            results
                        })
                    }
                })
            }
        })
    })
}

