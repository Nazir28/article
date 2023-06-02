const pool = require("../../db/pool")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function generateJwt(id, email, name) {
    return jwt.sign(
        { id, email, name },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}
class UserController {

    async register(req, res) {


        try {
            const { password, email, name } = req.body

            const queryExist = 'SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)'
            const checkEmail = await pool.query({
                text: queryExist,
                values: [email]
            })
            if (checkEmail.rows[0].exists) throw new Error('пользователь с таким email уже существует')

            // const hashPassword = await bcrypt.hash(password, 5)
            const queryCreate = 'INSERT INTO users (name, email, image_url, password) VALUES($1, $2, $3, $4) RETURNING *'
            const user = await pool.query({
                text: queryCreate,
                values: [name, email, '', password]
            })
            console.log(user)
            const token = generateJwt(user.rows[0].id, user.rows[0].email, user.rows[0].name);
            res.json({
                token,
            })
        } catch (error) {
            console.log(error)
            res.status(400).type('text/plain')
            res.send({
                status: 400,
                error: error.message
            })
        }
    }
    async login(req, res) {
        try {
            const { password, email } = req.body
            let user = await pool.query({
                text: 'SELECT * FROM users WHERE email = $1',
                values: [email]
            })
            if (user.rows.length === 0) throw new Error('пользователь с таким email не существует')

            const checkPassword = await pool.query({
                text: 'SELECT EXISTS(SELECT 1 FROM users WHERE password = $1)',
                values: [password]
            })
            if (!checkPassword.rows[0].exists) throw new Error('Не верный пароль')

            user = user.rows[0]

            const token = generateJwt(user.id, user.email, user.name)
            res.json({
                token,
            })

        } catch (error) {
            console.log(error)
            res.status(400).type('text/plain')
            res.send({
                status: 400,
                error: error.message
            })
        }
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.name)
        return res.json({ token })
    }
}

module.exports = new UserController()