const {
    infoStudent,
    updStudent,
    delStudent,
    addStudent,
    updpassword,
    infoTeacher,
    updTeacher,
    delTeacher,
    addTeacher,
    updpassword_teacher
    
} = require('../controller/users')

const router = require('koa-router')()
router.prefix('/api/users')

//显示学生信息
router.get('/infostudent',infoStudent)
//更改学生信息
router.post('/updstudent',updStudent)
//删除学生信息
router.post('/delstudent',delStudent)
//增加学生信息
router.post('/addStudent',addStudent)
//更改学生密码
router.post('/updpwd',updpassword)

//显示教师信息
router.get('/infoteacher',infoTeacher)
//更改教师信息
router.post('/updteacher',updTeacher)
//删除教师信息
router.post('/delteacher',delTeacher)
//添加教师细腻
router.post('/addteacher',addTeacher)
//修改教师密码
router.post('/updpwd_teacher',updpassword_teacher)


module.exports = router
