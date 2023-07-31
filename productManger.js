//definir clase

class ProdductManager{
    #_products
    constructor() {
        this.#_products = [];
        //Defino el constructor "products"
    }


//Método para retornar productos 
getProducts = ()=> {
    return this.#_products;
}

addProduct = (product)=>{
  
    if(!product.title || !product.description || !product.price || !product.code || !product.thumbnail || !product.stock)
        return console.log("Todos los campos son requeridos")

    
    const productCode = this.#_products.find(item => item.code === product.code)
    if (productCode){
        return console.log("El codigo ya existe")
    }

    const productToAdd = { id: this.#getNextID(), ...product }
    this.#_products.push(productToAdd)
    return productToAdd
}

#getNextID(){
    if (this.#_products.length === 0) return 1
    return this.#_products[this.#_products.length -1].id+1 
    }


getProductByID = (idProduct) => {
    const productIndex = this.#_products.find(product => product.id === idProduct);

    if (!productIndex) return '[ERR] Not found'
    return productIndex
}
};

const manejadorProductos = new ProdductManager ();
manejadorProductos.addProduct({title:'Regla', description: 'se utiliza para medir', price: 10, thumbnail: 'sin imagen', code: 'ab154', stock: 20 })
manejadorProductos.addProduct({title:'Lapicero', description: 'Faber', price: 10, thumbnail: 'sin imagen', code: 'ab155', stock: 25 })
manejadorProductos.addProduct({title:'Regla', description: 'se utiliza para medir', price: 10, thumbnail: 'sin imagen', code: 'ab154', stock: 20 })
manejadorProductos.addProduct({title: '', description: 'se utiliza para imprimir', price: 100, thumbnail: 'sin imagen', code: 'ab156', stock: 100})



console.log(manejadorProductos.getProducts())
console.log(manejadorProductos.getProductByID(1))
console.log(manejadorProductos.getProductByID(50))



