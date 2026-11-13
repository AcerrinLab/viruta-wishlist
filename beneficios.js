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
 * - "A definir" es el valor provisorio mientras el equipo decide.
 * - Si dejás un texto vacío (""), ese elemento se oculta.
 */
window.VIRUTA_BENEFICIOS = {
  cliente: {
    tarjetas: [
      { titulo: "A definir", texto: "A definir" },  // ícono: cubo 3D
      { titulo: "A definir", texto: "A definir" },  // ícono: capas / despiece
      { titulo: "A definir", texto: "A definir" }   // ícono: escudo / pago protegido
    ],
    /* Premio para quien se anota como tester. Se agrega al checkbox:
       "Quiero participar como tester activo de la versión beta y recibir <premio>."
       Vacío = no se promete nada. Ej: "1 diseño 3D bonificado" */
    premioTester: ""
  },

  taller: {
    tarjetas: [
      { titulo: "A definir", texto: "A definir" },  // ícono: regla / planos
      { titulo: "A definir", texto: "A definir" },  // ícono: reloj / tiempo
      { titulo: "A definir", texto: "A definir" }   // ícono: tarjeta / cobro
    ],
    /* Recuadro "Beneficio exclusivo: ..." debajo de las tarjetas */
    beneficioFundador: "A definir",
    /* Condición que acepta el taller en el checkbox:
       "Acepto recibir proyectos verificados y <condicion>."
       Vacío = "sumarme como taller fundador". Ej: "acceder al 0% de comisión los primeros 3 meses" */
    condicionFundador: ""
  }
};
