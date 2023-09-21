import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import productRouter from './routers/products.router.js'


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//========================================setear Handlebars================================
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')




//===================================== rutas =============================================
app.get('/', (req, res) => {
    res.send('BIENVENIDO A LA APLICACION CON WEBSOCKET')
})
//app.use('/', viewRouter )
app.use(express.static('./src/public'))
app.use('/api/products', productRouter) //ok

//conexión a mongoose
try{
    await mongoose.connect('mongodb+srv://codersu:codersu@cluster0.leih7nw.mongodb.net/', {
        dbName: 'ecommerce'
    })
    const PORT = 8080
    app.listen(PORT, () => console.log(`Server up on http://localhost:${PORT}`)) 
}catch (err){
    console.log(err.message)
}



// const socketServer = new Server(httpServer)

// socketServer.on("connection", socket => {
//     socket.on('listaProductos', data => {
//         socketServer.emit('productosActualizados', data)
//         console.log(data)
//     })
// })