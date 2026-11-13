/*
 * Viruta - Configuracion editable de la landing
 * ------------------------------------------------------------
 * Este es el UNICO archivo que necesitas tocar para:
 *   1. Conectar el formulario a un backend real (endpoints).
 *   2. Cambiar los mensajes del subtitulo animado (datos de la encuesta).
 *
 * Los textos de los beneficios estan en beneficios.js.
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
    clients: "https://script.google.com/macros/s/AKfycbzLh4EGeEcPfuxgEFZGJPSlQlpIqBMgd8Ul-oTTrZ02Ndhupxhkee67JGirziDqHvXhwg/exec",
    workshops: "https://script.google.com/macros/s/AKfycbzLh4EGeEcPfuxgEFZGJPSlQlpIqBMgd8Ul-oTTrZ02Ndhupxhkee67JGirziDqHvXhwg/exec"
  },

  /* Valor fijo del campo "source" en cada payload */
  source: "solar_train_hackathon_landing",

  /*
   * Subtitulo animado con datos de la encuesta. Cada item es un mensaje.
   * Los numeros salen de requisitos/requisitos_funcionales.md
   * (encuesta a clientes: 31 respuestas; encuesta a talleres: 4 respuestas).
   * "valor" se resalta, "texto" lo sigue, "muestra" va chiquito al final.
   */
  encuesta: {
    fuente: "Encuesta Viruta 2026",
    segundosPorDato: 5,
    datos: [
      { valor: "58%", texto: "teme medir mal y que el mueble no entre. Con Viruta lo ves en tu espacio antes del primer corte.", muestra: "31 personas" },
      { valor: "87%", texto: "quiere ver el mueble en su casa antes de encargarlo. Lo hacés con la cámara del celular, a escala real.", muestra: "31 personas" },
      { valor: "81%", texto: "quiere diseñar su propio mueble en 3D. Sin saber de diseño y en minutos.", muestra: "31 personas" },
      { valor: "90%", texto: "no encuentra planos confiables. Viruta los arma con cada pieza medida al milímetro.", muestra: "31 personas" },
      { valor: "84%", texto: "quiere cotizar con proveedores de Jujuy. Te damos la lista exacta de placas, cantos y herrajes.", muestra: "31 personas" },
      { valor: "100%", texto: "de los talleres cotiza con medidas y tipo de madera. Con Viruta le llegan listos, sin visitas a ciegas.", muestra: "4 talleres" },
      { valor: "100%", texto: "de los talleres prefiere WhatsApp. Por ahí le avisamos cada pedido nuevo.", muestra: "4 talleres" }
    ]
  }
};
