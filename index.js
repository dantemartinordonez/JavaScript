class Vehiculo {
  constructor(marca, modelo, stock, precio) {
    this.marca = marca;
    this.modelo = modelo;
    this.stock = stock;
    this.precio = precio;
  }
}

const autos = [];
// aca tenemos un listado vehiculos con su imagen dependiendo de la marca que carguemos del vehiculo.
//la idea es poder hacer un listado de los mas comunes por marca y modelo.
const marcasImagenes = {
  peugeot: 'peugeot.jfif',
  toyota: 'toyota.jfif',
  fiat: 'fiat.jfif',
  citroen: 'citroen.jfif',
  ford: 'ford.jfif',
  volkswagen: 'volkswagen.jfif',
};

const mostrarVehiculos = () => {
  const vehiculosContenedor = document.getElementById('vehiculosContenedor');
  vehiculosContenedor.innerHTML = '';

//en caso que el empleado coloque una marca que no se encuentre en el listado se cargara una imagen de un auto generico.
  autos.forEach((auto, index) => {
    const imagenMarca = marcasImagenes[auto.marca.toLowerCase()];
    const imagenSrc = imagenMarca ? `assets/${imagenMarca}` : 'assets/autoComun.jfif';

    const vehiculoCard = document.createElement('div');
    vehiculoCard.className = 'vehiculo-card';
    vehiculoCard.innerHTML = `
      <div class="vehiculo-image">
        <img src="${imagenSrc}" alt="Imagen de ${auto.marca}" width="200" height="300">
      </div>
      <h2>${auto.marca.toUpperCase()} ${auto.modelo}</h2>
      <p>Stock: ${auto.stock} unidades</p>
      <p>Precio: $${auto.precio}</p>
      <button class="editar-btn" data-index="${index}">Editar</button>
      <button class="eliminar-btn" data-index="${index}">Eliminar</button>
    `;

    vehiculosContenedor.appendChild(vehiculoCard);

    const editarBtn = vehiculoCard.querySelector('.editar-btn');
    editarBtn.addEventListener('click', () => editarVehiculo(index));

    const eliminarBtn = vehiculoCard.querySelector('.eliminar-btn');
    eliminarBtn.addEventListener('click', () => eliminarVehiculo(index));
  });
};

const guardarAutosEnLocalStorage = () => {
  localStorage.setItem('autos', JSON.stringify(autos));
};

const cargarAutosDesdeLocalStorage = () => {
  const autosGuardados = JSON.parse(localStorage.getItem('autos'));
  if (autosGuardados) {
    autos.length = 0;
    autosGuardados.forEach(auto => {
      autos.push(new Vehiculo(auto.marca, auto.modelo, auto.stock, auto.precio));
    });
    mostrarVehiculos();
  }
};

const agregarVehiculo = (marca, modelo, stock, precio) => {
  const nuevoVehiculo = new Vehiculo(marca, modelo, stock, precio);
  autos.push(nuevoVehiculo);
  guardarAutosEnLocalStorage();
  mostrarVehiculos();

  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const actionMessage = `Usuario ${loggedInUser} agregó un vehículo: ${marca} ${modelo}`;
  actualizarRegistroAcciones(actionMessage);
};

// vamos a poner dos tipos de opciones para modificar los datos cargados del vehuculo. 
//la idea luego es que el usuario pueda modificar color y año de fabricacion

