
var productos =
    [
        {
            id: 1,
            nombre: "harina",
            precioUnitario: 35,
            cantidad: 9
        },
        {
            id: 2,
            nombre: "pan",
            precioUnitario: 25,
            cantidad: 120
        },
        {
            id: 3,
            nombre: "papa",
            precioUnitario: 52,
            cantidad: 20
        },
        {
            id: 4,
            nombre: "palta",
            precioUnitario: 55,
            cantidad: 23
        },
        {
            id: 5,
            nombre: "fideos",
            precioUnitario: 85,
            cantidad: 58
        },
        {
            id: 6,
            nombre: "aceite",
            precioUnitario: 350,
            cantidad: 85
        },
        {
            id: 7,
            nombre: "sopa",
            precioUnitario: 86,
            cantidad: 12
        },
    ];
//Array donde se cargan los productos comprados                      
var ProdComp = [];

//Calcula el total de la compra final
function totalCompra()
{
    // se obtiene el total calculando el precio por la cantidad comprada.
    var total = 0;
    ProdComp.forEach(unProducto =>
    {
        total += unProducto.precioUnitario * unProducto.cantidad;
    });
    // se actualiza el html con el nuevo total.
    var mensaje = document.getElementById('total');

    mensaje.innerHTML = `Total:  ${total}`;
}

//Al ser invocada crea un td
function createTd(text)
{
    var td = document.createElement('td');
    var txt = document.createTextNode(text);
    td.appendChild(txt);
    return td;
}

//Se crea un <td> que contendra un un button 
function createTdbutton(id, text, style, functionClick)
{
    var td = document.createElement('td');
    var btn = document.createElement('button');
    btn.classList.add('btn'); 
    btn.classList.add(style);
    
    btn.setAttribute('id', id);
    var txt = document.createTextNode(text);
    btn.appendChild(txt);
    
    btn.addEventListener("click", functionClick);
    td.appendChild(btn);

    return td;
}

//Crea un Td input
function createTdinput()
{
    var td = document.createElement('td');
    var input = document.createElement('input');
 
    input.setAttribute('type', 'text'); // type generico para los de tipo texto
    input.setAttribute('placeHolder', 'ingrese una cantidad'); // texto sugerido

    td.appendChild(input);
    return td;
}

//Crea los Tr con los Td dentro
function crearTrStock(producto)
{
    // Nombre
    var tdNombre = createTd(producto.nombre);
    // Precio
    var tdPrecio = createTd(producto.precioUnitario);
    // Cantidad
    var tdCantidad = createTd(producto.cantidad);
    // Boton
    var tdBoton = createTdbutton(producto.id, 'Comprar', 'btn-primary', agregarCarrito);
    // Input
    var tdInput = createTdinput();

    // se crea el <tr> y se le agregan sus <td>
    var tr = document.createElement('tr');
    tr.classList.add('text-center');
    tr.appendChild(tdNombre);
    tr.appendChild(tdPrecio);
    tr.appendChild(tdCantidad);

    tr.appendChild(tdInput);
    tr.appendChild(tdBoton);

    // Agrega al table tbody tablaStock
    var tbody = document.getElementById('tablaStock');
    tbody.appendChild(tr);
}

//Crea tabla compra
 
function createTrbuy(producto)
{
    // Nombre
    var tdNombre = createTd(producto.nombre);
    // Precio
    var tdPrecio = createTd(producto.precioUnitario);
    // Cantidad
    var tdCantidad = createTd(producto.cantidad);
    // Boton
    var tdBoton = createTdbutton(producto.id + 'delete', 'Borrar', 'btn-danger', borrarCarrito);
    // Subtotal
    var tdSubTotal = createTd(producto.precioUnitario * producto.cantidad);

    
    var tr = document.createElement('tr');
    tr.classList.add('text-center'); 
    tr.appendChild(tdNombre);
    tr.appendChild(tdPrecio);
    tr.appendChild(tdCantidad);

    tr.appendChild(tdSubTotal);
    tr.appendChild(tdBoton);

    var tbody = document.getElementById('table_buy');
    tbody.appendChild(tr);
}
//borra la compra del carrito
function borrarCarrito(e)
{
    // se obtiene el id del button
    var id_button = e.target.id;
    // el id de los botones para borrar productos comprados tiene el formato 'xxx_delete'
    // donde 'xxx'='id es el id del producto'.
    var idNroBoton = id_button.replace('_delete', '');
    // se obtiene el indice de un producto de acuerdo a su id.
    var index = ProdComp.findIndex(p => p.id == idNroBoton);
    // se borra el producto deseado del vector.
    ProdComp.splice(index, 1);

    // a partir de su id obtenemos el button
    var button = document.getElementById(id_button);
    // a partir del button obtenemos <td> -> <tr>
    var nodoTr = button.parentNode.parentNode; // <tr>

    // se obtienen todos los nodos del <tr> y se van borrando uno a uno
    nodoTr.childNodes.forEach(nodoTd => 
    {
        // se obtienen todos los nodos del <td> y se van borrando uno a uno
        nodoTd.childNodes.forEach(n =>
        {
            nodoTd.removeChild(n);
        });
    });

    // se actualiza el total de la compra.

}

//Agrega un producto al carrito
function agregarCarrito(e)
{
    
    var input = e.target.parentNode.previousSibling.firstChild;
    
    var cantaComp = input.value;

    
    if (cantaComp == '')
    {
        alert('debe ingresar un monto a comprar.');
        return;
    }
    if (cantaComp < 0)
    {
        alert('esta ingresando un numero negativo');
        return;
    }

    var idBoton = e.target.id;
    var indexComprados = ProdComp.findIndex(p => p.id == idBoton);
    if (indexComprados != -1)
    {
        alert('No se puede comprar 2 veces lo mismo');
        return;
    }
    var index = productos.findIndex(p => p.id == idBoton);
    var producto = productos[index];

    var id = producto.id;
    var nombre = producto.nombre;
    var cantidad = producto.cantidad;
    var precio = producto.precioUnitario;

    if (cantaComp > cantidad)
    {
        alert('No existe esa cantidad en stock');
        return;
    }

    var cantidad_html = e.target.parentNode.previousSibling.previousSibling.firstChild;
    var stock = cantidad - cantaComp;
    cantidad_html.textContent = stock;
    producto.cantidad = stock;

    var auxProd =
    {
        id: id,
        nombre: nombre,
        precioUnitario: precio,
        cantidad: cantaComp,
    };
    // se agrega el producto al array
    ProdComp.push(auxProd);
    createTrbuy(auxProd);
    // se actualiza el total de la compra.
}


// Inicio del 1er tbody stock super

productos.forEach(item =>
{
    crearTrStock(item);
});