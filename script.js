/*
  * Hacer un sistema para restaurant.
  * Para esto necesitamos.
  * 1. Lista de mesas - agregar, eliminar
  * 2. Lista de productos con precio - Agregar, eliminar, modificar
  * 
  * Y que nos permita obtener
  * 3. Una cuenta por mesa (la mesa se abre, se cargan los productos, y 
  * se cierra pidiendo el total consumido. Lista de cuentas con objetos)
  * 4. Obtener el producto mas vendido
  * 
  * Las funciones deben tener validaciones correspondientes.
  * 
  * Y esto debe estar todo accesible desde una pagina web.
  * TESTS de las funciones que no requieran DOM
  * 
  * En el GUI (graphical user interface, o interfaz grafica de usuario), o sea
  * la pagina, vamos a tener varias acciones relacionadas a inputs.
  * Resetear el valor de los inputs cada vez que hago click en el boton que le 
  * corresponde al input. O sea, si agrego un nuevo numero de mesa, el input
  * debe quedar vacio una vez agregado.
  * 
  * Por ultimo, puede hacerse con objetos o con clases.
*/
//esta funcion agrega la <option> al [select]
const agregarOption = (nroMesa) => {
    //nos traemos el selected de "Agregar Productos a Mesa"
    const tSelected = document.querySelector("#elegirMesa");
    const newOption = document.createElement("option");
    
    //validamos q no este abierta
    mesasAbiertas.validarMesaYaAbierta(nroMesa);

    //generamos la nueva <option> en el [select]
    newOption.innerText = `Mesa nro. ${nroMesa}`;
    newOption.value = nroMesa;
    newOption.id = `Mesa-${nroMesa}`; 
    tSelected.appendChild(newOption);
}

const eliminarOption = (nroMesa) => {
    const optionAeliminar = document.querySelector(`#Mesa-${nroMesa}`);
    optionAeliminar.remove();
}

//El evento del boton: (abrir Mesa)
const abrirMesa = event => {

    //toma la tabla de la card "Mesas"
    const tbody = document.querySelector("#lista-mesas");
    const trow = document.createElement("tr");
    trow.className ="tr-style";
    
    //ingresa el nro de mesa por [Text de NroMesa]
    const input = document.querySelector("#input-mesa");
    const tMesa = document.createElement("td");
    tMesa.innerText = input.value;
    agregarOption(input.value);
    
    const newMesa = new Mesa(input.value);
    mesasAbiertas.agregar(newMesa);

    //crea la celda destinada al precio
    const tPrecio = document.createElement("td");
    tPrecio.innerText = newMesa.cuentaMesa; //el getter se utiliza como propiedad
    

    //agrega boton cerrar
    const tButton = document.createElement("td");
    const button = document.createElement("button");
    button.innerText = "Cerrar";
    button.className ="button green";



    trow.appendChild(tMesa);
    trow.appendChild(tPrecio);
    tButton.appendChild(button);
    trow.appendChild(tButton);
    tbody.appendChild(trow);
    
    //evento para button (cerrar Mesa)
    const cerrarMesa = () =>{
        mesasAbiertas.eliminar(Number(tMesa.textContent));
        eliminarOption(tMesa.textContent);
        trow.remove();
    }
    
    button.addEventListener("click", cerrarMesa);
}

//Este es el evento para el boton (agregar a Mesa)
const agregarAMesa = event => {
}
//let nextId = 1;
//evento para (agregar Producto)
const agregarProducto = () =>{
    //get la tabla del HTML 
    const listaProd = document.querySelector("#lista-productos");
    const trow = document.createElement("tr");
    trow.className = "tr-style";
    //boton
    const tButton = document.createElement("td");
    const button = document.createElement("button");
    button.innerText = "Eliminar";
    button.className = "button green"
    button.style.backgroundColor = "#da1e37";
    
    
    //informacion que ingrese por html
    //input de producto
    const inputProducto = document.querySelector("#input-producto");
    const tProducto = document.createElement("td");
    tProducto.innerText = inputProducto.value;
    //input de precio
    const inputPrecio = document.querySelector("#input-precio");
    const tPrecio = document.createElement("td");
    tPrecio.innerText = inputPrecio.value;
    //celda del ID
    const tId = document.createElement("td"); //esto si
    tId.innerText = `${menu.nextId}`; //esto si va

    //creo el producto
    const nuevoProducto = new Producto(menu.nextId, inputProducto.value, inputPrecio.value);
    menu.agregarProducto(nuevoProducto); //menu.lista=[nuevoProducto]
    console.log(`El nuevo producto se ha agregado al menu.\n`);
    console.log(`El menu es:`, menu.lista);
    
    //TODO - hay que agregar los mismos elementos a la "Cargar Productos Mesa"
        //agregarAProductosDisponibles(nuevoProducto);
        //E M P E Z A R    P O R    A C A
        //Hay que automatizar que al "agregarNuevoProducto" se actualice la
        //lista de productos disponibles en "Cargar Productos a Mesa"

    //agregar elementos
    trow.appendChild(tId);
    trow.appendChild(tProducto);
    trow.appendChild(tPrecio);
    trow.appendChild(tButton);
    tButton.appendChild(button);
    listaProd.appendChild(trow);

    //evento asignado al boton (eliminar)
    const eliminarProducto = () =>{
        menu.eliminarProducto(Number(tId.textContent));
        trow.remove();
        //TODO
        //self?
        //menu.nextId--;
    }
    button.addEventListener("click", eliminarProducto);
    
}


const loadEvents = () =>{
    document.querySelector("#abrir-mesa").addEventListener("click", abrirMesa);
    document.querySelector("#agrega-producto").addEventListener("click",agregarProducto);
}