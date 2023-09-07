import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import productRouter from './routers/products.router.js'
import viewRouter from './routers/view.router.js'


const app = express()

//========================================setear Handlebars================================
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

app.use(express.json())


//===================================== rutas =============================================
app.use('/', viewRouter )
app.use(express.static('./src/public'))
app.use('/api/products', productRouter) 

const PORT = 8080
const httpServer = app.listen(PORT, () => console.log(`Server up on http://localhost:${PORT}`)) 
const socketServer = new Server(httpServer)

socketServer.on("connection", socket => {
    socket.on('listaProductos', data => {
        socketServer.emit('productosActualizados', data)
    })
})