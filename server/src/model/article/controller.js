const pool = require("../../db/pool")
const path = require('path')
const uuid = require('uuid')


const imageUrl = (url) => `http://${process.env.HOST}:${process.env.PORT}/static/image/${url}`
class ArticleController {
    async getAll(req, res) {
        try {

            const articles = await pool.query('SELECT article.*, users.name FROM article JOIN users ON article.user_id = users.id')
            res.json(articles.rows.map(el => ({
                ...el,
                image_url: imageUrl(el.image_url)
            })))
        } catch (error) {
            res.status(400).type('text/plain')
            res.json({
                status: 400,
                message: error.message
            })

        }
    }
    async getBiId(req, res) {
        const query = 'SELECT * FROM article WHERE id = $1'
        try {
            const article = await pool.query({
                text: query,
                values: [req.params.id]
            })
            res.json({
                ...article.rows[0],
                image_url: imageUrl(article.rows[0].image_url)
            })
        } catch (error) {
            res.status(400).type('text/plain')
            res.json({
                status: 400,
                message: error.message
            })

        }
    }
    async getBiUserId(req, res) {
        const query = 'SELECT * FROM article WHERE user_id = $1'
        try {
            const articles = await pool.query({
                text: query,
                values: [req.params.id]
            })
            res.json(articles.rows.map(el => ({
                ...el,
                image_url: imageUrl(el.image_url)
            })))
        } catch (error) {
            res.status(400).type('text/plain')
            res.json({
                status: 400,
                message: error.message
            })

        }
    }
    async create(req, res) {
        const query = 'INSERT INTO article (user_id, title, description, image_url) VALUES($1,$2,$3,$4) RETURNING *'
        try {
            const { img } = req.files
            let fileName = uuid.v4() + '.' + img.name.split('.').at(-1)
            img.mv(path.resolve(__dirname, '../../../', 'static/image', fileName))

            const article = await pool.query({
                text: query,
                values: [req.user.id, req.body.title, req.body.description, fileName]
            })
            res.json({
                ...article.rows[0],
                image_url: imageUrl(article.rows[0].image_url)
            })
        } catch (error) {
            res.status(400).type('text/plain')
            res.json({
                status: 400,
                message: error.message
            })

        }
    }
    async update(req, res) {
        const query = `UPDATE article  SET 
            title = $1, 
            description = $2,  
            image_url = $3
            WHERE "id" = $4
            RETURNING *
        `
        try {
            const { title, description, image_url, id } = req.body
            const article = await pool.query({
                text: query,
                values: [title, description, image_url, id]
            })
            
            res.json({
                article: article.rows[0]
            })
        } catch (error) {
            console.log(error)
            res.status(400).type('text/plain')
            res.json({
                status: 400,
                message: error.message
            })

        }
    }
    async delete(req, res) {
        const query = `DELETE FROM article WHERE id = $1 RETURNING *`
        try {
            const article = await pool.query({
                text: query,
                values: [req.params.id]
            })
            console.log(article)
            res.json({
                status: 200,
                deleted: true
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new ArticleController()