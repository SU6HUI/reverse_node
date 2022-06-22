const db = require('../db/index')

//上传学生提交作业信息
const updcmtworks = async ctx => {
    const {
        videoId = 'dont kno',
        studentNumber,
        homeworkId,
        state,
        institute,
        major,
        studentClass,
        address = 'dont know',
        flag = '0',
        createTime = +new Date()
    } = ctx.request.body

    let sql = `INSERT INTO video`
    sql += `(
        videoId,
        studentNumber,
        homeworkId,
        state,
        institute,
        major,
        studentClass,
        address,
        flag,
        createTime
    ) values (
        '${videoId}','${studentNumber}',
        '${homeworkId}','${state}',
        '${institute}','${major}',
        '${studentClass}','${address}',
        '${flag}','${createTime}'
    )`
    
    await db.query(sql).then(rel => {
        if(rel) {
            ctx.body = {
                code:200,
                msg:'添加成功',
                data:rel
            }
        } else {
            ctx.body = {
                code :300,
                msg:'添加失败'
            }
        }
    }).catch(err => {
        console.log(err);
        ctx.body = {
            code: 500,
            msg:'添加时出现异常'
        }
    })
}

//查看学生提交作业
const fcmtworks = async ctx => {

}

module.exports = {
    updcmtworks,
    fcmtworks
}