const mongoose = require("mongoose")

mongoose
.connect("mongodb://localhost:27017/cinema", {useNewUrlParser: true})
.catch(e => {
    console.error("Error de conexion", e.message)
})

const db = mongoose.connection

module.exports = db