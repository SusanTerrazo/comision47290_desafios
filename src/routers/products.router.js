import { Router } from "express"
import productsModel from "../models/products.model.js"

const router = Router()


router.get('/', async (req, res )=>{ 
    
    const products = await productsModel.find().lean().exec() //lean y exec para que ejcute en vistas de handelbars
    res.render('home', {products})
    //res.status(200).json({ payload: productos.slice(0, limit)})
})

// router.get('/:name', async (req, res) => {
//     const name = req.params.name
//     const product = await productsModel.find({title:`${name}`}).lean().exec()
//     res.render('product', {product})
// })

router.get('/agregar', (req, res) => {
    res.render('agregarproducto', {title: 'Registro de productos'})
})

router.post('/', async (req, res) => {
    const productnew = req.body
    const productGenerated = new productsModel(productnew)
    try{
        await productGenerated.save()
    }catch (error){
        console.log(err.message)
    }
        res.redirect('/api/products')
}) 
/*router.get('/:pid', async (req, res )=>{
    const id = parseInt(req.params.pid)
    const result = await productManager.getProductbyId(id)
    if(typeof result == 'string') return res.status(404).json({status: 'error', error: result.slice(6) })
    
    res.status(200).json({ payload: result})
})*/

// router.post('/',  (req, res)=>{
//     const product = req.body 
//     res.send('Creando un producto')
    
// })

// router.put('/:pid', async (req,res) => {
//     const id = parseInt(req.params.pid)
//     const data = req.body

//     const result = await productManager.updateProduct(id, data)
//     if (typeof result == 'string') return res.status(404).json({status: 'error', error: result.slice(6) })
//     res.status(200).json( {status: 'succes', payload: result} )
// })

// router.delete('/:pid', async (req, res) => {
//     const id = parseInt(req.params.pid)
    
//     const result = await productManager.deleteProduct(id)
//     if (typeof result == 'string') return res.status(404).json({status: 'error', error: result.slice(6) })
//     const updateProducts = await productManager.getProduct()
//     res.status(200).json( {status: 'succes', payload: updateProducts} )
// })

export default router