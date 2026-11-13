# Viruta · Landing de lista de espera

Sitio estático (HTML + CSS + JS, sin dependencias ni build) listo para desplegar en Vercel.

## Estructura

```
viruta-landing/
├── index.html        Landing con toggle Cliente / Taller y los dos formularios
├── styles.css        Sistema de diseño Warm Craft Minimal (temas verde y nogal)
├── app.js            Toggle de rol, validación, armado del payload y envío
├── config.js         Endpoints del formulario y datos del carrusel de la encuesta
├── beneficios.js     Textos de los beneficios (hoy "A definir", a decidir en equipo)
├── privacidad.html   Política de privacidad (borrador)
├── terminos.html     Términos de la lista de espera (borrador)
├── vercel.json       URLs limpias y headers
└── assets/favicon.svg
```

## Probarlo en tu compu

Abrí `index.html` con doble clic, o levantá un servidor local desde esta carpeta:

```
npx serve .
```

## Subirlo a Vercel

**Opción A: arrastrar y soltar (la más rápida)**
1. Entrá a https://vercel.com/new e iniciá sesión.
2. Arrastrá la carpeta `viruta-landing` completa.
3. Framework preset: **Other**. Build command y output directory: vacíos.
4. Deploy. En un minuto tenés la URL `https://<nombre>.vercel.app`.

**Opción B: con la CLI**
```
npm i -g vercel
cd viruta-landing
vercel          # primer deploy (preview)
vercel --prod   # deploy a producción
```

**Opción C: desde GitHub**
Subí la carpeta a un repo, importalo en Vercel con preset "Other" y cada push se despliega solo.

## Links directos por perfil

- Clientes: `https://<tu-dominio>/`
- Carpinteros / talleres: `https://<tu-dominio>/?rol=taller` (abre directo el modo taller, ideal para mandar a los encuestados del formulario de carpinteros).

## Antes de compartirla: editar `config.js`

1. **Carrusel de la encuesta.** En `config.js > encuesta.datos`, cada ítem es un dato (valor, texto y muestra). Todos salen de `requisitos_funcionales.md`.
2. **Endpoints.** Mientras `endpoints.clients` y `endpoints.workshops` estén vacíos, la página está en **modo demo**: muestra el mensaje de éxito y escribe el payload en la consola del navegador, pero **no guarda los datos**. Cargá una URL antes de mandar la página a gente real.

## Beneficios

Los textos de las tarjetas de beneficios, el recuadro "Beneficio exclusivo" y los premios de los checkboxes están en `beneficios.js`. Hoy dicen "A definir". Un texto vacío (`""`) oculta ese elemento.

## Integración con el backend

Cada envío hace `POST <endpoint>` con `Content-Type: application/json`. Respuesta 2xx = éxito; cualquier otra cosa muestra un error al usuario.

Si el backend está en otro dominio, tiene que permitir CORS para el dominio de Vercel (en Spring Boot: `@CrossOrigin` o un `CorsConfigurationSource`).

### Cliente → `endpoints.clients` (sugerido `POST /api/waitlist/clients`)
```json
{
  "role": "CLIENT",
  "fullName": "Valentina Morales",
  "email": "valentina.morales@ejemplo.com",
  "phone": "+5493884123456",
  "location": "San Salvador de Jujuy (Centro / Los Perales / Alto La Viña / Cuyaya)",
  "province": "Jujuy",
  "country": "AR",
  "isBetaTester": true,
  "source": "solar_train_hackathon_landing",
  "timestamp": "2026-11-13T14:30:00.000Z"
}
```
`phone` va como `null` si no lo completan (es opcional).

### Taller → `endpoints.workshops` (sugerido `POST /api/waitlist/workshops`)
```json
{
  "role": "WORKSHOP",
  "workshopName": "Taller La Quebrada Muebles",
  "contactEmail": "taller@mueblesjujuy.com",
  "phoneWhatsApp": "+5493884567890",
  "coverageZone": "San Salvador de Jujuy y alrededores (Gran Jujuy)",
  "workshopType": "MELAMINA_PLACAS",
  "acceptedFounderTerms": true,
  "source": "solar_train_hackathon_landing",
  "timestamp": "2026-11-13T14:32:00.000Z"
}
```
`workshopType`: `ARTESANAL_TRADICIONAL`, `MELAMINA_PLACAS`, `DIGITAL_CNC_MIXTO` o `null` si no eligen.

Los teléfonos se normalizan a solo dígitos con `+` adelante si lo escribieron.

### Tabla sugerida (PostgreSQL)
```sql
CREATE TABLE waitlist_submissions (
    id BIGSERIAL PRIMARY KEY,
    role VARCHAR(20) NOT NULL,          -- 'CLIENT' o 'WORKSHOP'
    full_name VARCHAR(150),
    workshop_name VARCHAR(150),
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50),
    location_or_zone VARCHAR(150) NOT NULL,
    workshop_type VARCHAR(40),
    is_beta_tester BOOLEAN DEFAULT FALSE,
    accepted_founder_terms BOOLEAN DEFAULT FALSE,
    source VARCHAR(100) DEFAULT 'solar_train_hackathon',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_waitlist_role ON waitlist_submissions(role);
CREATE INDEX idx_waitlist_email ON waitlist_submissions(email);
```

### Alternativa rápida sin backend: Google Sheets

Si para la hackatón no llegás con el backend, podés guardar en una planilla:
1. Creá una Google Sheet y abrí **Extensiones > Apps Script**.
2. Pegá esto y guardá:
   ```js
   function doPost(e) {
     var data = JSON.parse(e.postData.contents);
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(data.role) ||
                 SpreadsheetApp.getActiveSpreadsheet().insertSheet(data.role);
     if (sheet.getLastRow() === 0) sheet.appendRow(Object.keys(data));
     sheet.appendRow(Object.values(data));
     return ContentService.createTextOutput("ok");
   }
   ```
3. **Implementar > Nueva implementación > Aplicación web**, acceso "Cualquier usuario". Copiá la URL `/exec`.
4. Pegala en `config.js` en `clients` y `workshops` (la misma para los dos; cada rol cae en su pestaña).

Nota: Apps Script no responde bien al preflight CORS de `application/json`. Si el envío falla, en `app.js` (función `sendPayload`) cambiá el header a `"Content-Type": "text/plain;charset=utf-8"`; el script lo sigue leyendo igual.
