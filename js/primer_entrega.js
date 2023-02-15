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

  mostrar_valor_cuota() {
    alert("El monto a devolver mensualmente es de: $" + this.monto_cuota);
  }

  mostrar_prestamo() {
    const texto =
      `
      Su prestamo es de $` +
      this.monto +
      ` en ` +
      this.cuotas +
      ` cuotas
      --------------------------------------------------------
      El valor de la cuota es $` +
      this.monto_cuota +
      `
    `;
    alert(texto);
  }
}

let lista_de_prestamos = [];
let cantidad_de_prestamos_permitidos = 5;
const cuotas_disponibles = ["12", "24", "36", "48"];
const texto_bienvenida = `
  Bienvenido al simulador de prestamos.
  Porfavor ingrese su dni.
`;

do {
  let dni = prompt(texto_bienvenida);

  while (dni.length <= 6 || dni.length > 8) {
    alert("Error: el dni tiene que ser de 7 u 8 caracteres");
    dni = prompt(texto_bienvenida);
  }

  const texto_opciones = `
    ELIJA UNA OPCION
    ----------------

    1 - Simular un prestamo
    2 - Ver prestamos
    3 - Salir
  `;

  let opcion = prompt(texto_opciones);
  while (opcion != "1" && opcion != "2" && opcion != "3") {
    alert("Error: Debe elegir opcion 1, 2, o 3");
    opcion = prompt(texto_opciones);
  }

  if (opcion == "1") {
    const texto_solicitud_de_prestamo =
      `
      Bienvenido al simulador de prestamos.
      Porfavor ingrese el monto que desee pedir.

      
      *** Tenga en cuenta que ********************************
      1 - El monto puede ser desde $50000
      2 - El monto puede ser hasta $500000
      3 - Podra elegir la cantidad de cuotas entre ` +
      cuotas_disponibles.join(", ") +
      `
      ********************************************************
  `;

    let monto = prompt(texto_solicitud_de_prestamo);

    while (monto < 50000 || monto > 500000) {
      alert("Error: el monto tiene que ser mayor a 50000 o menor a 500000");
      monto = prompt(texto_solicitud_de_prestamo);
    }

    const texto_cuotas =
      `
      Porfavor ingrese la cantidad de cuotas.

      *** Tenga en cuenta que ********************************
      1 - La cantidad de cuotas pueden ser ` +
      cuotas_disponibles.join(", ") +
      `
      ********************************************************
    `;

    let cuotas = prompt(texto_cuotas);
    // ["12", "24", "36"].includes(cuotas)
    let cuota_correcta = cuotas_disponibles.includes(cuotas); // true o false
    while (cuota_correcta == false) {
      alert(
        "Error: La cantidad de cuotas deben ser " +
          cuotas_disponibles.join(", ")
      );
      cuotas = prompt(texto_cuotas);
      cuota_correcta = cuotas_disponibles.includes(cuotas); // true o false
    }

    // transformo el texto a numero
    monto = parseInt(monto);

    let prestamo = new Prestamo(monto, cuotas, dni);
    lista_de_prestamos.push(prestamo);

    prestamo.mostrar_valor_cuota();
  } else if (opcion == "2") {
    function buscar_prestamo(prestamo) {
      return prestamo.dni == dni;
    }
    let resultado_busqueda = lista_de_prestamos.find(buscar_prestamo);
    if (resultado_busqueda != undefined) {
      resultado_busqueda.mostrar_prestamo();
    } else {
      alert("Este DNI no tiene prestamos");
    }
  } else {
    alert("Adios");
  }
} while (lista_de_prestamos.length !== cantidad_de_prestamos_permitidos);
