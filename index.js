//id de las categorias
const categories = {
    all: 0,
    cajoneras: 1, 
    sillas_sillones: 2,
    mesas: 3,
    bancos_banquetas: 4,
    otros: 5,
}

//listado de categorias
const categoriesList = [
    "Cajoneras",
    "Sillas/Sillones",
    "Mesas",
    "Bancos/Banquetas",
    "Otros",
    "Buscar"
]

//listado de productos
const data = [
    {
        src: "multimedia/baul.jpeg", 
        title: "Baul",
        category: categories.cajoneras,
        codigo: 1,
        precio: 4500
    },
    {
        src: "multimedia/cama.jpeg", 
        title: "Cama",
        category: categories.sillas_sillones,
        codigo: 2,
        precio: 6000
    },
    {
        src: "multimedia/comoda.jpeg",
        title: "Comoda",
        category: categories.otros,
        codigo: 3,
        precio: 7753
    },
    {
        src: "multimedia/mesa.jpeg",
        title: "Mesa",
        category: categories.mesas,
        codigo: 4,
        precio: 5880
    },
    {
        src: "multimedia/mesita.jpeg",
        title: "Mesita",
        category: categories.mesas,
        codigo: 5,
        precio: 2000
    },
    {
        src: "multimedia/mueble.jpeg",
        title: "Mueble",
        category: categories.bancos_banquetas,
        codigo: 6,
        precio: 15000
    },
    {
        src: "multimedia/mesita2.jpeg",
        title: "Escritorio",
        category: categories.mesas,
        codigo: 7,
        precio: 6500
    },
    {
        src: "multimedia/perchero.jpeg",
        title: "Perchero",
        category: categories.otros,
        codigo: 8,
        precio: 34200
    },
    {
        src: "multimedia/respaldo.jpeg",
        title: "Respaldo",
        category: categories.otros,
        codigo: 9,
        precio: 6000
    },
]

//cargo las categorias
const loadCategories = () => { 
    //traigo el nodo Ul al cual quiero agregar las categorias 
    const categorieListUl = document.getElementById('categorias_lista')  

    //itero por cada categoria creando un li element con el nombre de la categoria y asignando el evento correspondiente
    for (const categoryName of categoriesList) {
        //creo el id de la categoria 
        const posicionArray = categoriesList.indexOf(categoryName)
        const categoyId = posicionArray + 1

        //creo el li y le seteo nombre y atributo categoria 
        const categoryLi = document.createElement("li")
        categoryLi.textContent = categoryName
        categoryLi.setAttribute("category", categoyId)
        
        //dado que el buscar es un caso particular el cual lleva un evento distinto. Utilizo un condicional segun corresponda
        if (categoryName == 'Buscar' ) {
            categoryLi.addEventListener("click", openSearch)
        } else {
            categoryLi.addEventListener("click", () => filterData(categoyId))
        }

        //agrego el li dentro del ul
        categorieListUl.appendChild(categoryLi)
    }
}

const handleBuyBtnClick = (producto) => {
    agregarAlCarrito(producto);
    Swal.fire({
        position: 'top-center',
        icon: 'success',
        color: '#d4a373',
        title: 'El producto se ha agregado correctamente al carrito!',
        showConfirmButton: false,
        timer: 1000
    })
}

let displayData = data

let currentCategory = categories.all;

let searchText 

const initialize = () => {
    const productsContainer = document.getElementById("productos")
    if (productsContainer.childElementCount > 0 ) {
        deleteChildren(productsContainer);
        productsContainer.innerHTML = ""
    }

    if (currentCategory != categories.all) {
        displayData = data.filter((obj) => obj.category == currentCategory)
        
        const categoriasLista = document.getElementById("categorias_lista")
        for (const cat of categoriasLista.children) {
            if (currentCategory == cat.getAttribute("category")){
                cat.className = "selected_category"
                break
            }
        }
    }


    if (searchText != null) {
        displayData = displayData.filter((obj) => obj.title.toLowerCase().includes(searchText.toLowerCase()))
    }
    console.log("Se encontraron ", displayData.length, " resultados")


    for (const obj of displayData){
        const div = document.createElement("div")
        div.style.textAlign = "center"
        
        const p = document.createElement("p")
        p.textContent = obj.title

        const imgElement = document.createElement("img")
        imgElement.className = "articulo"
        imgElement.src = obj.src
        imgElement.title = obj.title

        const precio = document.createElement("p")
        precio.textContent = "$"+obj.precio
        precio.className = "texto"

        //creo el boton
        const buyButton = document.createElement("button")
        buyButton.textContent = "Comprar"
        buyButton.className = 'btn'
        buyButton.id = `boton${obj.codigo}`
        buyButton.addEventListener('click', () => {
            handleBuyBtnClick(obj)
        })

        div.appendChild(imgElement)
        div.appendChild(p)
        div.appendChild(precio)
        div.appendChild(buyButton)
        productsContainer.appendChild(div)
    }
}