const editarVehiculo = (index) => {
  const vehiculo = autos[index];
  const editarForm = document.createElement('div');
  editarForm.className = 'editar-form';
  editarForm.innerHTML = `
    <label for="nuevoPrecio">Nuevo Precio:</label>
    <input type="number" id="nuevoPrecio" step="0.01" value="${vehiculo.precio}">
    <label for="nuevoStock">Nuevo Stock:</label>
    <input type="number" id="nuevoStock" value="${vehiculo.stock}">
    <button class="guardar-btn">Guardar</button>
    <button class="cancelar-btn">Cancelar</button>
  `;

  editarForm.querySelector('.guardar-btn').addEventListener('click', () => {
    const nuevoPrecio = parseFloat(editarForm.querySelector('#nuevoPrecio').value);
    const nuevoStock = parseInt(editarForm.querySelector('#nuevoStock').value);

    if (!isNaN(nuevoPrecio) && !isNaN(nuevoStock)) {
      vehiculo.precio = nuevoPrecio;
      vehiculo.stock = nuevoStock;
      guardarAutosEnLocalStorage();
      mostrarVehiculos();

      const loggedInUser = sessionStorage.getItem('loggedInUser');
      const actionMessage = `Usuario ${loggedInUser} editó un vehículo: ${vehiculo.marca} ${vehiculo.modelo}`;
      actualizarRegistroAcciones(actionMessage);
    }
  });

  editarForm.querySelector('.cancelar-btn').addEventListener('click', () => {
    editarForm.remove();
  });

  const vehiculoCard = document.querySelectorAll('.vehiculo-card')[index];
  vehiculoCard.appendChild(editarForm);
};

const eliminarVehiculo = (index) => {
  autos.splice(index, 1);
  guardarAutosEnLocalStorage();
  mostrarVehiculos();

  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const actionMessage = `Usuario ${loggedInUser} eliminó un vehículo.`;
  actualizarRegistroAcciones(actionMessage);
};

// vamos a mostrar el regisro de acciones de cada persona que se logea. para que sepa que accion realizo
//idea a futuro es que se pueda ver en el registro la modificacion lo mas especifica posible. pude sacar algunas ideas de internet

const mostrarRegistroAcciones = () => {
  const actionLog = document.getElementById('actionLog');
  actionLog.innerHTML = ''; 

  const registros = JSON.parse(localStorage.getItem('registroAcciones')) || [];

  let currentUser = '';
  registros.forEach(registro => {
    const parts = registro.split(':');
    const username = parts[0].trim(); 
    const action = parts[1].trim(); 

    if (currentUser !== username) {
      const userHeader = document.createElement('p');
      userHeader.textContent = `Usuario ${username}:`;
      actionLog.appendChild(userHeader);
      currentUser = username;
    }

    const registroItem = document.createElement('p');
    registroItem.textContent = `  - ${action}`;
    actionLog.appendChild(registroItem);
  });
};

const actualizarRegistroAcciones = (message) => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const timestamp = new Date().toLocaleString();
  const registro = `${loggedInUser}: ${message}`;

  const registros = JSON.parse(localStorage.getItem('registroAcciones')) || [];
  registros.push(registro);
  localStorage.setItem('registroAcciones', JSON.stringify(registros));

  mostrarRegistroAcciones(); 
};

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const logoutButton = document.getElementById('logoutButton');
  const vehiculosSection = document.getElementById('vehiculosSection');
  const addVehicleForm = document.getElementById('addVehicleForm');
  const actionLog = document.getElementById('actionLog');

  const isLoggedIn = sessionStorage.getItem('isLoggedIn');

  if (isLoggedIn === 'true') {
    loginForm.style.display = 'none';
    logoutButton.style.display = 'block';
    vehiculosSection.style.display = 'block';
    cargarAutosDesdeLocalStorage();
  } else {
    loginForm.style.display = 'block';
    logoutButton.style.display = 'none';
    vehiculosSection.style.display = 'none';
  }

  logoutButton.addEventListener('click', () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('loggedInUser');
    loginForm.style.display = 'block';
    logoutButton.style.display = 'none';
    vehiculosSection.style.display = 'none';
  });

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
// Supongamos que las credenciales son correctas dejamos ingresar a l formulario
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('loggedInUser', email);

    loginForm.style.display = 'none';
    logoutButton.style.display = 'block';
    vehiculosSection.style.display = 'block';
    cargarAutosDesdeLocalStorage();
  });

  addVehicleForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
      const marca = document.getElementById('marca').value;
      const modelo = document.getElementById('modelo').value;
      const stock = parseInt(document.getElementById('stock').value);
      const precio = parseFloat(document.getElementById('precio').value);

      agregarVehiculo(marca, modelo, stock, precio);
      addVehicleForm.reset();
    } else {
      console.log('Usuario no autorizado. Por favor, inicie sesión.');
    }
  });

  mostrarRegistroAcciones();
});
