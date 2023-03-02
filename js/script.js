// con 12 cuotas el interes es del 25%
// con 24 cuotas el interes es del 50%
// con 36 cuotas el interes es del 100%
// con 48 cuotas el interes es del 150%
function calcular_interes(cantidad_de_cuotas, monto) {
  if (cantidad_de_cuotas == 12) {
    const interes = monto * 0.25; // 25% del monto
    return monto + interes;
  } else if (cantidad_de_cuotas == 24) {
    const interes = monto * 0.5; // 50% del monto
    return monto + interes;
  } else if (cantidad_de_cuotas == 36) {
    const interes = monto * 1.0; // 100% del monto
    return monto + interes;
  } else if (cantidad_de_cuotas == 48) {
    const interes = monto * 1.5; // 150% del monto
    return monto + interes;
  }
}

class Prestamo {
  constructor(monto, cuotas, dni) {
    this.dni = dni;
    this.monto = monto;
    this.cuotas = cuotas;
    this.monto_cuota = calcular_interes(cuotas, monto) / cuotas;
  }

  obtener_json() {
    return {
      dni: this.dni,
      monto: this.monto,
      cuotas: this.cuotas,
      monto_cuota: this.monto_cuota,
    };
  }
}

let lista_de_prestamos = [];
let cantidad_de_prestamos_permitidos = 5;
const cuotas_disponibles = ["12", "24", "36", "48"];

// do {
//   let dni = prompt(texto_bienvenida);

//   while (dni.length <= 6 || dni.length > 8) {
//     alert("Error: el dni tiene que ser de 7 u 8 caracteres");
//     dni = prompt(texto_bienvenida);
//   }

//   let opcion = prompt(texto_opciones);
//   while (opcion != "1" && opcion != "2" && opcion != "3") {
//     alert("Error: Debe elegir opcion 1, 2, o 3");
//     opcion = prompt(texto_opciones);
//   }

//   if (opcion == "1") {
//     let monto = prompt(texto_solicitud_de_prestamo);

//     while (monto < 50000 || monto > 500000) {
//       alert("Error: el monto tiene que ser mayor a 50000 o menor a 500000");
//       monto = prompt(texto_solicitud_de_prestamo);
//     }

//     let cuotas = prompt(texto_cuotas);
//     // ["12", "24", "36"].includes(cuotas)
//     let cuota_correcta = cuotas_disponibles.includes(cuotas); // true o false
//     while (cuota_correcta == false) {
//       alert(
//         "Error: La cantidad de cuotas deben ser " +
//           cuotas_disponibles.join(", ")
//       );
//       cuotas = prompt(texto_cuotas);
//       cuota_correcta = cuotas_disponibles.includes(cuotas); // true o false
//     }

//     // transformo el texto a numero
//     monto = parseInt(monto);

//     let prestamo = new Prestamo(monto, cuotas, dni);
//     lista_de_prestamos.push(prestamo);

//     prestamo.mostrar_valor_cuota();
//   } else if (opcion == "2") {
//     function buscar_prestamo(prestamo) {
//       return prestamo.dni == dni;
//     }
//     let resultado_busqueda = lista_de_prestamos.find(buscar_prestamo);
//     if (resultado_busqueda != undefined) {
//       resultado_busqueda.mostrar_prestamo();
//     } else {
//       alert("Este DNI no tiene prestamos");
//     }
//   } else {
//     alert("Adios");
//   }
// } while (lista_de_prestamos.length !== cantidad_de_prestamos_permitidos);

const LOCALSTORAGE_CUOTA = "cuota";
const LOCALSTORAGE_DNI = "dni";
const LOCALSTORAGE_MONTO = "monto";

localStorage.removeItem(LOCALSTORAGE_CUOTA);
localStorage.removeItem(LOCALSTORAGE_DNI);
localStorage.removeItem(LOCALSTORAGE_MONTO);

