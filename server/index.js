require('dotenv').config()
const { json, static } = require('express');
const cors = require('cors')
const app = require('express')();
const appRouter = require('./src/model/routes')
const fileUpload = require('express-fileupload')
const path = require('path')
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 7000;

app.use(cors())
app.use(json())
app.use(fileUpload())
app.use('/static/image', static(path.resolve(__dirname, 'static', 'image')))
app.use(static(path.resolve(__dirname, 'static', 'image')))


app.use('/api', appRouter)

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});