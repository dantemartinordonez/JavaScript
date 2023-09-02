document.addEventListener('DOMContentLoaded', () => {


  const obtenerMarcasYModelos = () => {
    const vehiculosGuardados = JSON.parse(localStorage.getItem('productos')) || [];

    const marcasSet = new Set();
    const modelosSet = new Set();

    vehiculosGuardados.forEach((vehiculo) => {
      marcasSet.add(vehiculo.marca.toLowerCase());
      modelosSet.add(vehiculo.modelo.toLowerCase());
    });

    const marcas = Array.from(marcasSet);
    const modelos = Array.from(modelosSet);

    return { marcas, modelos };
  };

  const cargarMarcasYModelosDesdeJSON = () => {
    fetch("./db/autos.json")
      .then((resp) => resp.json())
      .then((data) => {
        const marcasSelect = document.getElementById('marca');
        const modelosSelect = document.getElementById('modelo');
  

        marcasSelect.innerHTML = '';
        modelosSelect.innerHTML = '';
  

        data.marcas.forEach((marca) => {
          const option = document.createElement('option');
          option.value = marca.nombre;
          option.textContent = marca.nombre;
          marcasSelect.appendChild(option);
        });
  

        data.marcas[0].modelos.forEach((modelo) => {
          const option = document.createElement('option');
          option.value = modelo;
          option.textContent = modelo;
          modelosSelect.appendChild(option);
        });
  

        marcasSelect.addEventListener('change', () => {
          const selectedMarca = marcasSelect.value;
          const selectedMarcaData = data.marcas.find((marca) => marca.nombre === selectedMarca);
  

          modelosSelect.innerHTML = '';
          selectedMarcaData.modelos.forEach((modelo) => {
            const option = document.createElement('option');
            option.value = modelo;
            option.textContent = modelo;
            modelosSelect.appendChild(option);
          });
        });
      })
      .catch((error) => {
        console.error('Error al cargar datos desde el archivo JSON:', error);
      });
  };

  const marcasImagenes = {
    peugeot: 'peugeot.jfif',
    toyota: 'toyota.jfif',
    fiat: 'fiat.jfif',
    citroen: 'citroen.jfif',
    ford: 'ford.jfif',
    volkswagen: 'volkswagen.jfif',
    renault: 'reanult.jpeg',
    toyota: 'toyota.jpeg',
  };

  class Vehiculo {
    constructor(marca, modelo, stock, precio) {
      this.marca = marca;
      this.modelo = modelo;
      this.stock = stock;
      this.precio = precio;
    }
  }

  const autos = [];

  const mostrarVehiculos = () => {
    const vehiculosContenedor = document.getElementById('vehiculosContenedor');
    vehiculosContenedor.innerHTML = '';

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
    <button class="cancelar-btn">Cancelar</button> <!-- Corrección aquí -->
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

  const mostrarRegistroAcciones = () => {
    const actionLogTableBody = document.getElementById('actionLogTableBody');
    actionLogTableBody.innerHTML = '';

    const registros = JSON.parse(localStorage.getItem('registroAcciones')) || [];

    let currentUser = null;
    registros.forEach(registro => {
      const parts = registro.split(':');
      const username = parts[0].trim();
      const action = parts.slice(1).join(':').trim();

      if (currentUser !== username) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td class="clickable">${username}</td>
          <td class="clickable" colspan="2">
            <button class="toggle-details-btn">Mostrar detalles</button>
            <div class="details hidden">
              <ul class="user-actions"></ul>
            </div>
          </td>
        `;

        actionLogTableBody.appendChild(row);
        currentUser = username;
      }

      const userRow = actionLogTableBody.lastElementChild;
      const userActionsList = userRow.querySelector('.user-actions');
      const userDetails = userRow.querySelector('.details');
      const toggleDetailsBtn = userRow.querySelector('.toggle-details-btn');

      const actionItem = document.createElement('li');
      actionItem.textContent = action;
      userActionsList.appendChild(actionItem);

      toggleDetailsBtn.addEventListener('click', () => {
        userDetails.classList.toggle('hidden');
        toggleDetailsBtn.textContent = userDetails.classList.contains('hidden') ? 'Mostrar detalles' : 'Ocultar detalles';
      });
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
    cargarMarcasYModelosDesdeJSON();
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

    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('loggedInUser', email);

    loginForm.style.display = 'none';
    logoutButton.style.display = 'block';
    vehiculosSection.style.display = 'block';
    cargarAutosDesdeLocalStorage();
    cargarMarcasYModelosDesdeJSON();
  });

  addVehicleForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
      const marca = document.getElementById('marca').value.toLowerCase();
      const modelo = document.getElementById('modelo').value.toLowerCase();
      const stock = parseInt(document.getElementById('stock').value);
      const precio = parseFloat(document.getElementById('precio').value);

      const vehiculoExistente = autos.find((auto) => 
        auto.marca.toLowerCase() === marca && auto.modelo.toLowerCase() === modelo
      );

      if (vehiculoExistente) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El vehículo ya existe en el listado.',
        });
      } else {
        agregarVehiculo(marca, modelo, stock, precio);
        addVehicleForm.reset();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '¡El vehículo ha sido agregado correctamente!',
          showConfirmButton: false,
          timer: 1600
        });
      }
    } else {
      console.log('Usuario no autorizado. Por favor, inicie sesión.');
    }
  });

  mostrarRegistroAcciones();
});