function ingresar() {
  const dni = document.getElementById("dni");
  const error_dni = document.getElementById("error_dni");

  if (error_dni) {
    error_dni.remove();
  }

  // validaciones
  if (dni.value.length <= 6 || dni.value.length > 8) {
    const error = document.createElement("p");
    error.id = "error_dni";
    error.innerText = "El dni tiene que ser de 7 u 8 caracteres";
    error.className = "error";

    document.getElementById("formulario_dni").appendChild(error);
  } else {
    // ingreso exitoso
    localStorage.setItem(LOCALSTORAGE_DNI, dni.value);

    const bloque_dni = document.getElementById("entrada");
    bloque_dni.style.display = "none";

    const bloque_opciones = document.getElementById("seleccion_opciones");
    bloque_opciones.style.display = "block";
  }
}

function volver_menu_principal() {
  const bloque_dni = document.getElementById("entrada");
  bloque_dni.style.display = "block";

  const bloque_opciones = document.getElementById("seleccion_opciones");
  bloque_opciones.style.display = "none";

  const bloque_cuotas = document.getElementById("seleccion_cuotas");
  bloque_cuotas.style.display = "none";

  const dni = document.getElementById("dni");
  dni.value = "";

  const elementList = document.getElementsByClassName(
    "mensaje_resultado_simulador"
  );
  for (element of elementList) {
    element.style.display = "none";
  }
}

function seleccionar_cuota(cuota_seleccionada) {
  let anterior_cuota = localStorage.getItem(LOCALSTORAGE_CUOTA);
  if (anterior_cuota) {
    let ant_cuota = document.getElementById(`cuota_${anterior_cuota}`);
    if (ant_cuota) {
      ant_cuota.className = "";
    }
  }

  localStorage.setItem(LOCALSTORAGE_CUOTA, cuota_seleccionada);
  const cuota = document.getElementById(`cuota_${cuota_seleccionada}`);
  cuota.className = "seleccionado";
}

function ver_prestamos() {
  alert("no implementado");
}

function seleccionar_cuotas() {
  const bloque_opciones = document.getElementById("seleccion_opciones");
  bloque_opciones.style.display = "none";

  const bloque_cuotas = document.getElementById("seleccion_cuotas");
  bloque_cuotas.style.display = "flex";
}

function simular_prestamo() {
  const mensaje = document.getElementById("mensaje_simular_prestamo");
  mensaje.innerText = "";
  mensaje.style.display = "none";

  const cuota = localStorage.getItem(LOCALSTORAGE_CUOTA);
  const monto = document.getElementById("monto");
  const valor_prestamo = parseFloat(monto.value || 0);

  if (valor_prestamo < 50000 || valor_prestamo > 500000) {
    mensaje.innerText = "El monto tiene que ser mayor a 50000 o menor a 500000";
    mensaje.style.display = "block";
  } else {
    let cuota_correcta = cuotas_disponibles.includes(cuota); // true o false
    if (cuota_correcta == false) {
      mensaje.innerText = "Seleccione una cuota";
      mensaje.style.display = "block";
    } else {
      // exito
      localStorage.setItem(LOCALSTORAGE_MONTO, valor_prestamo);
      const dni = localStorage.getItem(LOCALSTORAGE_DNI);
      let prestamo = new Prestamo(valor_prestamo, cuota, dni);
      mostrar_prestamo(prestamo);
    }
  }
}

function mostrar_prestamo(prestamo) {
  const nuevo_mensaje = document.createElement("div");
  const objeto = prestamo.obtener_json();
  nuevo_mensaje.className = "mensaje_resultado_simulador";
  nuevo_mensaje.innerHTML = `
    <div>
      Su prestamo es de <span class="monto">$${objeto.monto}</span> en <span class="monto">${objeto.cuotas}</span> cuotas
    </div>
    <div>
      El valor de la cuota es  <span class="monto">$${objeto.monto_cuota}</span>
    </div>
    <button onclick="solicitar_prestamo();">Solicitar</button>
    <button onclick="volver_menu_principal();">Volver</button>
  `;
  document.body.appendChild(nuevo_mensaje);
}

function solicitar_prestamo() {
  // deberia agregar el prestamo a la lista de prestamos
  alert("no implementado");
}
