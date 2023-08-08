const productManager = require('./ProductManager')

const mp = new productManager ('./productos.json')

const prueba = async() =>{
    console.log(await mp.getProduct());

    const product = {
        title: 'producto prueba', 
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'sin imagen',
        code: 'abc123', 
        stock: 25
        
    };
    await mp.addProduct(product);
    console.log(await mp.getProduct());
    
    console.log(await mp.getProductbyId(1));
    
    await mp.updateProduct(1, {
        title: 'producto prueba actualizado', 
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'sin imagen',
        code: 'abc123', 
        stock: 25
    })
    console.log(await mp.getProduct());

    console.log(await mp.deleteProduct(1));
}

prueba()