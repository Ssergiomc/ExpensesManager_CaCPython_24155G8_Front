// Agregar un evento de escucha al envío de todos los formularios en el documento
document.addEventListener("submit", function(event) {
  var formulario = event.target; // Obtener el formulario que desencadenó el evento

  // Si el formulario tiene el ID "registroForm", realiza las validaciones para el formulario de registro
  if (formulario.id === "registroForm") {
    validarRegistroForm(formulario);
  } 
  // Si el formulario tiene el ID "loginForm", realiza las validaciones para el formulario de inicio de sesión
  else if (formulario.id === "loginForm") {
    validarLoginForm(formulario);
  }
});

function validarRegistroForm(formulario) {
  // Obtener los valores de los campos del formulario de registro
  var nombre = formulario.querySelector("#nombre").value;
  var apellido = formulario.querySelector("#apellido").value;
  var mail = formulario.querySelector("#mail").value;
  var clave = formulario.querySelector("#clave").value;
  var repetirClave = formulario.querySelector("#repetir-clave").value;
  var aceptarTerminos = formulario.querySelector("#aceptar-terminos").checked;

    // Obtén el modal
  var modal = document.getElementById("modal");

  // Obtén el enlace para abrir el modal
  var link = document.getElementById("terminos-link");

  // Obtén el elemento de cierre del modal
  var close = document.getElementsByClassName("close")[0];

  // Validar los campos del formulario de registro
  if (nombre.trim() === "" || apellido.trim() === "" || mail.trim() === "" || clave.trim() === "" || repetirClave.trim() === "") {
    alert("Todos los campos son obligatorios.");
    event.preventDefault(); // Detener el envío del formulario si hay campos vacíos
    return;
  }

  // Verificar si el correo electrónico contiene '@' y '.com'
  if (!mail.includes("@") || !mail.includes(".com")) {
    alert("El Usuario es un correo electrónico, debe contener '@' y '.com'");
    event.preventDefault(); // Detener el envío del formulario si el correo electrónico no cumple con las condiciones
    return;
  }

  // Verificar si las contraseñas coinciden
  if (clave !== repetirClave) {
    alert("Las contraseñas no coinciden");
    event.preventDefault(); // Detener el envío del formulario si las contraseñas no coinciden
    return;
  }

  // Verificar si el usuario ha aceptado los términos y condiciones
  if (!aceptarTerminos) {
    alert("Debe aceptar los términos y condiciones");
    event.preventDefault(); // Detener el envío del formulario si el usuario no ha aceptado los términos y condiciones
    return;
  }

  
  // Si todas las validaciones pasan, el formulario se enviará automáticamente
  formulario.submit();


}

function validarLoginForm(formulario) {
  // Obtener los valores de usuario y contraseña
  var usuario = formulario.querySelector("#usuario").value;
  var contrasena = formulario.querySelector("#contrasena").value;

  // Validar si los campos están vacíos
  if (usuario.trim() === "" || contrasena.trim() === "") {
    alert("Por favor, complete todos los campos.");
    event.preventDefault(); // Detener el envío del formulario si hay campos vacíos
    return;
  }

  // Verificar si el correo electrónico contiene '@' y '.com'
  if (!usuario.includes("@") || !usuario.includes(".com")) {
    alert("El Usuario es un correo electrónico, debe contener '@' y '.com'");
    event.preventDefault(); // Detener el envío del formulario si el correo electrónico no cumple con las condiciones
    return;
  }

  // Si todas las validaciones pasan, el formulario se enviará automáticamente
  formulario.submit();
}

// Función para mostrar el modal
function mostrarModal(formulario) {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}

// Función para cerrar el modal
function cerrarModal(formulario) {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// Función para cerrar el modal cuando se hace clic fuera de él
window.onclick = function(event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


