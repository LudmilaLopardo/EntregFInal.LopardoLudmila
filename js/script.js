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
  constructor(monto, cuotas, dni, pais) {
    this.dni = dni;
    this.monto = monto;
    this.cuotas = cuotas;
    this.pais = pais;
    this.fecha_simulacion = new Date();
    this.fecha_solicitud = null;
    this.monto_cuota = calcular_interes(cuotas, monto) / cuotas;
  }

  actualizar_fecha_solicitud() {
    this.fecha_solicitud = new Date();
  }

  obtener_json() {
    return {
      dni: this.dni,
      monto: this.monto,
      cuotas: this.cuotas,
      monto_cuota: this.monto_cuota,
      pais: this.pais,
      fecha_simulacion: this.fecha_simulacion,
      fecha_solicitud: this.fecha_solicitud,
    };
  }
}

async function obtenerPaises() {
  const apiResultado = await fetch(
    "https://restcountries.com/v3.1/subregion/South America?fields=name,flags"
  );
  return apiResultado.json();
}

const LOCALSTORAGE_PRESTAMOS = "listado_de_prestamos";
obtenerPaises().then((paises) => {
  console.log(paises);
  const select = document.getElementById("paises");
  paises.forEach((pais) => {
    const option = document.createElement("option");
    option.value = pais.name.common;
    option.text = `${pais.name.common}`;
    select.appendChild(option);
  });
});

const localPrestamos = localStorage.getItem(LOCALSTORAGE_PRESTAMOS);
let lista_de_prestamos = [];
if (localPrestamos) {
  lista_de_prestamos = JSON.parse(localPrestamos);
}

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
const LOCALSTORAGE_PAIS = "pais";
const LOCALSTORAGE_MONTO = "monto";

localStorage.removeItem(LOCALSTORAGE_CUOTA);
localStorage.removeItem(LOCALSTORAGE_DNI);
localStorage.removeItem(LOCALSTORAGE_MONTO);
localStorage.removeItem(LOCALSTORAGE_PAIS);

