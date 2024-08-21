const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()

const db = require("./db")

const movieRouter = require("./routes/movie-router")

const apiPort = 3000

app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(bodyParser.json())

db.on("error", console.error.bind(console, "MongoDB connection error:"))

app.get("/", (req, res) => {
    res.send("Hola mundo")
})

app.use("/api", movieRouter)

app.listen(apiPort, () => console.log(`Servidor corriendo en purto ${apiPort}`))