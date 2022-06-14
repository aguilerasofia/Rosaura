const categories = {
    all: 0,
    cajoneras: 1, 
    sillas_sillones: 2,
    mesas: 3,
    bancos_banquetas: 4,
    otros: 5,
}

const categoriesList = [
    "Cajoneras",
    "Sillas/Sillones",
    "Mesas",
    "Bancos/Banquetas",
    "Otros",
    "Buscar"
]

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


const data = [
    {
        src: "multimedia/baul.jpeg", 
        title: "Baul",
        category: categories.cajoneras,
    },
    {
        src: "multimedia/cama.jpeg", 
        title: "Cama",
        category: categories.sillas_sillones,
    },
    {
        src: "multimedia/comoda.jpeg",
        title: "Comoda",
        category: categories.otros,
    },
    {
        src: "multimedia/mesa.jpeg",
        title: "Mesa",
        category: categories.mesas,
    },
    {
        src: "multimedia/mesita.jpeg",
        title: "Mesita",
        category: categories.mesas,
    },
    {
        src: "multimedia/mueble.jpeg",
        title: "Mueble",
        category: categories.bancos_banquetas,
    },
    {
        src: "multimedia/mesita2.jpeg",
        title: "Mesita2",
        category: categories.mesas,
    },
    {
        src: "multimedia/perchero.jpeg",
        title: "Perchero",
        category: categories.otros,
    },
    {
        src: "multimedia/respaldo.jpeg",
        title: "Respaldo",
        category: categories.otros,
    },
]

let displayData = data

let currentCategory = categories.all;

let searchText 

const initialize = () => {
    const productsContainer = document.getElementById("productos")
    if (productsContainer.childElementCount > 0 ) {
        deleteChildren(productsContainer);
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

        div.appendChild(imgElement)
        div.appendChild(p)
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

const openSearch =() => {
    const Text = prompt("ingresar el nombre del producto");
    searchText = Text;
    initialize()
}


loadCategories()
