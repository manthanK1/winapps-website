(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  /* ---------- Sticky nav border ---------- */
  var nav = document.querySelector(".nav");
  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("mobile-menu");
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
  }
  toggle.addEventListener("click", function () { setMenu(menu.hidden); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  window.addEventListener("resize", function () { if (window.innerWidth > 860) setMenu(false); });

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 70 + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Live team clocks ----------
     Client cities show a 09:00–18:00 workday; the Winapps row shows the
     shifted 11:00–20:00 IST day that creates the overlap. */
  var WORKDAY = { client: [9, 18], home: [11, 20] };

  function partsIn(tz, date) {
    var f = new Intl.DateTimeFormat("en-GB", {
      timeZone: tz, hour: "2-digit", minute: "2-digit", weekday: "short", hour12: false
    });
    var out = {};
    f.formatToParts(date).forEach(function (p) { out[p.type] = p.value; });
    var h = parseInt(out.hour, 10) % 24;
    var m = parseInt(out.minute, 10);
    return { label: out.hour.replace("24", "00") + ":" + out.minute, hours: h + m / 60, weekday: out.weekday };
  }

  var clocks = Array.prototype.slice.call(document.querySelectorAll(".clock"));
  clocks.forEach(function (clock) {
    var bar = document.createElement("span");
    bar.className = "clock__bar";
    bar.setAttribute("aria-hidden", "true");
    var range = clock.classList.contains("clock--home") ? WORKDAY.home : WORKDAY.client;
    var fill = document.createElement("i");
    fill.style.left = (range[0] / 24) * 100 + "%";
    fill.style.width = ((range[1] - range[0]) / 24) * 100 + "%";
    var now = document.createElement("b");
    bar.appendChild(fill);
    bar.appendChild(now);
    clock.appendChild(bar);
  });

  var statusEl = document.querySelector(".status");

  function tick() {
    var date = new Date();
    clocks.forEach(function (clock) {
      var tz = clock.getAttribute("data-tz");
      var p;
      try { p = partsIn(tz, date); } catch (e) { return; }
      var range = clock.classList.contains("clock--home") ? WORKDAY.home : WORKDAY.client;
      var weekday = p.weekday !== "Sat" && p.weekday !== "Sun";
      clock.querySelector(".clock__time").textContent = p.label;
      clock.querySelector(".clock__bar b").style.left = (p.hours / 24) * 100 + "%";
      clock.classList.toggle("is-working", weekday && p.hours >= range[0] && p.hours < range[1]);
    });

    if (statusEl) {
      var home = document.querySelector(".clock--home");
      var online = home && home.classList.contains("is-working");
      statusEl.innerHTML = online
        ? '<span class="status__dot"></span>Team online now'
        : '<span class="status__dot" style="background:#9a9ca3;animation:none"></span>Replies next business day';
    }
  }
  tick();
  setInterval(tick, 15000);

  /* ---------- Contact form ----------
     Static fallback: composes an email to sales@. Swap for a form backend
     (Formspree, HubSpot, a serverless endpoint) before launch. */
  var form = document.getElementById("contact-form");
  var statusLine = form.querySelector(".form__status");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.elements.name;
    var email = form.elements.email;
    var ok = true;
    [name, email].forEach(function (input) {
      var valid = input.value.trim() !== "" && (input.type !== "email" || /^\S+@\S+\.\S+$/.test(input.value));
      input.classList.toggle("is-invalid", !valid);
      if (!valid) ok = false;
    });
    if (!ok) {
      statusLine.style.color = "#ff8f8f";
      statusLine.textContent = "Please add your name and a valid work email.";
      return;
    }

    var needs = Array.prototype.slice.call(form.querySelectorAll('input[name="need"]:checked'))
      .map(function (c) { return c.value; }).join(", ") || "Not specified";
    var body = [
      "Name: " + name.value.trim(),
      "Email: " + email.value.trim(),
      "Company: " + (form.elements.company.value.trim() || "-"),
      "Country: " + form.elements.country.value,
      "Needs: " + needs,
      "",
      form.elements.message.value.trim()
    ].join("\n");

    window.location.href = "mailto:sales@winapps.co.in?subject=" +
      encodeURIComponent("New project inquiry from " + name.value.trim()) +
      "&body=" + encodeURIComponent(body);

    statusLine.style.color = "";
    statusLine.textContent = "Opening your email app. If nothing happens, write to sales@winapps.co.in.";
  });

  /* ---------- Year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
