// let Users = require('../models/users')
const db = require('../db/index.js')
//查询
const infoStudent = async ctx => {
    const { keywords } = ctx.request.query
    let sql = `SELECT * FROM users`
    //console.log(keywords);
    if (keywords) {
        await db.query(sql).then(rel => {
            if (rel) {
                ctx.body = {
                    code: 200,
                    msg: '数据查看成功',
                    data: rel
                }
            } else {
                ctx.body = {
                    code: 300,
                    msg: '数据查看失败',
                }
            }
        }).catch(err => {
            ctx.body = {
                code: 500,
                msg: '数据查看异常'
            }
        })
    } else {
        await db.query(sql).then(rel => {
            if (rel) {
                ctx.body = {
                    code: 200,
                    msg: '数据查看成功',
                    data: rel.results
                }
            } else {
                ctx.body = {
                    code: 300,
                    msg: '数据查看失败',
                }
            }
        }).catch(err => {
            ctx.body = {
                code: 500,
                msg: '数据查看异常'
            }
        })
    }

}

//更改
const updStudent = async ctx => {
    let {
        studentId,
        studentName,
        studentNumber,
        IdCard,
        sex,
        state,
        phone,
        political,
        institute,
        studentClass,
    } = ctx.request.body

    let sql = 'UPDATE users SET '
    sql += `studentName='${studentName}',
            studentNumber='${studentNumber}',
            IdCard='${IdCard}',
            sex='${sex}',
            state='${state}',
            phone='${phone}',
            political='${political}',
            institute='${institute}',
            studentClass='${studentClass}'
            WHERE studentId='${studentId}'`

    await db.query(sql).then(rel => {
        if (rel.status == 200) {
            ctx.body = {
                code: 200,
                msg: '学生信息修改成功'
            }
        } else {
            ctx.body = {
                code: 300,
                msg: '学生信息修改失败'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: '信息修改出现异常'
        }
    })
}

//删除
const delStudent = async ctx => {
    const { studentId } = ctx.request.body;
    let sql = `DELETE FROM users WHERE studentId='${studentId}'`
    await db.query(sql)
        .then(rel => {
            if (rel) {
                ctx.body = {
                    code: 200,
                    msg: '数据删除成功',
                    data: rel
                }
            } else {
                ctx.body = {
                    code: 300,
                    msg: '数据删除失败',
                }
            }
        }).catch(err => {
            ctx.body = {
                code: 500,
                msg: '数据删除异常'
            }
        })
}

const addStudent = async ctx => {
    let {
        studentId,
        studentName,
        studentNumber,
        IdCard,
        sex = '女',
        state = '',
        phone = '',
        political = '群众',
        institute = '',
        major = '',
        studentClass = '',
        password = '000000',
        type = '学生',
        createDate = Date.now(),
    } = ctx.request.body

    let sql = `INSERT INTO users`
    sql += `(
        studentId,studentName,studentNumber,
        IdCard,sex,state,phone,
        political,institute,major,
        password,type,studentClass,createDate) 
        values
        ('${studentId}', '${studentName}','${studentNumber}',
        '${IdCard}','${sex}','${state}','${phone}',
        '${political}','${institute}','${major}'
        ,'${password}','${type}','${studentClass}','${createDate}')`
    // sql += `(studentId) 
    //         values
    //         ('${studentId}')`

    await db.query(sql).then((rel) => {
        if (rel) {
            ctx.body = {
                code: 200,
                msg: "添加成功",
            }
        } else {
            ctx.body = {
                code: 300,
                msg: "添加失败"
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: "添加时出现异常"
        }
    })
}

const updpassword = async ctx => {
    let {
        IdCard,
        password,
        studentName
    } = ctx.request.body

    //console.log(studentName);

    let sql = `UPDATE users SET password='${password}' WHERE (IdCard='${IdCard}' AND studentName='${studentName}')`

    await db.query(sql).then(rel => {
        if (rel.status == 200 && rel.results.changedRows > 0) {
            ctx.body = {
                code: 200,
                msg: '修改成功',
                data: {
                    ok: 1
                }
            }
        } else {
            ctx.body = {
                code: 300,
                msg: "修改失败",
                data: {
                    ok: 0
                }
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: "修改时出现异常",
            data: {
                ok: 0
            }
        }
    })
}


module.exports = {
    infoStudent,
    updStudent,
    delStudent,
    addStudent,
    updpassword
}