const deleteChildren = (element) => {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child)
        child = element.lastElementChild
    }
}

const filterData = (category) => {
    searchText = null
    clearCategoriesClasses()
    if (currentCategory == category){
        currentCategory = categories.all
        displayData = data
    } else {
        currentCategory = category;
    }
    initialize() 
}

const clearCategoriesClasses = () => {
    const categoriasLista = document.getElementById("categorias_lista")
    for (const cat of categoriasLista.children) {
        cat.className = ""
    }
} 

initialize()

//opcion de buscar
const openSearch =() => {
    const Text = prompt("ingresar el nombre del producto");
    searchText = Text;
    initialize()
}


loadCategories()


//CARRITO


let carrito=[];


//actualizar carrito 
const agregarAlCarrito = (nuevoProducto) => {
    //verifico si el producto ya se encuentra en el carrito
    const findProducto = carrito.find(e => e.codigo === nuevoProducto.codigo)
    //si el producto no esta en el carrito 
    if (!findProducto) {
        carrito.push({codigo: nuevoProducto.codigo, title: nuevoProducto.title, precio: nuevoProducto.precio, cantidad: 1});
    //si el producto ya esta en el carrito
    } else {
        const index = carrito.indexOf(findProducto) //saco el indice del producto en el carrito
        carrito[index].cantidad++ //aumento la cantidad de producto en el carrito
    }

    console.log(carrito);

    actualizarCarrito()
}

const actualizarCarrito = () => {
    const tabla = document.getElementById("tablaCarrito")
    tabla.innerHTML = ""

    carrito.forEach((producto) => {
        const id = `btnEliminar${producto.codigo}`

        tabla.innerHTML+=`
            <tr>
                <td class="text-center">${producto.title}</td>
                <td class="text-center">$${producto.precio}</td>
                <td class="text-center">${producto.cantidad}</td>
                <td class="text-center">$${producto.precio * producto.cantidad}</td>
                <td class="text-center"> 
                    <button class="btn" onclick="borrarProductoCarrito(${producto.codigo})" id="${id}">Eliminar</button>
                </td>
            </tr>
        `;
    })

    //Sacar Total
    const totalCarrito = document.getElementById("total")
    const total = carrito.map(producto => producto.precio * producto.cantidad).reduce((ant, actual) => ant + actual, 0)
    totalCarrito.innerHTML = ""

    totalCarrito.innerHTML+=`
        <tr>
            <td class="text-center">$${total}</td>
        </tr>
    `
    
    localStorage.setItem("carrito",JSON.stringify(carrito));
}



//borrar el producto del carrito

const borrarProductoCarrito = (codigo) => {
    const producto = carrito.find(x => x.codigo === codigo)
    carrito = carrito.filter(item => item.codigo !== producto.codigo)
    actualizarCarrito()
}

//cargar carrito del localstorage
const traerCarritoDelLocalStorage = () => {

    const productosCarritoJson = localStorage.getItem("carrito")

    if(!productosCarritoJson) return

    const productosLocalStorage = JSON.parse(productosCarritoJson);
    for (const producto of productosLocalStorage) {
        agregarAlCarrito(producto)
    }
    
}


//vaciar carrito
const vaciarCarrito = () => {
    carrito = []
    localStorage.removeItem("carrito")
    document.getElementById("tablaCarrito").innerHTML = ""
    document.getElementById("total").innerHTML = ""
    //sweet alert
    Swal.fire({
        position: 'top-center',
        icon: 'success',
        color: '#d4a373',
        title: 'Tu carrito se encuentra vacio',
        showConfirmButton: true,
    })
}

document.getElementById("btn-clear-cart").addEventListener("click", vaciarCarrito)

//finalizar compra
const finalizarCompra = () => {
    carrito = []
    localStorage.removeItem("carrito")
    document.getElementById("tablaCarrito").innerHTML = ""
    document.getElementById("total").innerHTML = ""
    //sweet alert
    Swal.fire({
        icon: 'success',
        color: '#d4a373',
        title: 'Finalizaste tu compra!',
        showConfirmButton: true,
    })
}

document.getElementById("btn-finish-sale").addEventListener("click", finalizarCompra)


traerCarritoDelLocalStorage()



//NEWSLETTER


// Seleccionar del formulario HTML y agregar evento al submit  

const form = document.getElementById('formulario');

form.addEventListener('submit', function(e) {
    e.preventDefault()
    
    const newsletter = new FormData(form);

    const informacion = {
        service_id: 'service_dj7wgh8',
        template_id: 'newsletter',
        user_id: 'b44itgFoaTvzypoth',
    };

//creo el fetch para pegarle a la API con metodo POST y enviar el mail 

    fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        body: JSON.stringify(informacion),
        headers: {
            'contentType': 'application/json; charset=UTF-8',
        },
    })
    .then(res => res.json())
    .then(informacion => console.log(informacion))

})
























