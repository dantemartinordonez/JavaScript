alert("Bienvenidos para comenzar vamos a corroborar tu mayoria de edad");
let edad = parseInt(prompt("Ingrese su edad"));
let edadMinima = 18;
if (edad >= edadMinima) {
  alert("Bienvenido puede ingresar");
} else if (edad <= edadMinima) {
  alert("No cumple con la edad mínima para ingresar");
  alert(actualizar) 
}function compra(){
  alert("Bienvenido a nuestra página de bebidas. Podrás realizar tus compras aquí.");
  alert("Una vez que hayas terminado de elegir tus productos, ingresa la palabra TERMINAR para darte el total de tu compra. Gracias por elegirnos!");
    let next = prompt("¿Quieres realizar una compra? \n - coloque SI para empezar a comprar nuestros vinos exclusivos \n - coloque NO para cerrar este mensaje");
  if(next === "SI" || next==="si"){
    let producto = "";
    let listaProductos = "";
    let totalCompra = 0;
    let actualizar = "Si quieres realizar una compra, actualiza la página. Gracias por visitarnos!";
    let actualizar2 = "Si quieres volver a realizar una compra, actualiza la página. Gracias por visitarnos!";
    while (producto!="TERMINAR"){
      producto = prompt("Ingrese un Código del 1-5 para elegir sus productos. TERMINAR para finalizar \n 1: LUIGI BOSCA MALBEC 750ML - $3200\n 2: TRUMPETER MALBEC 750ML - $2400\n 3: KILKA MALBEC 750ml - $ 2100 \n 4: PISPI MALBEC 750ML - $2800 \n 5: LUIGI BOSCA CHARDONNAY 750ML - $4200"); 
      switch (producto){
        case "1":
          totalCompra += 3200;
          break;
        case "2":
          totalCompra += 2400;
          break;
        case "3":
          totalCompra += 2100;
          break;
        case "4":
          totalCompra += 2800;
          break;
        case "5":
          totalCompra += 4200;
          break;
        case "TERMINAR":
          alert ("COMPRA FINALIZADA. PRECIONE ACEPTAR PARA CONTINUAR.");
          break;
        default:
          alert ("El código ingresado no existe");
      }
    }
    if (totalCompra == 0){
      alert('No hay productos en su carrito');
      alert(actualizar);
    }else{
      alert("El total de la compra es: $"+totalCompra+" "+actualizar2);
    }
  } else {
    alert("Si quieres realizar una compra, actualiza la página. Gracias por visitarnos!");
  }
}
compra();