function ingresar() {
  const dni = document.getElementById("dni");
  const pais = document.getElementById("paises");
  const error_dni = document.getElementById("error_dni");

  if (error_dni) {
    error_dni.remove();
  }

  console.log(pais.value);

  // validaciones
  if (dni.value.length <= 6 || dni.value.length > 8) {
    const error = document.createElement("p");
    error.id = "error_dni";
    error.innerText = "El dni tiene que ser de 7 u 8 caracteres";
    error.className = "error";

    document.getElementById("dni_container").appendChild(error);
  } else if (pais.value === "Seleccione un pais") {
    const error = document.createElement("p");
    error.id = "error_pais";
    error.innerText = "Elija un Pais";
    error.className = "error";

    document.getElementById("pais_container").appendChild(error);
  } else {
    // ingreso exitoso
    localStorage.setItem(LOCALSTORAGE_DNI, dni.value);
    localStorage.setItem(LOCALSTORAGE_PAIS, pais.value);

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

  const tabla_de_prestamos = document.getElementById("tabla_de_prestamos");
  tabla_de_prestamos.style.display = "none";

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
  const dni = localStorage.getItem(LOCALSTORAGE_DNI);
  function buscar_prestamo(prestamo) {
    return prestamo.dni == dni;
  }
  let resultado_busqueda = lista_de_prestamos.filter(buscar_prestamo);

  const table = document.getElementById("table");
  let tableBody = document.getElementById("table-body");
  tableBody.remove();
  tableBody = document.createElement("tbody");
  tableBody.id = "table-body";
  table.appendChild(tableBody);

  resultado_busqueda.forEach((prestamo) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${prestamo.dni}</td>
      <td>${prestamo.monto}</td>
      <td>${prestamo.cuotas}</td>
      <td>${prestamo.monto_cuota}</td>
      <td>${prestamo.fecha_solicitud.toString()}</td>
    `;
    tableBody.appendChild(fila);
  });

  const bloque_dni = document.getElementById("entrada");
  bloque_dni.style.display = "none";

  const bloque_opciones = document.getElementById("seleccion_opciones");
  bloque_opciones.style.display = "none";

  const bloque_cuotas = document.getElementById("seleccion_cuotas");
  bloque_cuotas.style.display = "none";

  const tabla_de_prestamos = document.getElementById("tabla_de_prestamos");
  tabla_de_prestamos.style.display = "flex";
}

function seleccionar_cuotas() {
  const bloque_opciones = document.getElementById("seleccion_opciones");
  bloque_opciones.style.display = "none";

  const bloque_cuotas = document.getElementById("seleccion_cuotas");
  bloque_cuotas.style.display = "flex";
}

function simular_prestamo() {
  const cuota = localStorage.getItem(LOCALSTORAGE_CUOTA);
  const monto = document.getElementById("monto");
  const valor_prestamo = parseFloat(monto.value || 0);

  if (valor_prestamo < 50000 || valor_prestamo > 500000) {
    Toastify({
      text: "El monto tiene que ser mayor a 50000 o menor a 500000",
      duration: 5000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      className: "mensaje_error",
    }).showToast();
  } else {
    let cuota_correcta = cuotas_disponibles.includes(cuota); // true o false
    if (cuota_correcta == false) {
      Toastify({
        text: "Seleccione una cuota",
        duration: 5000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        className: "mensaje_error",
      }).showToast();
    } else {
      // exito
      localStorage.setItem(LOCALSTORAGE_MONTO, valor_prestamo);
      const dni = localStorage.getItem(LOCALSTORAGE_DNI);
      const pais = localStorage.getItem(LOCALSTORAGE_PAIS);
      let prestamo = new Prestamo(valor_prestamo, cuota, dni, pais);
      mostrar_prestamo(prestamo);
    }
  }
}

function mostrar_prestamo(prestamo) {
  const objeto = prestamo.obtener_json();
  const nuevo_mensaje = `
    Su prestamo es de $${objeto.monto} en ${objeto.cuotas} cuotas
    El valor de la cuota es $${objeto.monto_cuota}
  `;

  Swal.fire({
    title: "Prestamo Simulado",
    text: nuevo_mensaje,
    icon: "success",
    width: "60em",
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: "Solicitar",
    cancelButtonText: "Volver",
    customClass: {
      htmlContainer: "swal_html_container",
      title: "swal_title",
      confirmButton: "swal_button swal_confirm",
      cancelButton: "swal_button swal_cancel",
    },
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      solicitar_prestamo(prestamo);
    } else if (resultado.isDismissed) {
      volver_menu_principal();
    }
  });
}

function solicitar_prestamo(prestamo) {
  // deberia agregar el prestamo a la lista de prestamos
  console.log(prestamo.pais);

  if (prestamo.pais !== "Argentina") {
    Swal.fire({
      title: "Prestamo Denegado",
      html: "El prestamos solo puede ser solicitado por un ciudadano Argentino",
      icon: "error",
      showCancelButton: false,
      showConfirmButton: true,
      timer: 5000,
      customClass: {
        htmlContainer: "swal_html_container",
        title: "swal_title",
        confirmButton: "swal_button swal_confirm",
        cancelButton: "swal_button swal_cancel",
      },
    });
  } else {
    prestamo.actualizar_fecha_solicitud();
    lista_de_prestamos.push(prestamo);
    localStorage.setItem(
      LOCALSTORAGE_PRESTAMOS,
      JSON.stringify(lista_de_prestamos)
    );
    Swal.fire({
      title: "Creando prestamo",
      html: "Espere unos segundos.",
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        htmlContainer: "swal_html_container",
        title: "swal_title",
        confirmButton: "swal_button swal_confirm",
        cancelButton: "swal_button swal_cancel",
      },
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        Swal.fire({
          title: "Prestamo Aceptado",
          icon: "success",
          showCancelButton: false,
          showConfirmButton: true,
          timer: 3000,
          customClass: {
            htmlContainer: "swal_html_container",
            title: "swal_title",
            confirmButton: "swal_button swal_confirm",
            cancelButton: "swal_button swal_cancel",
          },
        }).then(() => {
          volver_menu_principal();
        });
      }
    });
  }
}
