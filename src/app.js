import express from 'express'
import ProductManager from './ProductManager.js'

const app = express()

const mp = new ProductManager ('./src/productos.json')


app.get ('/', (req, res)=>{
    res.send('Lista de productos')
})


app.get ('/products', async (req, res)=>{
    const productos = await mp.getProduct()
    const limit = req.query.limit
    res.status(200).json({ payload: productos.slice(0, limit)})
    
})

app.get ('/products/:pid', async (req, res)=>{
    const id = parseInt(req.params.pid)
    const result = await mp.getProductbyId(id)
    res.status(200).json({ payload: result})
})

app.listen(8080, () => console.log('Server up'))
