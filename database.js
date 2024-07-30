// Connection pool and the db interaction methods
// Use this file if not using sequelize ORM
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

const table_name = 'posts';

const getPosts = async () => {
    const result = await pool.query(`select * from ${table_name}`);
    return result[0];
}

const getPost = async (id) => {
    const [result] = await pool.query(`
        select *
        from ${table_name}
        where id = ?
    `, [id]);
    return result[0];
}

const insertPost = async (title) => {
    const [result] = await pool.query(`
        insert into ${table_name} (title)
        values (?)
    `, [title]);

    const newId = result?.insertId;
    const addedPost = getPost(newId);

    return addedPost;
}

const updatePost = async (id, title) => {
    const [result] = await pool.query(`
        update ${table_name}
        set title = ?
        where id = ?
    `, [title, id]);

    return result;
}

const deletePost = async (id) => {
    const [result] = await pool.query(`
        delete from ${table_name}
        where id = ?
    `, [id]);
    return result;
}

module.exports = {
    getPost,
    getPosts,
    insertPost,
    updatePost,
    deletePost
}