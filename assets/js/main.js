(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
  window.addEventListener("resize", function () { if (window.innerWidth > 900) setMenu(false); });

  /* ---------- Split headlines into masked words ----------
     Walks text nodes so <em> and &nbsp; survive; each word slides up
     out of its own overflow-hidden mask, staggered by --i. */
  var splitIndex = 0;
  function splitNode(node) {
    Array.prototype.slice.call(node.childNodes).forEach(function (child) {
      if (child.nodeType === 3) {
        var frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
          var outer = document.createElement("span");
          var inner = document.createElement("span");
          outer.className = "w";
          inner.className = "w__i";
          inner.style.setProperty("--i", splitIndex++);
          inner.textContent = part;
          outer.appendChild(inner);
          frag.appendChild(outer);
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === 1) {
        splitNode(child);
      }
    });
  }
  var splits = document.querySelectorAll("[data-split]");
  splits.forEach(function (el) {
    el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
    splitIndex = 0;
    splitNode(el);
    Array.prototype.forEach.call(el.children, function (c) { c.setAttribute("aria-hidden", "true"); });
  });

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal, [data-split]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.06 });
    reveals.forEach(function (el, i) {
      if (el.classList.contains("reveal")) el.style.transitionDelay = (i % 4) * 90 + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Hero clip-mask ---------- */
  var mask = document.querySelector(".hero__mask");
  if (mask) requestAnimationFrame(function () { requestAnimationFrame(function () { mask.classList.add("is-in"); }); });

  /* ---------- Parallax numerals ---------- */
  var floats = Array.prototype.slice.call(document.querySelectorAll("[data-speed]"));
  if (floats.length && !reduceMotion) {
    var ticking = false;
    function parallax() {
      var vh = window.innerHeight;
      floats.forEach(function (el) {
        var r = el.parentNode.getBoundingClientRect();
        var offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.getAttribute("data-speed"));
        offset = Math.max(-36, Math.min(36, offset));
        el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(parallax); }
    }, { passive: true });
    parallax();
  }

  /* ---------- Work ledger: cursor-tracking plate ---------- */
  var plate = document.querySelector(".plate");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (plate && finePointer && !reduceMotion) {
    var plateNum = plate.querySelector(".plate__num");
    var plateStack = plate.querySelector(".plate__stack");
    var target = { x: 0, y: 0 }, pos = { x: 0, y: 0 }, running = false;

    function follow() {
      pos.x += (target.x - pos.x) * 0.14;
      pos.y += (target.y - pos.y) * 0.14;
      plate.style.transform = "translate3d(" + pos.x.toFixed(1) + "px," + pos.y.toFixed(1) + "px,0) rotate(" + ((target.x - pos.x) * 0.02).toFixed(2) + "deg)";
      if (Math.abs(target.x - pos.x) > 0.2 || Math.abs(target.y - pos.y) > 0.2 || plate.classList.contains("is-visible")) {
        requestAnimationFrame(follow);
      } else {
        running = false;
      }
    }
    function setTarget(e) {
      target.x = e.clientX + 28;
      target.y = e.clientY - plate.offsetHeight / 2;
      if (target.x + plate.offsetWidth > window.innerWidth - 16) target.x = e.clientX - plate.offsetWidth - 28;
    }

    document.querySelectorAll(".ledger__row").forEach(function (row) {
      row.addEventListener("mouseenter", function (e) {
        plateNum.textContent = row.querySelector(".ledger__num").textContent;
        plateStack.textContent = row.getAttribute("data-stack");
        plate.setAttribute("data-tone", row.getAttribute("data-tone"));
        setTarget(e);
        if (!plate.classList.contains("is-visible")) { pos.x = target.x; pos.y = target.y; }
        plate.classList.add("is-visible");
        if (!running) { running = true; requestAnimationFrame(follow); }
      });
      row.addEventListener("mousemove", setTarget);
      row.addEventListener("mouseleave", function () { plate.classList.remove("is-visible"); });
    });
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
      statusEl.classList.toggle("is-off", !online);
      statusEl.innerHTML = '<span class="status__dot"></span>' + (online ? "Team online now" : "Replies next business day");
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
      statusLine.classList.add("is-error");
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

    statusLine.classList.remove("is-error");
    statusLine.textContent = "Opening your email app. If nothing happens, write to sales@winapps.co.in.";
  });

  /* ---------- Year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
