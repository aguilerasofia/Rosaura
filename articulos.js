//traigo los articulos de un archivo json a la pagina de productos
const traerArticulos = () => {
    const origen = "articulos.json"
    
    fetch(origen)
    
    .then((respuesta) => respuesta.json())
    .then((info) => {
        let articulos = info.articulos
        for (const articulo of articulos) {
            const contenedorArticulos = document.getElementById("articulos")
            contenedorArticulos.className= "galeria_productos"
            contenedorArticulos.innerHTML+=`
            <div class="producto">
            <img src="${articulo.img}" class="img_producto" alt="${articulo.title}">
            <span class="texto" > ${articulo.title} </span>
            <span class="texto" > ${articulo.medidas} </span>
            </div>
            `
        }
    })
}

//llamada a la funcion
traerArticulos ()













