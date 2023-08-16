


function seleccionarValor(elemento) {
    elemento.select();
}

/******** ESTABLECER NUEVA CONTRASEÑA ********/
function establecerNuevaContraseñaModal() {
    let usr = localStorage.getItem("usr");
    let contra = localStorage.getItem("password");

    if (usr == contra) {
        const modal = document.getElementById('establecerNuevaContraseñaModal');
        
        const confirmMessage = document.getElementById('establecerNuevaContraseña_confirm-message');
        confirmMessage.textContent = `¡Bienvenido '${usr}'!`;

        modal.style.display = 'flex';
        
        document.getElementById("establecerNuevaContraseñaForm").addEventListener("submit", function(event) {
            let password = modal.querySelector('[name="psw1"]').value;
            let confirmPassword = modal.querySelector('[name="psw2"]').value;
        
            if (password === confirmPassword) {

                if (password != contra) {                    
                    establecerNuevaContraseña(usr, password, modal);
                    event.preventDefault();

                } else {
                    document.getElementById("message").innerText = "No puedes usar está contraseña.";
                    event.preventDefault();
                }
                
            } else {
                document.getElementById("message").innerText = "Las contraseñas no coinciden. Inténtalo de nuevo.";
                event.preventDefault(); // Evita que el formulario se envíe
            }
        });
    }
}
function establecerNuevaContraseña(usr, password, modal) {
    $.ajax({
        type: "POST",
        url: "php/establecerNuevaContraseña.php",
        data: { usr: usr, password: password },
        success: function (response) {
            localStorage.setItem('contra', response);
            
            document.getElementById("establecerNuevaContraseñaForm").removeEventListener("submit", handleSubmit); // Elimina el eventListener
        },
        error: function () {
            // Ocurrió un error al hacer la solicitud
            document.getElementById("message").innerText = "Inténtalo de nuevo mas tarde.";
        }
    });
    modal.style.display = 'none';
}
$(document).ready(establecerNuevaContraseñaModal());

/*****************************/
/*****************************/
/******** FACTURACIÓN ********/
/*****************************/
/*****************************/
function consultaCodigo(fila) {
    let value = $('#' + fila).find('input[name="codigo"]').val();

    $.ajax({
        type: "POST",
        url: "php/busquedaProductos.php",
        data: { value: value },
        dataType: 'json',

        success: function (datos) {
            if (datos['encontroProducto'] == 1) {
                $('#' + fila).find('.detalle').html(datos['detalle']);
                $('#' + fila).find('.producto').html(datos['producto']);
                $('#' + fila).find('.precioUnitario').html('$ ' + datos['precio'].toLocaleString('es-AR'));
            } else {
                
                $('#' + fila).find('.detalle').html('');
                $('#' + fila).find('.producto').html('');
                $('#' + fila).find('.precioUnitario').html('');
            }
            calcularSubTotal(fila);
        }
    });
}
function agregarLineasDeFacturacion() {
    const productosEnFactura = document.querySelector('#cuerpoTabla');

    let cuerpoTabla = document.getElementById('cuerpoTabla');
    let id = cuerpoTabla.querySelectorAll("tr");

    let ultimoID = id.length + 1;

    productosEnFactura.innerHTML += `
            <tr id="${ultimoID}">
                    <td class="codigo">
                            <input autofocus="" name="codigo"
                                    onkeypress="movimientoTablaPorEnter(${ultimoID}, 'codigo', event);"
                                    onkeydown="movimientosTablaConFlechas(${ultimoID}, 'codigo');"
                                    onblur="consultaCodigo('${ultimoID}')">
                    </td>
                    <td class="cantidad">
                        <input type="text" value="1.00" name="cantidad"
                                onkeypress="movimientoTablaPorEnter(${ultimoID}, 'cantidad', event);"
                                onkeydown="movimientosTablaConFlechas(${ultimoID}, 'cantidad');"
                                onblur="calcularSubTotal('${ultimoID}');">
                    </td>
                    <td class="producto"></td>
                    <td class="detalle"></td>
                    <td class="precioUnitario"></td>
                    <td class="precioVariable">
                        <input onkeypress="movimientoTablaPorEnter(${ultimoID}, 'precioVariable', event);"
                                onkeydown="movimientosTablaConFlechas(${ultimoID}, 'precioVariable');"
                                onblur="calcularSubTotal('${ultimoID}');"
                                name="precioVariable">
                    </td>
                    <td class="subTotal"></td>
            </tr>
        `;
}

