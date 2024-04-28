const { Pool } = require("pg")

// importamos la dependencia de dotenv
require("dotenv").config({ path: "./.env" });

//Código de conexión a la base de datos.
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    allowExitOnIdle: true,
})

const obtenerPosts = async () => {
    const query = "SELECT * FROM posts;"
    const { rows } = await pool.query(query)
    return rows
}

const agregarPost = async (titulo, url, descripcion) => {
    const id = Math.floor(Math.random() * 9999)
    const consulta = "INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES($1, $2, $3, $4, $5);"
    const values = [id, titulo, url, descripcion, 0]
    const result = await pool.query(consulta, values)
}

const modificarPost = async (id) => {
    const consulta = "UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1";
    const values = [id]
    const result = await pool.query(consulta, values)
    }

    const eliminarPost = async (id) => {
        const consulta = "DELETE FROM posts WHERE id = $1"
        const values = [id]
        const result = await pool.query(consulta, values)
        }
        

module.exports = { obtenerPosts, agregarPost, modificarPost, eliminarPost }
