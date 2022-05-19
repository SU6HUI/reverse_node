const db = require('../db/index.js')

const updesignworks = async ctx => {
    let {
        work_title,
        state,
        institute,
        studentClass,
        request_1,
        answer_1="",
        standard="",
        work_id
    } = ctx.request.body

    let sql = `INSERT INTO designworks`
    sql += `(work_title,
        state,
        institute,
        studentClass,
        request_1,
        answer_1,
        standard,work_id) 
        values
        ('${work_title}','${state}',
        '${institute}','${studentClass}',
        '${request_1}','${answer_1}',
        '${standard}','${work_id}'
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
        //console.log(err);
        ctx.body = {
            code: 500,
            msg:'添加时出现异常'
        }
    })
}

const fdesignworks = async ctx => {
    let sql = `SELECT * FROM designworks`
    await db.query(sql).then(rel => {
        if(rel) {
            ctx.body = {
                code:200,
                mgs:'数据查看成功',
                data:rel
            }
        } else {
            ctx.body = {
                code:300,
                msg:'数据查看失败'
            }
        }
    }).catch(err =>{
        ctx.body = {
            code:500,
            msg:'数据查看异常'
        }
    })
}

const deldesignworks = async ctx => {
    const {id} = ctx.request.body
    let sql = `DELETE FROM designworks WHERE work_id='${id}'`
    
    await db.query(sql).then(rel => {
        if (rel.results.affectedRows > 0) {
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
    updesignworks,
    fdesignworks,
    deldesignworks
}