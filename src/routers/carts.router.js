import { Router } from "express";
import {CartManager} from "../CartManager.js";


const router = Router()
const cartManager = new CartManager('./data/carts.json')


router.get('/', async (req, res )=>{ 
    const carts = await cartManager.getcart()
    res.status(200).json({ status: 'succes', payload: carts})
})

router.get('/:cid', async (req, res) => {
    const id = parseInt(req.params.cid)
    const result = await cartManager.getCartbyID(id)
    if (typeof result == 'string') return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' })
        
    res.status(200).json({ status: 'succes', payload: result})
})

router.post('/', async (req, res)=>{        
    const result = await cartManager.addCart()
    res.status(200).json({ status: 'succes', payload: result})
})

router.post('/:cid/product/:pid', async (req, res) => {
    const idCart = parseInt(req.params.cid)
    const idProduct = parseInt(req.params.pid)
    const result = await cartManager.addProductToCart(idCart, idProduct)
    if(typeof result == 'string') return res.status(404).json({status: 'error', error: result.slice(6) })
    res.status(200).json({ status: 'succes', payload: result}) 
})

export default router