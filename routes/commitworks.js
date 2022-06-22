const {
    updcmtworks,
    fcmtworks
} = require('../controller/commitworks')

const router = require('koa-router')()
router.prefix('/api/commitworks')

//上传学生提交作业信息
router.post('/updcmtworks',updcmtworks)
//查看学生提交作业
router.get('/fcmtworks',fcmtworks)

module.exports = router