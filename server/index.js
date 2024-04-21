// Importamos el paquete express
const express = require("express")

// se ejecuta express para obtener un enrutador (app)
const app = express()

// Cors permite la comunicación de 2 aplicaciones de orígenes o dominios diferentes.
const cors = require("cors")

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

// levantamos el servidor local en el puerto 3000
app.listen(3000, () => console.log("servidor corriendo"))

app.use(cors())

// Integramos un middleware en nuestro servidor
app.use(express.json())


app.get("/posts", async (req, res) => {
    try {
        const query = "SELECT * FROM posts;"
        const { rows } = await pool.query(query)

        if (!rows) {
            res.send(console.log("posts no encontrados"))
            //otra forma: res.status(404).json({ message: "Post not found" });
        }
        res.json(rows)
    } catch (error) {
        console.log("Hay un error".error.message)
    }

})


app.post("/posts", async (req, res) => {

    const { titulo, url, descripcion } = req.body

    try {
        if (!titulo || !url || !descripcion) {
            res.send(console.log("debe completar todos los campos"));
            /* Otra forma: return res.status(400).json({ message: "Todos los campos son requeridos" }); */
        }
        else {
            const id = Math.floor(Math.random() * 9999)
            const query = "INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES($1, $2, $3, $4, $5);"
            const values = [id, titulo, url, descripcion, 0]
            const { rows } = await pool.query(query, values)
            res.send("post creado con éxito")
        }

    } catch (error) {
        console.log("Hay un error".error.message)
    }

})