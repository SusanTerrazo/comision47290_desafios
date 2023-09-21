import { Router } from "express"
import { ProductManager } from '../ProductManager.js' 

const router = Router()
const productManager = new ProductManager('./data/productos.json')

//Crear una vista “home.handlebars” la cual contenga una lista de todos los productos agregados hasta el momento
router.get('/products', async (req, res )=>{ 
    const productos = await productManager.getProduct()
    res.render('home', {
        productos
    })
})


//Crear una vista con web-socket
router.get('/realtimeproducts', async (req, res )=>{ 
    const productos = await productManager.getProduct()
    res.render('realTimeProducts', {productos})
})

router.post('/', async (req, res) => {
    const productnew = req.body
    const productGenerated = new productsModel(productnew)
    await productGenerated.save()
    res.redirect('/')
}) 

export default router