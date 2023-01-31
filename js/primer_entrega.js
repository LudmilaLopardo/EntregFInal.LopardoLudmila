// con 12 cuotas el interes es del 25%
// con 24 cuotas el interes es del 50%
// con 36 cuotas el interes es del 100%
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
  }
}

const texto_bienvenida = `
    Bienvenido al simulador de prestamos.
    Porfavor ingrese el monto que desee pedir.

    
    *** Tenga en cuenta que ********************************
    1 - El monto puede ser desde $50000
    2 - El monto puede ser hasta $500000
    3 - Podra elegir la cantidad de cuotas entre 12, 24, 36
    ********************************************************
 `;
let monto = prompt(texto_bienvenida);

while (monto < 50000 || monto > 500000) {
  alert("Error: el monto tiene que ser mayor a 50000 o menor a 500000");
  monto = prompt(texto_bienvenida);
}

const texto_cuotas = `
    Porfavor ingrese la cantidad de cuotas.

    *** Tenga en cuenta que ********************************
    1 - La cantidad de cuotas pueden ser 12, 24 o 36
    ********************************************************
  `;

let cuotas = prompt(texto_cuotas);

while (cuotas != 12 && cuotas != 24 && cuotas != 36) {
  alert("Error: La cantidad de cuotas deben ser 12, 24 o 36");
  cuotas = prompt(texto_cuotas);
}

// transformo el texto a numero
monto = parseInt(monto);

// calculamos el monto a devolver segun las cuotas
let monto_a_devolver = calcular_interes(cuotas, monto);

let valor_cuota = monto_a_devolver / cuotas;

alert("El monto a devolver mensualmente es de: $" + valor_cuota);
