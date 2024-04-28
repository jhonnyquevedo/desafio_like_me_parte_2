const { obtenerPosts, agregarPost, modificarPost, eliminarPost } = require('./consultas')

// Importamos el paquete express
const express = require("express")

// se ejecuta express para obtener un enrutador (app)
const app = express()

// Cors permite la comunicación de 2 aplicaciones de orígenes o dominios diferentes.
const cors = require("cors")

// levantamos el servidor local en el puerto 3000
app.listen(3000, () => console.log("servidor corriendo"))

app.use(cors())

// Integramos un middleware en nuestro servidor
app.use(express.json())


app.get("/posts", async (req, res) => {
    try {
        const posts = await obtenerPosts()
        if (!posts) {
            res.send(console.log("posts no encontrados"))
            //otra forma: res.status(404).json({ message: "Post not found" });
        }
        res.json(posts)
    } catch (error) {
        console.log("Hay un error".error.message)
    }
})


app.post("/posts", async (req, res) => {

    try {
        const { titulo, url, descripcion } = req.body
        if (!titulo || !url || !descripcion) {
            res.send(console.log("debe completar todos los campos"));
            /* Otra forma: return res.status(400).json({ message: "Todos los campos son requeridos" }); */
        }
        else {
            await agregarPost(titulo, url, descripcion)
            res.send("post creado con éxito")
        }
    } catch (error) {
        console.log("Hay un error".error.message)
    }
})


app.put("/posts/like/:id", async (req, res) => {
    try {
        const { id } = req.params
        await modificarPost(id)
        res.send("Post modificado con éxito")
    } catch (error) {
        console.log(error)
    }
})


app.delete("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params
        await eliminarPost(id)
        if(eliminarPost.rowCount===0){
            throw{
                code:404,
                message:`no se encontró el id: ${id}`
            }
        }
        res.send("Post eliminado con éxito")
    } catch (error) {
        res.status(error.code).json(error.message)
    }
})

