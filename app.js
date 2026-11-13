/* Viruta - logica de la landing (vanilla JS, sin dependencias) */
(function () {
  "use strict";

  var CONFIG = window.VIRUTA_CONFIG || {};
  var ENDPOINTS = CONFIG.endpoints || {};
  var SOURCE = CONFIG.source || "solar_train_hackathon_landing";

  var body = document.body;
  var panel = document.getElementById("panel");
  var success = document.getElementById("success");
  var roleButtons = document.querySelectorAll("[data-role-btn]");

  /* ---------- Toggle de rol ---------- */
  /* Pastilla de vidrio que se desliza entre las opciones (estilo iOS) */
  var toggle = document.querySelector(".role-toggle");
  var thumb = document.querySelector(".role-thumb");
  var thumbTimer = null;
  function moveThumb(animate) {
    if (!thumb) return;
    var active = document.querySelector('[data-role-btn][aria-selected="true"]');
    if (!active) return;
    thumb.style.width = active.offsetWidth + "px";
    thumb.style.transform = "translateX(" + active.offsetLeft + "px)";
    if (animate) {
      toggle.classList.add("is-moving");
      clearTimeout(thumbTimer);
      thumbTimer = setTimeout(function () { toggle.classList.remove("is-moving"); }, 420);
    }
  }
  window.addEventListener("resize", function () { moveThumb(false); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { moveThumb(false); });

  function setRole(role, opts) {
    opts = opts || {};
    if (role !== "client" && role !== "workshop") role = "client";
    body.setAttribute("data-role", role);

    roleButtons.forEach(function (btn) {
      var active = btn.getAttribute("data-role-btn") === role;
      btn.setAttribute("aria-selected", active ? "true" : "false");
      btn.tabIndex = active ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", role === "client" ? "tab-client" : "tab-workshop");
    moveThumb(opts.animate);

    var showSuccess = !success.hidden && opts.keepSuccess;
    document.querySelectorAll("[data-show]").forEach(function (el) {
      var match = el.getAttribute("data-show") === role;
      if (el.tagName === "FORM" && showSuccess) { el.hidden = true; return; }
      el.hidden = !match;
      if (match && opts.animate) {
        el.classList.remove("fade-in");
        void el.offsetWidth;
        el.classList.add("fade-in");
      }
    });
    if (!opts.keepSuccess) success.hidden = true;

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", role === "client" ? "#2B4C38" : "#6E4E37");

    if (opts.updateUrl) {
      try {
        var url = new URL(window.location.href);
        if (role === "workshop") url.searchParams.set("rol", "taller");
        else url.searchParams.delete("rol");
        history.replaceState(null, "", url.toString());
      } catch (e) { /* sin soporte, no pasa nada */ }
    }
  }

  roleButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setRole(btn.getAttribute("data-role-btn"), { animate: true, updateUrl: true });
    });
    btn.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      var next = btn.getAttribute("data-role-btn") === "client" ? "workshop" : "client";
      setRole(next, { animate: true, updateUrl: true });
      document.querySelector('[data-role-btn="' + next + '"]').focus();
    });
  });

  /* Rol inicial por URL: ?rol=taller o ?rol=carpintero abre el modo taller */
  (function initRole() {
    var param = "";
    try { param = (new URLSearchParams(window.location.search).get("rol") || "").toLowerCase(); } catch (e) {}
    var workshop = ["taller", "carpintero", "carpinteria", "workshop"].indexOf(param) !== -1;
    setRole(workshop ? "workshop" : "client");
  })();

  /* ---------- Beneficios (beneficios.js) ---------- */
  (function renderBenefits() {
    var B = window.VIRUTA_BENEFICIOS || {};
    function fill(listKey, data) {
      var list = document.querySelector('[data-benefits="' + listKey + '"]');
      if (!list || !data || !data.tarjetas) return;
      var items = list.querySelectorAll(".benefit");
      items.forEach(function (li, i) {
        var t = data.tarjetas[i];
        if (!t || (!t.titulo && !t.texto)) { li.hidden = true; return; }
        li.querySelector("h3").textContent = t.titulo || "";
        li.querySelector("p").textContent = t.texto || "";
        li.querySelector("p").hidden = !t.texto;
      });
    }
    fill("cliente", B.cliente);
    fill("taller", B.taller);

    var c = B.cliente || {}, w = B.taller || {};
    if (c.premioTester) {
      document.getElementById("tester-label").textContent =
        "Quiero participar como tester activo de la versión beta y recibir " + c.premioTester + ".";
    }
    if (w.condicionFundador) {
      document.getElementById("founder-label").textContent =
        "Acepto recibir proyectos verificados y " + w.condicionFundador + ".";
    }
    if (w.beneficioFundador) document.getElementById("founder-text").textContent = w.beneficioFundador;
    else document.getElementById("founder-note").hidden = true;
  })();

  /* ---------- Tarjetas con datos de la encuesta (config.js -> encuesta) ---------- */
  (function surveyCards() {
    var E = CONFIG.encuesta || {};
    var datos = E.datos || [];
    var grid = document.getElementById("survey-grid");
    if (!grid) return;
    if (!datos.length) { grid.closest("section").hidden = true; return; }
    datos.forEach(function (d) {
      var txt = d.texto || "";
      var cut = txt.indexOf(". ");
      var dato = cut > -1 ? txt.slice(0, cut + 1) : txt;
      var respuesta = cut > -1 ? txt.slice(cut + 2) : "";
      var li = document.createElement("li");
      li.className = "survey-card glass";
      li.innerHTML = '<div class="survey-value"></div><p class="survey-fact"></p><p class="survey-answer"></p>';
      li.querySelector(".survey-value").textContent = d.valor;
      li.querySelector(".survey-fact").textContent = dato;
      var ans = li.querySelector(".survey-answer");
      if (respuesta) ans.textContent = respuesta; else ans.remove();
      grid.appendChild(li);
    });
    document.getElementById("survey-note").textContent = "Fuente: " + (E.fuente || "Encuesta Viruta 2026");
  })();

  /* ---------- Validacion ---------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function normalizePhone(raw) {
    var s = (raw || "").trim();
    if (!s) return "";
    var plus = s.charAt(0) === "+";
    var digits = s.replace(/\D/g, "");
    return (plus ? "+" : "") + digits;
  }

  function setError(input, msg) {
    var field = input.closest(".field");
    if (!field) return;
    field.classList.toggle("has-error", !!msg);
    var out = field.querySelector(".error-msg");
    if (out) out.textContent = msg || "";
    input.setAttribute("aria-invalid", msg ? "true" : "false");
  }

  function validateInput(input) {
    var val = (input.value || "").trim();
    var msg = "";
    if (input.required && !val) {
      msg = input.tagName === "SELECT" ? "Elegí una opción." : "Este campo es obligatorio.";
    } else if (val && input.type === "email" && !EMAIL_RE.test(val)) {
      msg = "Revisá el email, parece incompleto.";
    } else if (val && input.type === "tel") {
      var digits = val.replace(/\D/g, "");
      if (digits.length < 8 || digits.length > 15) msg = "Ingresá un número válido, con característica.";
    } else if (val && input.type === "text" && val.length < 2) {
      msg = "Es muy corto.";
    }
    setError(input, msg);
    return !msg;
  }

  function validateForm(form) {
    var ok = true, first = null;
    form.querySelectorAll("input[type=text], input[type=email], input[type=tel], select").forEach(function (input) {
      if (!validateInput(input)) { ok = false; if (!first) first = input; }
    });
    if (first) first.focus();
    return ok;
  }

  document.querySelectorAll("form input, form select").forEach(function (input) {
    input.addEventListener("blur", function () {
      if (input.value || input.getAttribute("aria-invalid") === "true") validateInput(input);
    });
    input.addEventListener("input", function () {
      if (input.getAttribute("aria-invalid") === "true") validateInput(input);
    });
    input.addEventListener("change", function () {
      if (input.tagName === "SELECT") validateInput(input);
    });
  });

  /* ---------- Payloads (ver README: esquema para el backend) ---------- */
  function buildClientPayload(form) {
    var f = form.elements;
    return {
      role: "CLIENT",
      fullName: f.nombre_apellido.value.trim(),
      email: f.email.value.trim().toLowerCase(),
      phone: normalizePhone(f.telefono_whatsapp.value) || null,
      location: f.localidad_jujuy.value,
      province: "Jujuy",
      country: "AR",
      isBetaTester: f.es_tester_beta.checked,
      source: SOURCE,
      timestamp: new Date().toISOString()
    };
  }

  function buildWorkshopPayload(form) {
    var f = form.elements;
    var tipo = form.querySelector('input[name="tipo_taller"]:checked');
    return {
      role: "WORKSHOP",
      workshopName: f.nombre_taller.value.trim(),
      contactEmail: f.email_contacto.value.trim().toLowerCase(),
      phoneWhatsApp: normalizePhone(f.telefono_whatsapp.value),
      coverageZone: f.zona_cobertura.value,
      workshopType: tipo ? tipo.value : null,
      acceptedFounderTerms: f.acepta_terminos_fundador.checked,
      source: SOURCE,
      timestamp: new Date().toISOString()
    };
  }

  /* ---------- Envio ----------
   * Punto de integracion: config.js -> endpoints.clients / endpoints.workshops
   * Si el endpoint esta vacio, se simula el envio (modo demo).
   */
  function sendPayload(endpoint, payload) {
    if (!endpoint) {
      console.info("[Viruta] Modo demo: no hay endpoint configurado. Payload que se enviaria:", payload);
      return new Promise(function (resolve) { setTimeout(resolve, 600); });
    }
    return fetch(endpoint, {
      method: "POST",
      /* text/plain evita el preflight CORS (necesario para Google Apps Script) */
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.text().then(function (txt) {
        var data = null;
        try { data = JSON.parse(txt); } catch (e) { /* respuesta sin JSON: se toma como OK */ }
        if (data && data.ok === false) throw new Error(data.error || "El servidor rechazo el envio");
        return data;
      });
    });
  }

  function handleSubmit(form, kind) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      status.textContent = "";
      if (!validateForm(form)) return;

      var btn = form.querySelector("button[type=submit]");
      var label = btn.querySelector(".btn-label");
      var original = label.textContent;
      btn.disabled = true;
      label.textContent = "Enviando...";

      var payload = kind === "client" ? buildClientPayload(form) : buildWorkshopPayload(form);
      var endpoint = kind === "client" ? ENDPOINTS.clients : ENDPOINTS.workshops;

      sendPayload(endpoint, payload)
        .then(function () {
          showSuccess(kind, payload);
          form.reset();
        })
        .catch(function (err) {
          console.error("[Viruta] Error al enviar:", err);
          status.textContent = "No pudimos registrar tu inscripción. Revisá tu conexión y probá de nuevo.";
        })
        .then(function () {
          btn.disabled = false;
          label.textContent = original;
        });
    });
  }

  function showSuccess(kind, payload) {
    document.getElementById("form-client").hidden = true;
    document.getElementById("form-workshop").hidden = true;
    var title = document.getElementById("success-title");
    var text = document.getElementById("success-text");
    if (kind === "client") {
      var first = (payload.fullName || "").split(" ")[0];
      title.textContent = first ? "Listo, " + first + ". Ya estás en la lista" : "Ya estás en la lista";
      var premio = (window.VIRUTA_BENEFICIOS && window.VIRUTA_BENEFICIOS.cliente || {}).premioTester;
      text.textContent = payload.isBetaTester
        ? "Te vamos a escribir apenas abra la beta para sumarte como tester." + (premio ? " Vas a recibir " + premio + "." : "")
        : "Te vamos a escribir apenas abra la beta en tu zona.";
    } else {
      title.textContent = "Taller pre-inscripto";
      text.textContent = "Gracias, " + payload.workshopName + ". Te contactamos por WhatsApp para activar tu cupo de taller fundador.";
    }
    success.hidden = false;
    success.focus();
  }

  document.getElementById("success-reset").addEventListener("click", function () {
    success.hidden = true;
    setRole(body.getAttribute("data-role"), { animate: true });
  });

  handleSubmit(document.getElementById("form-client"), "client");
  handleSubmit(document.getElementById("form-workshop"), "workshop");
})();
