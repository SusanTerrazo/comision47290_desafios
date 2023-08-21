import fs from 'fs'
import { ProductManager } from './ProductManager.js'

const productManager = new ProductManager('./data/productos.json')

const path = './data/carts.json'

export class CartManager {
    constructor(path){
        this.path = path
    }

generateID(data) {
    return (data.length === 0) ? 1 : data[data.length-1].id + 1
}

getcart = async() =>{
   if (fs.existsSync(path)){
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const carts = JSON.parse(data)
        return carts
    } else {
        return []
    }
}

getCartbyID = async(id) => {
    const carts = await this.getcart()
    const cartId = carts.find(cart => cart.id === id)
    if(!cartId) return '[404] Carrito no encontrado'
    return cartId   
}

addCart = async() => {
    const carts = await this.getcart()
    const cartToAdd = { id: this.generateID(carts), products: [] }
    carts.push(cartToAdd)
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))
    return cartToAdd
}

addProductToCart = async (cid, pid) => {
    const productAdd = await productManager.getProductbyId(pid) //buscar el producto en bd productos
    if (typeof productAdd == 'string') return '[404] Producto no encontrado'
    const cart = await this.getCartbyID(cid) // buscar el carrito
    if (typeof cart == 'string') return '[404] Carrito no encontrado'
    const productIndex = cart.products.findIndex(item => item.product == pid) //buscar el index del producto dentro del carrito
    if (productIndex > -1) {
        cart.products[productIndex].quantity += 1
    } else {
        cart.products.push({ product: productAdd.id, quantity: 1 })
    }

    const carts = await this.getcart()
    const newCarts = carts.map(item => {
        if(item.id === cid) {
            return cart
        } else {
            return item
        }
    })
    await fs.promises.writeFile(this.path, JSON.stringify(newCarts, null, 2))
    return cart
}

}

