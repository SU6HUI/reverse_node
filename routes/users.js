const {
    infoStudent,
    updStudent,
    delStudent
} = require('../controller/users')

const router = require('koa-router')()
router.prefix('/api/users')

//显示学生信息
router.get('/infostudent',infoStudent)
//更改学生信息
router.post('/updstudent',updStudent)
//删除学生信息
router.post('/delstudent',delStudent)



module.exports = router
