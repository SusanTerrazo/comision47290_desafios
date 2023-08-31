import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import productRouter from './routers/products.router.js'


const app = express()

//========================================setear Handlebars================================
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.static('./src/public'))

//===================================== rutas =============================================

//Crear una vista “home.handlebars” la cual contenga una lista de todos los productos agregados hasta el momento
app.use('/products', productRouter)



const PORT = 8080
const httpServer = app.listen(PORT, () => console.log(`Server up on http://localhost:${PORT}`)) 
const socketServer = new Server(httpServer)