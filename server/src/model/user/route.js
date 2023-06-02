const Router = require("express");
const userController = require('./controller')
const router = new Router()
const authMiddleware = require('../../middleware/authMiddleware')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/check', authMiddleware, userController.check)

module.exports = router;