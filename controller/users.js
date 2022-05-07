let Users = require('../models/users')

//查询
const infoStudent = async ctx => {
    await Users.find().then(rel => {
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
}

//更改
const updStudent = async ctx => {
    let {
        _id,
        studentId,
        studentNumber,
        studentName,
        sex,
        IdCard,
        state,
        political,
        phone,
        institute,
        studentClass
    } = ctx.request.body

    await Users.updateOne(
        { studentId }, {
        studentNumber
        // studentName,
        // sex,
        // IdCard,
        // state,
        // political,
        // phone,
        // institute,
        // studentClass
    }
    ).then(rel => {
        if (rel.modifiedCount > 0) {
            ctx.body = {
                code: 200,
                msg: '学生信息修改成功'
            }
        } else {
            console.log(rel);
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
    const {studentId} = ctx.request.body;
    await Users.findOneAndDelete({studentId})
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

module.exports = {
    infoStudent,
    updStudent,
    delStudent
}