/******************************/
/********* MOVIMIENTO *********/
/******************************/
function movimientoTablaPorEnter(filaActiva, columnaActiva, e) {
    //Pasa el evento y ubicación

    if (e.keyCode == '13') { //Determina si fue un 'Enter'

        let cuerpoTabla = document.getElementById('cuerpoTabla');
        let id = cuerpoTabla.querySelectorAll("tr");

        filaActiva += 1;


        if (filaActiva >= id.length) {
            agregarLineasDeFacturacion();
        }

        let filaNueva = document.getElementById(filaActiva.toString());
        filaNueva.querySelector('input[name="' + columnaActiva + '"]').focus();
        filaNueva.querySelector('input[name="' + columnaActiva + '"]').select();

        consultaCodigo(filaActiva.toString());
    }
}
function movimientosTablaConFlechas(filaActiva, columnaActiva) {
    e = document.onkeydown; //Toma la flecha utilizada
    e = e || window.event; //No se que hace, pero sino no funca


    if (e.keyCode == '38') { //Arriba
        if (filaActiva != 1) {
            filaActiva -= 1;

            let filaNueva = document.getElementById(filaActiva.toString());
            filaNueva.querySelector('input[name="' + columnaActiva + '"]').focus();
            filaNueva.querySelector('input[name="' + columnaActiva + '"]').select();
        }
    }

    else if (e.keyCode == '40') { //Abajo
        filaActiva += 1;

        let filaNueva = document.getElementById(filaActiva.toString());
        filaNueva.querySelector('input[name="' + columnaActiva + '"]').focus();
        filaNueva.querySelector('input[name="' + columnaActiva + '"]').select();

    }
    else if (e.keyCode == '37') { //Izquierda

        if (columnaActiva === 'codigo') {
            columnaActiva = 'precioVariable';

        } else if (columnaActiva === 'cantidad') {
            columnaActiva = 'codigo';

        } else if (columnaActiva === 'precioVariable') {
            columnaActiva = 'cantidad';
        }

        let filaNueva = document.getElementById(filaActiva.toString());
        filaNueva.querySelector('input[name="' + columnaActiva + '"]').focus();
        filaNueva.querySelector('input[name="' + columnaActiva + '"]').select();

    }
    else if (e.keyCode == '39') { //Derecha

        if (columnaActiva === 'codigo') {
            columnaActiva = 'cantidad';

        } else if (columnaActiva === 'cantidad') {
            columnaActiva = 'precioVariable';

        } else if (columnaActiva === 'precioVariable') {
            columnaActiva = 'codigo';
        }

        let filaNueva = document.getElementById(filaActiva.toString());
        filaNueva.querySelector('input[name="' + columnaActiva + '"]').focus();
    }
}

