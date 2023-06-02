const Router = require("express");
const router = new Router()
const authMiddleware = require('../../middleware/authMiddleware')
const articleControler = require('./controller')

router.get('/all', articleControler.getAll)
router.get('/:id', articleControler.getBiId)
router.get('/user/:id', articleControler.getBiUserId)
router.post('/', authMiddleware, articleControler.create)
router.put('/', authMiddleware, articleControler.update)
router.delete('/:id', authMiddleware, articleControler.delete)

module.exports = router;