/*
 * Viruta - Configuracion editable de la landing
 * ------------------------------------------------------------
 * Este es el UNICO archivo que necesitas tocar para:
 *   1. Conectar el formulario a un backend real (endpoints).
 *   2. Cambiar el dato de validacion (sale de las encuestas del proyecto).
 */
window.VIRUTA_CONFIG = {
  /*
   * Endpoints que reciben el POST con el payload JSON.
   * - Si quedan vacios (""), la pagina funciona en "modo demo":
   *   muestra el mensaje de exito y escribe el payload en la consola
   *   del navegador, pero NO guarda los datos en ningun lado.
   * - Ejemplos: "https://tu-backend.com/api/waitlist/clients"
   *             "https://script.google.com/macros/s/XXXX/exec"
   */
  endpoints: {
    clients: "https://script.google.com/macros/s/AKfycbxTEE9iYl6EBWsYwaOkbmB_Fj0hXF0yifo93RYCCu1cCeKCa5FJFaVcfiDArksoFLcvBg/exec",
    workshops: "https://script.google.com/macros/s/AKfycbxTEE9iYl6EBWsYwaOkbmB_Fj0hXF0yifo93RYCCu1cCeKCa5FJFaVcfiDArksoFLcvBg/exec"
  },

  /* Valor fijo del campo "source" en cada payload */
  source: "solar_train_hackathon_landing",

  /* Bloque de validacion de campo: dato real de la encuesta a clientes (31 respuestas) */
  validation: {
    percent: "58%",
    text: "de las personas encuestadas dice que su mayor frustración al amueblar es calcular mal las medidas y que el mueble no entre.",
    sourceLabel: "Encuesta Viruta Jujuy 2026 · 31 respuestas",
    highlight: "100% de los talleres cotiza con medidas y tipo de madera"
  }
};