/******************************/
/********** CALCULOS **********/
/******************************/
function calcularSubTotal(filaId) {
    let precioVariableInput = $('#' + filaId).find('input[name="precioVariable"]');
    let precioVariable = parseFloat(precioVariableInput.val().replace(',', '.'));

    if (isNaN(precioVariable)) {
        precioVariable = 0;
    }

    let cantidadInput = $('#' + filaId).find('input[name="cantidad"]');
    let cantidad = parseFloat(cantidadInput.val().replace(',', '.'));

    if (isNaN(cantidad)) {
        cantidad = 0;
    }

    if (precioVariable === 0) {
        let precioPorProducto = $('#' + filaId).find('.precioUnitario').text();
        precioPorProducto = parseFloat(precioPorProducto.replace(/[^\d.-]/g, '')); // Remueve cualquier caracter no numérico
        
        if (isNaN(precioPorProducto)) {
            precioPorProducto = 0;
        }
        
        let subTotal = precioPorProducto * cantidad;
        
        $('#' + filaId).find('.subTotal').html('$ ' + subTotal.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    } else {
        let subTotal = precioVariable * cantidad;
        
        $('#' + filaId).find('.subTotal').html('$ ' + subTotal.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }

    calcularTotal();
}
function calcularTotal() {
    let cuerpoTabla = document.getElementById('cuerpoTabla');
    let filas = cuerpoTabla.querySelectorAll("tr");
    let nuevoTotal = 0;

    filas.forEach(fila => {
        let subTotalFila = $('#' + fila.id).find('.subTotal').text();
        subTotalFila = subTotalFila.replace(',', '.');
        subTotalFila = parseFloat(subTotalFila.replace(/[^0-9.-]/g, '')); // Remueve cualquier caracter no numérico

        if (!isNaN(subTotalFila)) {
            nuevoTotal += subTotalFila;
        }
    });

    $('#total').html('$ ' + nuevoTotal.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
}

/*****************************/
/********** BOTONES **********/
/*****************************/
function borrar() {
    let cuerpoTabla = document.getElementById('cuerpoTabla');
    let fila = cuerpoTabla.querySelectorAll("tr");

    fila = Number(fila.length);

    while (fila >= 1) {
        let div = document.getElementById(fila);

        div.querySelector('input[name="codigo"]').value = '';
        $('#' + fila).find('.detalle').html('');
        $('#' + fila).find('.producto').html('');
        $('#' + fila).find('.precioUnitario').html('');
        div.querySelector('input[name="cantidad"]').value = 1.00;
        div.querySelector('input[name="precioVariable"]').value = '';

        //Eliminamos caulquier elemento NO numeríco y lo convertimos a número
        calcularSubTotal(fila);
        fila -= 1;
    }
    
}
function guardar() {
    const modal = document.getElementById('guardarFacturaModal');
    const nombreInput = document.getElementById('nombreUsuarioCrear'); // Capturar el input de clase text

    modal.style.display = 'flex';
    
    const confirmarBtn = document.getElementById('confirmarBtn');
    const cancelarBtn = document.getElementById('cancelarBtn');
    
    
    const confirmarClickHandler = function () {
        modal.style.display = 'none';
        usuarioCrear(nombreInput.value);

        confirmarBtn.removeEventListener('click', confirmarClickHandler);
    };
    
    const cancelarClickHandler = function () {
        modal.style.display = 'none';
        cancelarBtn.removeEventListener('click', cancelarClickHandler);
    };

    // Vincular los nuevos manejadores de eventos
    confirmarBtn.addEventListener('click', confirmarClickHandler);
    cancelarBtn.addEventListener('click', cancelarClickHandler);
}




// falta una variable con el id de la ultima fila de la tabla

// .select(); hacer que cuando entres a un input con información esta se autoseleccione y nos permita movernos con flechitas por el campo sin movernos otra casilla.
// Habria que tener un div que se seleccione primero, y en caso de escribir algo se pase al input. Y se pasaria todo el movimiento de las flechas al div.
// Cuando estes con la cantidad podes sumar con las flechas.
// Cuando tocas enter te manda al código de abajo.

//Y hay que ver como funciona lo de precio variable en el sistema antiguo, si anula o se suma al precio unitario.
/*
 function agregarLineasDeFacturacion() {
    const productosEnFactura = document.querySelector('#cuerpoTabla');
    let ultimoID = 0;
    if (localStorage.getItem("ultimoID") == null){
        localStorage.setItem("ultimoID", 5);
    } else {
        localStorage.setItem("ultimoID", localStorage.getItem("ultimoID")+1);
    }

    while (ultimoID != localStorage.getItem("ultimoID")) {
        ultimoID += 1;
        productosEnFactura.innerHTML += `
            <tr> 
                <td class="codigo"><div><input autofocus id="${ultimoID}0" oncontextmenu="agregadoListaCompras('${ultimoID}0', event);" onkeypress="movimientoTablaPorEnter(${ultimoID}, 0, event);" onkeydown="movimientosTablaConFlechas(${ultimoID}, 0);"></div></td> 
                <td class="cantidad"><input id="${ultimoID}1" value="1" onkeypress="movimientoTablaPorEnter(${ultimoID}, 1, event);" onkeydown="movimientosTablaConFlechas(${ultimoID}, 1);"></td>
                <td class="producto" id="${ultimoID}2">Alfajor Tofi</td> 
                <td class="detalle" id="${ultimoID}3">45g</td>
                <td class="precioUnitario" id="${ultimoID}4">$2.300</td> 
                <td class="precioVariable"><input id="${ultimoID}5" onkeypress="movimientoTablaPorEnter(${ultimoID}, 5, event);" onkeydown="movimientosTablaConFlechas(${ultimoID}, 5);"></td>
                <td class="subTotal" id="${ultimoID}6">$7.000</td>
            </tr>
        `
    }
    localStorage.setItem("ultimoID", ultimoID);
}
*/

/*******************************/
/*******************************/
/******** CONFIGURACIÓN ********/
/*******************************/
/*******************************/
function abrirConfiguracion() {
    cargarContenidoRegistro();

    let configuracionElement = document.getElementById('configuracion');
    configuracionElement.style.display = "flex";

    let contenidoElement = configuracionElement.querySelector('section');

    // Agregar un manejador de clic al documento
    const confirmarCerrarConfirmacion = function(event) {
        // Verificar si el clic ocurrió dentro o fuera del elemento de contenido
        if (!contenidoElement.contains(event.target) && configuracionElement.contains(event.target)) {
            // Cerrar el elemento de configuración
            configuracionElement.style.display = 'none';
            document.removeEventListener('click', confirmarCerrarConfirmacion); // Corrección aquí
        }
    };
    // Vincular los nuevos manejadores de eventos
    document.addEventListener('click', confirmarCerrarConfirmacion); // Corrección aquí
}
function botonNavbar(ubicacionInicial) {
    if (ubicacionInicial == "registro") {
        registro.style.display="inherit";
        categorias.style.display="None";
        pagos.style.display="None";

        navRegistro.style.color="#6DA3F7";
        navCategorias.style.color="black";
        navPagos.style.color="black";     

    } else if (ubicacionInicial == "categorias") {
        registro.style.display="None";
        categorias.style.display="inherit";
        pagos.style.display="None";

        navRegistro.style.color="black";
        navCategorias.style.color="#6DA3F7";
        navPagos.style.color="black";

        cargarContenidoCategorias();

    } else if (ubicacionInicial == "pagos") {
        registro.style.display="None";
        categorias.style.display="None";
        pagos.style.display="inherit";

        navRegistro.style.color="black";
        navCategorias.style.color="black";
        navPagos.style.color="#6DA3F7";        
    }
}

/********************************/
/*********** USUARIOS ***********/
/********************************/
function cargarContenidoRegistro() {
    let value = 'cargarUsuarios';

    $.ajax({
        type: "POST",
        url: "php/configuracion/cargarContenidoRegistro.php",
        data: { value: value },
        dataType: 'json',
        success: function (datos) {
            $("#usuariosExistentes").empty();

            for (let i = 0; i < datos.length; i++) {
                let elemento = datos[i];
                if (elemento.id_rol == 1) {
                    let html = `
                        <form id="miFormulario" onsubmit="mostrarModalA(this, event); return false;">
                            <input type="text" placeholder="Usuario" name="usuario" value="${elemento.nombre}" readonly>

                            <button type="submit" name="restablecer">
                                <span class="material-symbols-outlined">settings_backup_restore</span>
                            </button>
                            <button type="submit" name="eliminar">
                                <span class="material-symbols-outlined borrar">delete</span>
                            </button>
                        </form>
                    `;                
                    $("#usuariosExistentes").append(html);
                }            
            }
        },
        error: function () {
            // Ocurrió un error al hacer la solicitud
            alert("Error al obtener los datos.");
        }
    });
}

/************* CREACIÓN *************/
function mostrarModal() {
    const modal = document.getElementById('modal');
    const nombreInput = document.getElementById('nombreUsuarioCrear'); // Capturar el input de clase text
    const confirmMessage = document.getElementById('confirm-message');
    
    confirmMessage.textContent = `¿Estás seguro de que deseas crear el usuario '${nombreInput.value}'?`;

    modal.style.display = 'flex';
    
    const confirmarBtn = document.getElementById('confirmarBtn');
    const cancelarBtn = document.getElementById('cancelarBtn');
    
    
    const confirmarClickHandler = function () {
        modal.style.display = 'none';
        usuarioCrear(nombreInput.value);

        confirmarBtn.removeEventListener('click', confirmarClickHandler);
    };
    
    const cancelarClickHandler = function () {
        modal.style.display = 'none';
        cancelarBtn.removeEventListener('click', cancelarClickHandler);
    };

    // Vincular los nuevos manejadores de eventos
    confirmarBtn.addEventListener('click', confirmarClickHandler);
    cancelarBtn.addEventListener('click', cancelarClickHandler);
}
function usuarioCrear(usuario) {   
    $.ajax({
        type: "POST",
        url: "php/configuracion/usuarioCrear.php",
        data: { usuario: usuario },
        success: function (respuesta) {
            cargarContenidoRegistro();
            alert(respuesta);
        },
        error: function () {
            // Ocurrió un error al hacer la solicitud
            alert("Error al realizar la operación.");
        }
    });
}

/********* RESTABLECIMIENTO Y ELIMINACIÓN *********/
function mostrarModalA(form, event) {
    const modal = document.getElementById('modal');
    const nombreInput = form.querySelector('[name="usuario"]');
    const confirmMessage = document.getElementById('confirm-message');
  
    const botonPresionado = event.submitter.name;

    if (botonPresionado === 'restablecer') {
        confirmMessage.textContent = `¿Estás seguro de que deseas restablecer la contraseña del usuario '${nombreInput.value}'?`;

    } else if (botonPresionado === 'eliminar') {
        confirmMessage.textContent = `¿Estás seguro de que deseas eliminar el usuario '${nombreInput.value}'?`;
    }    
    

    modal.style.display = 'flex';
    
    const confirmarBtn = document.getElementById('confirmarBtn');
    const cancelarBtn = document.getElementById('cancelarBtn');

 
    const confirmarClickHandler = function () {
        modal.style.display = 'none';
        if (botonPresionado === 'eliminar') {
            usuarioEliminar(nombreInput.value);
        } else {
            usuarioRestablecer(nombreInput.value);
        }
        cargarContenidoRegistro();
        confirmarBtn.removeEventListener('click', confirmarClickHandler);
    };
    
    const cancelarClickHandler = function () {
        modal.style.display = 'none';
        cancelarBtn.removeEventListener('click', cancelarClickHandler);
    };

    // Vincular los nuevos manejadores de eventos
    confirmarBtn.addEventListener('click', confirmarClickHandler);
    cancelarBtn.addEventListener('click', cancelarClickHandler);
}
function usuarioRestablecer(usuario) {   
    $.ajax({
        type: "POST",
        url: "php/configuracion/usuarioRestablecer.php",
        data: { usuario: usuario },
        success: function (respuesta) {
            alert(respuesta);        
        },
        error: function () {
            // Ocurrió un error al hacer la solicitud
            alert("Error al realizar la operación.");
        }
    });
}
function usuarioEliminar(usuario) {   
    $.ajax({
        type: "POST",
        url: "php/configuracion/usuarioEliminar.php",
        data: { usuario: usuario },
        success: function (respuesta) {
            alert(respuesta);        
        },
        error: function () {
            // Ocurrió un error al hacer la solicitud
            alert("Error al realizar la operación.");
        }
    });
}

/**************************************/
/************* CATEGORIAS *************/
/**************************************/

/************* DESPLEGABLE *************/
$(document).ready(function() {
    $('.select2').select2({
      placeholder: 'Categoría',
      allowClear: true, // Permite borrar la selección
    });
});
function cargarContenidoCategorias() {
    $("#opcionesCategorias").empty(); 

    let html = `<option></option>`;                
    $("#opcionesCategorias").append(html);

    let value = 'cargarUsuarios';    
    $.ajax({
        type: "POST",
        url: "php/configuracion/cargarOpcionesCategorias.php",
        data: { value: value },
        dataType: 'json',
        success: function (datos) {
            for (let i = 0; i < datos.length; i++) {
                let elemento = datos[i];
                html = `<option>${elemento.nombre}</option>`;                
                $("#opcionesCategorias").append(html);
            }
        },
        error: function () {
            // Ocurrió un error al hacer la solicitud
            alert("Error al obtener los datos.");
        }
    });
}

/************* CREACIÓN CATEGORÍAS *************/
function mostrarModalB(form) {
    const modal = document.getElementById('modal');
    const nombreInput = form.querySelector('[name="categoria"]');
    const confirmMessage = document.getElementById('confirm-message');

    confirmMessage.textContent = `¿Estás seguro de crear la categoría '${nombreInput.value}'?`;

    modal.style.display = 'flex';
    
    const confirmarBtn = document.getElementById('confirmarBtn');
    const cancelarBtn = document.getElementById('cancelarBtn');

 
    const confirmarClickHandler = function () {
        modal.style.display = 'none';
        
        categoriaCrear(nombreInput.value);
        cargarContenidoCategorias();
        
        confirmarBtn.removeEventListener('click', confirmarClickHandler);
    };
    
    const cancelarClickHandler = function () {
        modal.style.display = 'none';
        cancelarBtn.removeEventListener('click', cancelarClickHandler);
    };

    // Vincular los nuevos manejadores de eventos
    confirmarBtn.addEventListener('click', confirmarClickHandler);
    cancelarBtn.addEventListener('click', cancelarClickHandler);
}
function categoriaCrear(categoria) {   
    $.ajax({
        type: "POST",
        url: "php/configuracion/categoriaCrear.php",
        data: { categoria: categoria },
        success: function (respuesta) {

            alert(respuesta);
        },
        error: function () {
            // Ocurrió un error al hacer la solicitud
            alert("Error al realizar la operación.");
        }
    });
}

/************* CREACIÓN SUB-CATEGORÍAS *************/
function mostrarModalC(form) {    
    const categoria = document.getElementById('opcionesCategorias').selectedIndex;

    const modal = document.getElementById('modal');
    const nombreInput = form.querySelector('[name="subCategoria"]');
    const confirmMessage = document.getElementById('confirm-message');

    confirmMessage.textContent = `¿Estás seguro de crear la sub-categoría '${nombreInput.value}'?`;

    modal.style.display = 'flex';
    
    const confirmarBtn = document.getElementById('confirmarBtn');
    const cancelarBtn = document.getElementById('cancelarBtn');

 
    const confirmarClickHandler = function () {
        modal.style.display = 'none';
        
        subCategoriaCrear(categoria, nombreInput.value);
        cargarContenidoCategorias();
        
        confirmarBtn.removeEventListener('click', confirmarClickHandler);
    };
    
    const cancelarClickHandler = function () {
        modal.style.display = 'none';
        cancelarBtn.removeEventListener('click', cancelarClickHandler);
    };

    // Vincular los nuevos manejadores de eventos
    confirmarBtn.addEventListener('click', confirmarClickHandler);
    cancelarBtn.addEventListener('click', cancelarClickHandler);
}
function subCategoriaCrear(categoria, subCategoria) {   
    $.ajax({
        type: "POST",
        url: "php/configuracion/subCategoriaCrear.php",
        data: { categoria: categoria, subCategoria: subCategoria },
        success: function (respuesta) {

            alert(respuesta);
        },
        error: function () {
            // Ocurrió un error al hacer la solicitud
            alert("Error al realizar la operación.");
        }
    });
}

/*******************************************/
/************* METODOS DE PAGO *************/
/*******************************************/
function cargarContenidoPagos() {
    $("#metodoPagoExistentes").empty(); 

    $.ajax({
        type: "POST",
        url: "php/configuracion/cargarContenidoPagos.php",
        data: { value: value },
        dataType: 'json',
        success: function (datos) {
            for (let i = 0; i < datos.length; i++) {
                let elemento = datos[i];
                html = `<option>${elemento.nombre}</option>`;                
                $("#metodoPagoExistentes").append(html);
            }
        },
        error: function () {
            // Ocurrió un error al hacer la solicitud
            alert("Error al obtener los datos.");
        }
    });
}

/*********** CREAR METODO DE PAGO ***********/
function mostrarModalD(form) {
    const modal = document.getElementById('modal');
    const nombreMetodoPago = form.querySelector('[name="nombreMetodoPago"]').value;
    const decuentoMetodoPago = form.querySelector('[name="decuentoMetodoPago"]');

    const confirmMessage = document.getElementById('confirm-message');
    confirmMessage.textContent = `¿Estás seguro de agregar el metodo de pago '${nombreMetodoPago}'?`;


    modal.style.display = 'flex';
    
    const confirmarBtn = document.getElementById('confirmarBtn');
    const cancelarBtn = document.getElementById('cancelarBtn');

 
    const confirmarClickHandler = function () {
        modal.style.display = 'none';
        metodoPagoCrear(nombreMetodoPago, decuentoMetodoPago);
        cargarContenidoPagos()

        confirmarBtn.removeEventListener('click', confirmarClickHandler);
    };
    
    const cancelarClickHandler = function () {
        modal.style.display = 'none';
        cancelarBtn.removeEventListener('click', cancelarClickHandler);
    };

    // Vincular los nuevos manejadores de eventos
    confirmarBtn.addEventListener('click', confirmarClickHandler);
    cancelarBtn.addEventListener('click', cancelarClickHandler);
}
function metodoPagoCrear(nombreMetodoPago, decuentoMetodoPago) {   
    $.ajax({
        type: "POST",
        url: "php/configuracion/metodoPagoCrear.php",
        data: { nombreMetodoPago: nombreMetodoPago, decuentoMetodoPago: decuentoMetodoPago },
        success: function (respuesta) {
            alert(respuesta);
        },
        error: function () {
            // Ocurrió un error al hacer la solicitud
            alert("Error al realizar la operación.");
        }
    });
}

/*********** METODOS DE PAGO EXISTENTES ***********/
function mostrarModalE(form, event) {
    const nombreMetodoPago = form.querySelector('[name="nombreMetodoPago"]').value;
    const decuentoMetodoPago = form.querySelector('[name="decuentoMetodoPago"]').value;


    const botonPresionado = event.submitter.name;

    if (botonPresionado === 'actualizar') {
        metodoPagoActualizar(nombreMetodoPago, decuentoMetodoPago);
        cargarContenidoPagos();

    } else if (botonPresionado === 'eliminar') {
        const modal = document.getElementById('modal');

        const confirmMessage = document.getElementById('confirm-message');
        confirmMessage.textContent = `¿Estás seguro de que deseas eliminar el metodo de pago '${nombreMetodoPago}'?`;


        modal.style.display = 'flex';

        const confirmarBtn = document.getElementById('confirmarBtn');
        const cancelarBtn = document.getElementById('cancelarBtn');

    
        const confirmarClickHandler = function () {
            modal.style.display = 'none';

            metodoPagoEliminar(nombreMetodoPago);
            cargarContenidoPagos();

            confirmarBtn.removeEventListener('click', confirmarClickHandler);
        };
        
        const cancelarClickHandler = function () {
            modal.style.display = 'none';
            cancelarBtn.removeEventListener('click', cancelarClickHandler);
        };

        // Vincular los nuevos manejadores de eventos
        confirmarBtn.addEventListener('click', confirmarClickHandler);
        cancelarBtn.addEventListener('click', cancelarClickHandler);
    }    
}
function metodoPagoActualizar(nombreMetodoPago, decuentoMetodoPago) {   
    $.ajax({
        type: "POST",
        url: "php/configuracion/metodoPagoActualizar.php",
        data: { nombreMetodoPago: nombreMetodoPago, decuentoMetodoPago: decuentoMetodoPago },
        success: function (respuesta) {
            alert(respuesta);        
        },
        error: function () {
            // Ocurrió un error al hacer la solicitud
            alert("Error al realizar la operación.");
        }
    });
}
function metodoPagoEliminar(nombreMetodoPago) {   
    $.ajax({
        type: "POST",
        url: "php/configuracion/metodoPagoEliminar.php",
        data: { nombreMetodoPago: nombreMetodoPago },
        success: function (respuesta) {
            alert(respuesta);        
        },
        error: function () {
            // Ocurrió un error al hacer la solicitud
            alert("Error al realizar la operación.");
        }
    });
}