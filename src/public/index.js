const socketclient = io()

const tablaProductos = document.getElementById('tablaRealTimeProductos')

document.getElementById('crearProducto').addEventListener('click', () => {
    const body = {
        title: document.getElementById('tittle').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        code: document.getElementById('code').value,
        stock: document.getElementById('stock').value,
        category: document.getElementById('category').value
    }
    fetch('/api/products', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(result => result.json())
        .then(result => {
            if(result.status === 'error') throw new Error(result.error)
        })
        .then(() => fetch('/api/products'))
        .then(result => result.json())
        .then(result => {
            if(result.status === 'error') throw new Error(result.error)
            socketclient.emit('listaProductos', result.payload)
            alert('el producto fue agregado de forma correcta \nLa vista se actualizará')
            document.getElementById('tittle').value = ''
            document.getElementById('description').value = ''
            document.getElementById('price').value = ''
            document.getElementById('code').value = ''
            document.getElementById('stock').value = ''
            document.getElementById('category').value = ''
        })
        .catch(err => alert(`Ocurrió un error \n${err}`))
})

eliminarProducto = (id) => {
    fetch(`/api/products/${id}`, {
        method: 'delete',
    })
        .then(result => result.json())
        .then(result => {
            if(result.status === 'error') throw new Error(result.error)
            socketclient.emit('listaProductos', result.payload)
            alert('El producto fue eliminado con éxito')
        })
        .catch(err => alert(`Ocurrió un error \n${err}`))
}

socketclient.on('productosActualizados', data => {
    tablaProductos.innerHTML = 
        `<tr>
            <td><strong>Producto</strong></td>
            <td><strong>Descripción</strong></td>
            <td><strong>Precio</strong></td>
            <td><strong>Código</strong></td>
            <td><strong>Stock</strong></td>
            <td><strong>Categoria</strong></td>
            <td></td>
        </tr>`;
        for (product of data){
            let tr = document.createElement('tr')
            tr.innerHTML=
                        `<td>${product.title}</td>
                        <td>${product.description}</td>
                        <td>${product.price}</td>
                        <td>${product.code}</td>
                        <td>${product.stock}</td>
                        <td>${product.category}</td>
                        <td><button class="btn btn-danger" type="button" onclick="eliminarProducto(${product.id})">Eliminar</button></td>
                        `;
            tablaProductos.getElementsByTagName('tbody')[0].appendChild(tr)
        }
})