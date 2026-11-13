/*
 * Viruta - Beneficios (para decidir entre el equipo)
 * ------------------------------------------------------------
 * Funciona como un ".env" de contenido: cambiás los textos acá y la
 * página se actualiza sola, sin tocar el HTML.
 *
 * (Un .env de verdad no sirve en un sitio estático: el navegador no
 *  puede leerlo sin un paso de build. Este archivo cumple esa función.)
 *
 * Reglas:
 * - Cada perfil muestra 3 tarjetas, en el orden de la lista. El ícono
 *   de cada tarjeta es fijo según su posición.
 * - Los premios y el beneficio fundador son compromisos comerciales:
 *   revisalos en equipo antes de publicar.
 * - Si dejás un texto vacío (""), ese elemento se oculta.
 */
window.VIRUTA_BENEFICIOS = {
  cliente: {
    tarjetas: [
      { titulo: "3D en tu espacio", texto: "Elegí una plantilla, ajustá las medidas y miralo a escala real en tu casa con la cámara del celular, antes de encargarlo." },  // ícono: cubo 3D
      { titulo: "Despiece automático", texto: "Placas, cantos, herrajes y barniz calculados al milímetro. Sabés exactamente qué comprar y cuánto." },  // ícono: capas / despiece
      { titulo: "Seña protegida", texto: "Encargalo a un taller de Jujuy y pagá la seña por Mercado Pago, resguardada hasta que tu mueble esté en marcha." }   // ícono: escudo / pago protegido
    ],
    /* Premio para quien se anota como tester. Se agrega al checkbox:
       "Quiero participar como tester activo de la versión beta y recibir <premio>."
       Vacío ("") = no se promete nada. */
    premioTester: "1 diseño 3D bonificado"
  },

  taller: {
    tarjetas: [
      { titulo: "Planos técnicos listos", texto: "Cada pedido llega con medidas de corte milimétricas, tipo de madera y herrajes especificados. Directo al banco de trabajo." },  // ícono: regla / planos
      { titulo: "Cero visitas a ciegas", texto: "Cotizá sobre medidas validadas por el cliente, sin ir a medir presupuestos que nunca se concretan." },  // ícono: reloj / tiempo
      { titulo: "Cobro de seña verificado", texto: "Empezá a cortar con la seña resguardada vía Mercado Pago, y recibí el aviso de cada pedido por WhatsApp." }   // ícono: tarjeta / cobro
    ],
    /* Recuadro "Beneficio exclusivo: ..." debajo de las tarjetas. Vacío = se oculta. */
    beneficioFundador: "bonificación de 3 meses en comisiones para talleres fundadores.",
    /* Condición que acepta el taller en el checkbox:
       "Acepto recibir proyectos verificados y <condicion>."
       Vacío = "sumarme como taller fundador". */
    condicionFundador: "acceder al beneficio de 0% comisión los primeros 3 meses"
  }
};
