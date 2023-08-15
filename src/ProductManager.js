import fs from 'fs'

const path = './src/productos.json'
class productManager {
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

addProduct = async(product) =>{
    const productos = await this.getProduct()
    product.id = productos.length === 0 ? 1 : productos[productos.length-1].id + 1

    let productCode = productos.find(item => item.code === product.code)
    if(productCode){
        return console.log("El codigo de producto ya existe")
    }

    if(!product.title || !product.description || !product.price || !product.code || !product.thumbnail || !product.stock)
    return console.log("Todos los campos son requeridos")

    productos.push(product)
    await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'))
    return product
}

getProductbyId = async(id) =>{
    const productos = await this.getProduct()
    const productId = productos.find(product => product.id === id)

    if(!productId) return console.log("producto no existe")
    return productId
}

updateProduct = async(id, data) =>{
    const products = await this.getProduct()
    let isFound = false
    const newProducts = products.map(item => {
        if(item.id === id){
            isFound = true
            return{
                ...item, 
                ...data
            }
        } else return item   
    })

    if(!isFound) return console.log('Producto no existe')
    await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 2))
    console.log('Producto actualizado de forma correcta')
    
}

deleteProduct = async(id) => {
    const products = await this.getProduct()
    const productDelete = products.findIndex(product => product.id === id)

    if(productDelete === -1)return console.log('Producto no existe')
    
    products.splice(productDelete,1)
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
    console.log('Producto eliminado correctamente')  
}

}

export default productManager