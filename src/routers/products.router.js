import { Router } from "express"
import { ProductManager } from '../ProductManager.js'

const router = Router()
const productManager = new ProductManager('./data/productos.json')

router.get('/', async (req, res )=>{ 
    const productos = await productManager.getProduct()
    const limit = req.query.limit
    res.status(200).json({ payload: productos.slice(0, limit)})
})

router.get('/:pid', async (req, res )=>{
    const id = parseInt(req.params.pid)
    const result = await productManager.getProductbyId(id)
    if(typeof result == 'string') return res.status(404).json({status: 'error', error: result.slice(6) })
    
    res.status(200).json({ payload: result})
})

router.post('/', async (req, res)=>{
    const product = req.body 

    const result = await productManager.addProduct(product)
    if(typeof result == 'string') return res.status(500).json({ status: 'error', error: result.slice(6) })
    res.status(200).json({ status: 'succes', payload: result})
})

router.put('/:pid', async (req,res) => {
    const id = parseInt(req.params.pid)
    const data = req.body

    const result = await productManager.updateProduct(id, data)
    if (typeof result == 'string') return res.status(404).json({status: 'error', error: result.slice(6) })
    res.status(200).json( {status: 'succes', payload: result} )
})

router.delete('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    
    const result = await productManager.deleteProduct(id)
    if (typeof result == 'string') return res.status(404).json({status: 'error', error: result.slice(6) })
    res.status(200).json( {status: 'succes', payload: 'Producto eliminado'} )
})

export default router