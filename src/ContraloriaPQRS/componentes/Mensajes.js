import Swal from "sweetalert2";

function Mensaje(sms) {
  Swal.fire({
    title: "¡Código enviado a su correo exitosamente!",
    text: sms,
    icon: "success",
    confirmButtonText: "Aceptar"
  });
}

function MensajeVerificacion(sms) {
  Swal.fire({
    title: "¡Verificación exitosa!",
    text: sms,
    icon: "success",
    confirmButtonText: "Aceptar"
  });
}

function MensajeError(sms) {
  Swal.fire({
    title: "¡Error!",
    text: sms,
    icon: "error",
    confirmButtonText: "Aceptar"
  });
}

function MensajeRuta(sms, titulo, url) {
  Swal.fire({
    title: titulo,
    text: sms,
    icon: "success",
    confirmButtonText: "Consultar Solicitud"
  });
}

function MensajeRutaError(sms, titulo, url) {
  Swal.fire({
    title: titulo,
    text: sms,
    icon: "success",
    confirmButtonText: "Consultar Solicitud"
  });
}

function MensajeExito(message) {
  Swal.fire({
    title: "¡Éxito!",
    text: message,
    icon: "success",
    confirmButtonText: "Aceptar"
  });
}

export {
  Mensaje,
  MensajeError,
  MensajeRuta,
  MensajeRutaError,
  MensajeVerificacion,
  MensajeExito
};
