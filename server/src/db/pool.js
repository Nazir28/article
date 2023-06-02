const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'nazirazizov',
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'articles',
    port: process.env.DB_PORT, // порт по умолчанию для PostgreSQL
});


module.exports = pool;