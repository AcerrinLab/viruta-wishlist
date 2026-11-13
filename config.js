/*
 * Viruta - Configuracion editable de la landing
 * ------------------------------------------------------------
 * Este es el UNICO archivo que necesitas tocar para:
 *   1. Conectar el formulario a un backend real (endpoints).
 *   2. Cambiar los datos del carrusel de la encuesta.
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
   * Carrusel "datos de la encuesta". Cada item es una diapositiva.
   * Todos los numeros salen de requisitos/requisitos_funcionales.md
   * (encuesta a clientes: 31 respuestas; encuesta a talleres: 4 respuestas).
   * Para sumar, quitar o reordenar datos, edita esta lista.
   */
  encuesta: {
    fuente: "Encuesta Viruta Jujuy 2026",
    segundosPorDato: 6,
    datos: [
      { valor: "58%", texto: "de las personas encuestadas dice que su mayor frustración al amueblar es calcular mal las medidas y que el mueble no entre.", muestra: "31 clientes" },
      { valor: "87%", texto: "le pone 4 o 5 sobre 5 a poder ver el mueble en su casa con realidad aumentada antes de fabricarlo.", muestra: "31 clientes" },
      { valor: "81%", texto: "usaría el diseño en 3D para crear sus propios muebles a medida.", muestra: "31 clientes" },
      { valor: "90%", texto: "dice que hoy le cuesta encontrar planos o guías para hacer sus muebles.", muestra: "31 clientes" },
      { valor: "84%", texto: "le da 8 o más sobre 10 a poder cotizar los materiales con proveedores locales.", muestra: "31 clientes" },
      { valor: "100%", texto: "de los talleres necesita las medidas y el tipo de madera para poder cotizar.", muestra: "4 talleres" },
      { valor: "100%", texto: "de los talleres quiere recibir los pedidos por WhatsApp.", muestra: "4 talleres" }
    ]
  }
};
