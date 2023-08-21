import fs from 'fs'

const path = './data/productos.json'
export class ProductManager {
    constructor(path){
        this.path = path
    }


getProduct = async() => {
    try {
        if (fs.existsSync(path)) {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            let productos = JSON.parse(data)
            return productos
        } else {
            return [];
        } 
    } catch (error) {
        console.log(error)
    }
}

getProductbyId = async(id) =>{
    const productos = await this.getProduct()
    const productId = productos.find(product => product.id === id)
    if (!productId) return '[404] Producto no encontrado'
    return productId
}

generateID(products) {
    return (products.length === 0) ? 1 : products[products.length - 1 ].id + 1
}

addProduct = async(product) =>{
    const products = await this.getProduct()
    
    //validar codigo de producto
    const productCode = products.find(item => item.code === product.code)
    if(productCode) return '[500] Codigo de producto ya existe'

    //validar que ningun campo este vacío
    if(!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category)
    return '[500] Todos los campos son requeridos'

    const productoAdd = { 
        id: this.generateID(products),
        ... product,
        status: true,
        thumbnails: []
    }
    products.push(productoAdd)
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
    return productoAdd
}

updateProduct = async(id, data) =>{
    const products = await this.getProduct()
    const indexProduct = products.findIndex(item => item.id == id)
    if(indexProduct < 0) return '[404] Producto no encontrado'

    const newProducts = products.map(item => {
        if(item.id === id){
            return{
                ...item, 
                ...data
            }
        } else return item   
    })
    
    await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 2))
    return await this.getProductbyId(id)   
}

deleteProduct = async(id) => {
    const products = await this.getProduct()
    const productDelete = products.findIndex(product => product.id === id)
    if (productDelete === -1) return '[404] Producto no encontrado'

    products.splice(productDelete,1)
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
    
}

}

