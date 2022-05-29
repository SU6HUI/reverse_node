// let Users = require('../models/users')
const db = require('../db/index.js')
//查询学生
const infoStudent = async ctx => {
    const { keywords } = ctx.request.query
    let sql = "SELECT * FROM users"
    //console.log(keywords);
    if (keywords) {
        sql += ` WHERE studentName like '%${keywords}%'`
        await db.query(sql).then(rel => {
            if (rel&& rel.results.length > 0) {
                //console.log(rel);
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
                msg: '数据查看异常',
                err,
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

//更改学生
const updStudent = async ctx => {
    const {
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
        if (rel.status == 200 && rel.results.changedRows > 0) {
            ctx.body = {
                code: 200,
                msg: '学生信息修改成功'
            }
        } else {
            ctx.body = {
                code: 300,
                msg: '学生信息修改失败',
                err
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: '信息修改出现异常',
            err
        }
    })
}

//删除学生
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

//添加学生
const addStudent = async ctx => {
    const {
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
        type = '0',  //0是学生
        createDate = Date.now(),
    } = ctx.request.body

    let sql = 'INSERT INTO users'
    sql += `(
        studentId,studentName,studentNumber,
        IdCard,sex,state,phone,
        political,institute,major,
        password,type,studentClass,createDate) 
        values
        ('${studentId}', '${studentName}','${studentNumber}',
        '${IdCard}','${sex}','${state}','${phone}',
        '${political}','${institute}','${major}'
        ,'${password}','0','${studentClass}','${createDate}')`
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
                msg: "添加失败",
                err,
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: "添加时出现异常",
            err
        }
    })
}

//更改密码
const updpassword = async ctx => {
    const {
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

/**
 * 查询教师
 */
const infoTeacher = async ctx => {
    const { keywords } = ctx.request.query
    let sql = "SELECT * FROM users_teacher"
    if (keywords) {
        sql += ` WHERE teacherName like '%${keywords}%'`
        await db.query(sql).then(rel => {
            if (rel) {
                console.log(rel);
                ctx.body = {
                    code: 200,
                    msg: '数据查看成功',
                    data: rel.results
                }
            } else {
                ctx.body = {
                    code: 300,
                    msg: '数据查看失败'
                }
            }
        }).catch(err => {
            ctx.body = {
                code: 500,
                msg: '数据查看异常',
                err,
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
                    msg: '数据查看失败'
                }
            }
        }).catch(err => {
            ctx.body = {
                code: 500,
                msg: '数据查看异常',
                err,
            }
        })

    }
}

/**
 * 更改教师信息
 */
const updTeacher = async ctx => {
    const {
        teacherId,
        teacherName,
        IdCard,
        teacherNumber,
        institute,
        password,
        school,
        educational,
        sex,
        phone,
        political,
    } = ctx.request.body
    let sql = 'UPDATE users_teacher SET '
    sql += `teacherName='${teacherName}',
            IdCard='${IdCard}',
            teacherNumber='${teacherNumber}',
            institute='${institute}',
            password='${password}',
            school='${school}',
            educational='${educational}',
            sex='${sex}',
            phone='${phone}',
            political='${political}',
            type='1'
            WHERE teacherId='${teacherId}'`
    await db.query(sql).then(rel => {
        console.log(rel);
        if (rel.status == 200 && rel.results.changedRows > 0) {
            ctx.body = {
                code: 200,
                msg: '教师信息修改成功'
            }
        } else {
            ctx.body = {
                code: 300,
                msg: '教师信息修改失败'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: '信息修改出现异常',
            err
        }
    })
}

/**
 * 删除教师信息
 */
const delTeacher = async ctx => {
    const { teacherId } = ctx.request.body
    let sql = `DELETE FROM users_teacher WHERE teacherId='${teacherId}'`
    await db.query(sql).then(rel => {
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

/**
 * 添加教师信息
 */
const addTeacher = async ctx => {
    const {
        teacherId,
        teacherName,
        IdCard,
        teacherNumber,
        institute = '',
        password = '666666',
        type = '1',
        school = '',
        educational = '',
        sex = '男',
        phone = '',
        political = '群众',
        entryTime = '',
        createDate = Date.now(),
    } = ctx.request.body

    let sql = 'INSERT INTO users_teacher'
    sql += `(teacherId,teacherName,IdCard,
        teacherNumber,institute,password,
        type,school,educational,
        sex,phone,political,entryTime,
        createDate)
        values
        ('${teacherId}','${teacherName}','${IdCard}',
        '${teacherNumber}','${institute}','${password}',
        '${type}','${school}','${educational}',
        '${sex}','${phone}','${political}','${entryTime}',
        '${createDate}')`

    await db.query(sql).then(rel => {
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

/**
 * 更改密码
 */
const updpassword_teacher = async ctx => {
    const {
        IdCard,
        password,
        teacherName
    } = ctx.request.body

    //console.log(studentName);

    let sql = `UPDATE users_teacher SET password='${password}' WHERE (IdCard='${IdCard}' AND teacherName='${teacherName}')`

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
                    ok: 0,
                    err
                }
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: "修改时出现异常",
            data: {
                ok: 0,
                err
            }
        }
    })
}



module.exports = {
    infoStudent,
    updStudent,
    delStudent,
    addStudent,
    updpassword,
    infoTeacher,
    updTeacher,
    delTeacher,
    addTeacher,
    updpassword_teacher,

}