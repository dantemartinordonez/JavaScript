alert("bienvenido a control de sotok de vehiculos 0km Multi-car")

const calcularPromedio = (numeros) => {
  if (numeros.length === 0) {
    return 0;
  }

  let suma = 0;
  for (const numero of numeros) {
    suma += numero;
  }
  return suma / numeros.length;
};

// Array de autos y stocjk dispionibles
const autos = [
  { marca: 'Peugeot', modelo: '208', stock: 5, precio: 9000000 },
  { marca: 'Fiat', modelo: 'Cronos', stock: 3, precio: 8500000 },
  { marca: 'Ford', modelo: 'Focus', stock: 7, precio: 12000000 },
  { marca: 'Fiat', modelo: 'Argo', stock: 8, precio: 8000000 },
];

//Funcion para mostrar el precio y stock de autos disponibles en la concesionaria
const mostrarStockYPrecio = () => {
  let mensaje = 'Stock y precio de autos:\n';
  autos.forEach((auto) => {
    mensaje += `${auto.marca} ${auto.modelo}: ${auto.stock} unidades - Precio: $${auto.precio}\n`;
  });
  alert(mensaje);
};
//agregar vehículos al stock
const agregarVehiculos = () => {
  const marca = prompt('Ingrese la marca del nuevo auto a ingresar:');
  const modelo = prompt('Ingrese el tipo de modelo del vehiculo:');
  const cantidad = parseInt(prompt('coloque la cantidad de vehiculos que ingresan al stock:'));

  let autoEncontrado = false;
  for (let i = 0; i < autos.length; i++) {
    if (autos[i].marca.toLowerCase() === marca.toLowerCase() && autos[i].modelo.toLowerCase() === modelo.toLowerCase()) {
      autos[i].stock += cantidad;
      autoEncontrado = true;
      break;
    }
  }

  if (!autoEncontrado) {
    const precio = parseFloat(prompt('Ingrese el precio del vehiculo:'));
    autos.push({ marca, modelo, stock: cantidad, precio });
  }

  alert(`Se han agregado ${cantidad} unidades de ${marca} ${modelo} al stock.`);
};

//quitar vehículos del stock
const quitarVehiculos = () => {
  const marca = prompt('Ingrese la marca del vehículo a quitar del stock:');
  const modelo = prompt('Ingrese el modelo del vehículo a quitar del stock:');
  const cantidad = parseInt(prompt('Ingrese la cantidad de unidades que desea quitar:'));

  let autoEncontrado = false;
  for (let i = 0; i < autos.length; i++) {
    if (autos[i].marca.toLowerCase() === marca.toLowerCase() && autos[i].modelo.toLowerCase() === modelo.toLowerCase()) {
      if (autos[i].stock >= cantidad) {
        autos[i].stock -= cantidad;
        autoEncontrado = true;
        alert(`Se han quitado ${cantidad} unidades de ${marca} ${modelo} del stock.`);
      } else {
        alert(`No se pueden quitar ${cantidad} unidades de ${marca} ${modelo} porque no hay suficiente stock.`);
      }
      break;
    }
  }

  if (!autoEncontrado) {
    alert(`El vehículo ${marca} ${modelo} no se encuentra en el stock.`);
  }
};

//stock y preco
mostrarStockYPrecio();

// hacemos un ciclo para que el operario pueda salir de la funcion
let continuar = true;
while (continuar) {
  const opcion = prompt('Escriba la accion deseea realizar:\n1 - Agregar \n2 - Quitar \n3 - Salir').toLowerCase();

  switch (opcion) {
    case 'agregar':
      agregarVehiculos();
      break;
    case 'quitar':
      quitarVehiculos();
      break;
    case 'salir':
      continuar = false;
      break;
    default:
      alert('Opción no válida. Por favor, escriba "agregar", "quitar" o "salir".');
  }

  // Mostramos el stock y precio actualizado
  mostrarStockYPrecio();
}

let totalStock = 0;
for (let i = 0; i < autos.length; i++) {
  totalStock += autos[i].stock;
}
console.log(`El total de productos en stock es: ${totalStock} unidades.`);