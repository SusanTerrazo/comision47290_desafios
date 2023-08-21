import express from 'express'
import productRouter from './routers/products.router.js'
import cartRouter from './routers/carts.router.js'



const app = express()

app.use(express.json())

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

const PORT = 8080
app.listen(PORT, () => console.log(`Server up on http://localhost:${PORT}`)) 