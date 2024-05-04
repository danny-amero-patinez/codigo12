const express = require('express')
const dotenv = require('dotenv')
const app = express()
const cors = require('cors');

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

dotenv.config();

/* app.get("/", (req, res) => {
    res.send("Hola mundo con nodemon!")
}) */

/* app.listen(process.env.SERVER_PORT, () => {
    console.log(`Aplicacion de ejemplo escuchando en el puerto ${process.env.SERVER_PORT}`)
}) */

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(cors());

app.use("/api/categorias", require('./routes/categorias.routes'))
app.use("/api/peliculas", require('./routes/peliculas.routes'))
app.get("*", (req, res) => { res.status(404).send() })

const errorhandler = require('./middlewares/errorhandler')
app.use(errorhandler)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Aplicacion de ejemplo escuchando en el puerto ${process.env.SERVER_PORT}`)
})
