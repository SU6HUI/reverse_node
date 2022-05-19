const {
    updesignworks,
    fdesignworks,
    deldesignworks
} = require('../controller/designworks')

const router = require('koa-router')()
router.prefix('/api/designworks')

//上传作业设计
router.post('/updesignworks',updesignworks)
//查看作业设计
router.get('/fdesignworks',fdesignworks)
//删除作业设计
router.post('/deldesignworks',deldesignworks)

module.exports = router