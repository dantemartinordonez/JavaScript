//un simulador para un empleado de una concesionaria de automores multimarcas 0km donde puede agregar quitar o cambiar precios de los vehiculos.
alert("Bienvenido a Control de Stock de Vehículos 0km Multi-car");



class Vehiculo {
  constructor(marca, modelo, stock, precio) {
    this.marca = marca;
    this.modelo = modelo;
    this.stock = stock;
    this.precio = precio;
  }
}



// Array de autos disponibles con stock y precios 
const autos = [
  new Vehiculo('Peugeot', '208', 5, 9000000),
  new Vehiculo('Fiat', 'Cronos', 3, 8500000),
  new Vehiculo('Ford', 'Focus', 7, 12000000),
  new Vehiculo('Fiat', 'Argo', 8, 8000000),
];




const mostrarAutosDisponibles = () => {
  let mensaje = 'MARCA, MODELO, STOCK Y PRECIOS DE AUTOS DISPONIBLES:\n';
  autos.forEach((auto) => {
    mensaje += `${auto.marca} ${auto.modelo}: ${auto.stock} unidades - Precio: $${auto.precio}\n`;
  });
  alert(mensaje);
};

// encontrar vehículo en el array autos por marca y modelo
const encontrarIndiceVehiculo = (marca, modelo) => {
  return autos.findIndex(
    (auto) => auto.marca.toLowerCase() === marca.toLowerCase() && auto.modelo.toLowerCase() === modelo.toLowerCase()
  );
};



// agregar autos al stock
const agregarVehiculos = () => {
  const marca = prompt('Ingrese la marca del nuevo vehiculo a ingresar:');
  const modelo = prompt('Ingrese el tipo de modelo del vehiculo:');
  const cantidad = parseInt(prompt('Coloque la cantidad de vehiculos que ingresan al stock:'), 10);

  const indiceVehiculo = encontrarIndiceVehiculo(marca, modelo);
  if (indiceVehiculo !== -1) {
    autos[indiceVehiculo].stock += cantidad;
    alert(`Se han agregado ${cantidad} unidades de ${marca} ${modelo} al stock.`);
  } else {
    const precio = parseFloat(prompt('Ingrese el precio del vehículo:'));
    autos.push(new Vehiculo(marca, modelo, cantidad, precio));
    alert(`Se han agregado ${cantidad} unidades de ${marca} ${modelo} al stock.`);
  }
};
// quitar vehículos del stock
const quitarVehiculos = () => {
  const marca = prompt('Ingrese la marca del vehiculo a quitar del stock:');
  const modelo = prompt('Ingrese el modelo del vehiculo a quitar del stock:');
  const cantidad = parseInt(prompt('Ingrese la cantidad de unidades que desea quitar:'), 10);

  const indiceVehiculo = encontrarIndiceVehiculo(marca, modelo);
  if (indiceVehiculo !== -1) {
    if (autos[indiceVehiculo].stock >= cantidad) {
      autos[indiceVehiculo].stock -= cantidad;
      alert(`Se han quitado ${cantidad} unidades de ${marca} ${modelo} del stock.`);
    } else {
      alert(`No se pueden quitar ${cantidad} unidades de ${marca} ${modelo} porque no hay suficiente stock.`);
    }
  } else {
    alert(`El vehículo ${marca} ${modelo} no se encuentra en el stock.`);
  }
};
// cambio de precio de un auto existente
const cambiarPrecio = () => {
  const marca = prompt('Ingrese la marca del vehiculo para cambiar el precio:');
  const modelo = prompt('Ingrese el modelo del vehiculo para cambiar el precio:');

  const indiceVehiculo = encontrarIndiceVehiculo(marca, modelo);
  if (indiceVehiculo !== -1) {
    const precioAnterior = autos[indiceVehiculo].precio;
    alert(`El precio actual de ${marca} ${modelo} es: $${precioAnterior}`);
    
    const nuevoPrecio = parseFloat(prompt('Ingrese el nuevo precio del vehiculo:'));
    autos[indiceVehiculo].precio = nuevoPrecio;
    alert(`El precio de ${marca} ${modelo} ha sido actualizado a $${nuevoPrecio}.`);
  } else {
    alert(`El vehiculo ${marca} ${modelo} no se encuentra en el stock.`);
  }
};
mostrarAutosDisponibles();
// opciones para el usuario
let continuar = true;
while (continuar) {
  const opcion = prompt('Escriba la acción que desea realizar:\n1 - Agregar vehiculo \n2 - Quitar vehiculo \n3 - Cambiar Precio \n4 - Salir').toLowerCase();

  switch (opcion) {
    case '1':
    case 'agregar':
      agregarVehiculos();
      break;
    case '2':
    case 'quitar':
      quitarVehiculos();
      break;
    case '3':
    case 'cambiar precio':
      cambiarPrecio();
      break;
    case '4':
    case 'salir':
      continuar = false;
      break;
    default:
      alert('Opción no valida. Por favor, coloque la opcion numerica del 1 al 4');
  }

  mostrarAutosDisponibles();
}

// console.log del total del stock del total de los autos en la concesionaria
const totalStock = autos.reduce((total, auto) => total + auto.stock, 0);
console.log(`El total de autos en stock es: ${totalStock} unidades.`);