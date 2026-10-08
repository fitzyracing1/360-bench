/* 360 Bench — page behaviour. Vanilla JS, no dependencies, no network calls. */
(function () {
  "use strict";

  var DATA = window.BENCH_DATA;
  var R = window.BenchRender;
  var CONTACT_EMAIL = (DATA && DATA.links.email) || "Fitzyracing1@gmail.com";
  var ISSUE_BASE = (DATA && DATA.links.issues) || "https://github.com/fitzyracing1/360-bench/issues/new";

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------------- Projects ---------------- */
  function renderAll() {
    if (!DATA || !R) return;
    var list = $("#projects-list");
    if (list) list.innerHTML = R.renderProjects(DATA);
    var dots = $("#dial-dots");
    if (dots) dots.innerHTML = R.renderDial(DATA);
    var st = R.stats(DATA);
    $all("[data-stat]").forEach(function (el) { el.textContent = st[el.getAttribute("data-stat")]; });
    initTabs();
    initFilters();
  }

  function initFilters() {
    var box = $("#filters");
    if (!box) return;
    var used = DATA.ecosystems.filter(function (e) {
      return DATA.projects.some(function (p) { return p.ecosystem === e.id; });
    });
    var btns = [{ id: "all", label: "All", n: DATA.projects.length }].concat(used.map(function (e) {
      return { id: e.id, label: e.label, n: DATA.projects.filter(function (p) { return p.ecosystem === e.id; }).length };
    }));
    box.innerHTML = btns.map(function (b) {
      return '<button type="button" class="filter" data-filter="' + R.esc(b.id) + '" aria-pressed="' + (b.id === "all") + '"' +
        (b.id !== "all" ? ' style="--c: var(--' + R.esc(b.id) + ')"' : "") + ">" +
        (b.id !== "all" ? '<span class="dot" aria-hidden="true"></span>' : "") +
        R.esc(b.label) + ' <span class="filter__n" aria-label="' + b.n + ' projects">' + b.n + "</span></button>";
    }).join("");
    box.hidden = false;
    box.addEventListener("click", function (e) {
      var b = e.target.closest(".filter");
      if (!b) return;
      applyFilter(b.getAttribute("data-filter"));
    });
    // Dial markers: make sure the card they point to is visible.
    var dots = $("#dial-dots");
    if (dots) dots.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (!a) return;
      var card = document.querySelector(a.getAttribute("href"));
      if (card && card.closest(".eco[hidden]")) applyFilter("all");
    });
  }

  function applyFilter(id) {
    $all(".filter").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === id)); });
    var shown = 0;
    $all(".eco").forEach(function (s) {
      var on = id === "all" || s.getAttribute("data-eco") === id;
      s.hidden = !on;
      if (on) shown += $all(".card", s).length;
    });
    var label = id === "all" ? "all ecosystems" : (DATA.ecosystems.filter(function (e) { return e.id === id; })[0] || {}).label;
    var status = $("#filter-status");
    if (status) status.textContent = "Showing " + shown + (shown === 1 ? " project" : " projects") + " from " + label + ".";
  }

  function initTabs() {
    $all(".snip--multi").forEach(function (snip) {
      var tabs = $all('[role="tab"]', snip);
      var panels = $all('[role="tabpanel"]', snip);
      function select(i, focus) {
        tabs.forEach(function (t, j) {
          var on = i === j;
          t.setAttribute("aria-selected", String(on));
          t.tabIndex = on ? 0 : -1;
          panels[j].hidden = !on;
        });
        if (focus) tabs[i].focus();
      }
      tabs.forEach(function (t, i) {
        t.addEventListener("click", function () { select(i, false); });
        t.addEventListener("keydown", function (e) {
          var k = e.key, n = tabs.length, to = null;
          if (k === "ArrowRight") to = (i + 1) % n;
          else if (k === "ArrowLeft") to = (i - 1 + n) % n;
          else if (k === "Home") to = 0;
          else if (k === "End") to = n - 1;
          if (to !== null) { e.preventDefault(); select(to, true); }
        });
      });
      select(0, false);
    });
  }

  /* ---------------- Copy ---------------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy") ? resolve() : reject(new Error("copy failed")); }
      catch (err) { reject(err); }
      finally { document.body.removeChild(ta); }
    });
  }

  var live = document.createElement("p");
  live.className = "visually-hidden";
  live.setAttribute("role", "status");
  live.setAttribute("aria-live", "polite");
  document.body.appendChild(live);
  function announce(msg) { live.textContent = ""; setTimeout(function () { live.textContent = msg; }, 30); }

  document.addEventListener("click", function (e) {
    var b = e.target.closest(".copy");
    if (!b) return;
    var label = $(".copy__text", b);
    copyText(b.getAttribute("data-copy")).then(function () {
      b.classList.add("is-copied");
      if (label) label.textContent = "Copied";
      announce("Copied to clipboard");
      setTimeout(function () { b.classList.remove("is-copied"); if (label) label.textContent = "Copy"; }, 1800);
    }, function () {
      if (label) label.textContent = "Press Ctrl+C";
      announce("Copy failed. Select the code and copy it manually.");
    });
  });

  /* ---------------- Submission form ---------------- */
  var form = $("#submit-form");

  function val(name) {
    var el = form.elements[name];
    if (!el) return "";
    if (el.length !== undefined && !el.tagName) { // RadioNodeList
      for (var i = 0; i < el.length; i++) if (el[i].checked) return el[i].value;
      return "";
    }
    return (el.value || "").trim();
  }

  function collect() {
    var partnership = $all('input[name="partnership"]:checked', form).map(function (c) { return c.value; });
    var role = val("role");
    var eco = val("ecosystem");
    return {
      name: val("name"),
      email: val("email"),
      role: role === "Other" && val("role_other") ? "Other: " + val("role_other") : role,
      project: val("project"),
      repo: val("repo"),
      registry: val("registry"),
      ecosystem: eco === "Other" && val("ecosystem_other") ? "Other: " + val("ecosystem_other") : eco,
      broken: val("broken"),
      dependents: val("dependents"),
      partnership: partnership,
      partnershipOther: partnership.indexOf("Something else") >= 0 ? val("partnership_other") : "",
      consent: form.elements.consent.checked,
      publicEmail: form.elements.public_email.checked
    };
  }

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function isUrl(s) {
    try { var u = new URL(s); return (u.protocol === "https:" || u.protocol === "http:") && /\./.test(u.hostname); }
    catch (e) { return false; }
  }

  // Returns [{id, msg}] for every invalid field.
  function validate() {
    var d = collect();
    var errs = [];
    if (!d.name) errs.push({ id: "f-name", msg: "Enter your name." });
    if (!d.email) errs.push({ id: "f-email", msg: "Enter your email address." });
    else if (!EMAIL_RE.test(d.email)) errs.push({ id: "f-email", msg: "Enter a valid email address, like name@example.com." });
    if (!val("role")) errs.push({ id: "f-role", msg: "Choose your role.", focus: 'input[name="role"]' });
    else if (val("role") === "Other" && !val("role_other")) errs.push({ id: "f-role-other", msg: "Describe your role." });
    if (!d.project) errs.push({ id: "f-project", msg: "Enter the project name." });
    if (!d.repo) errs.push({ id: "f-repo", msg: "Enter the repository URL." });
    else if (!isUrl(d.repo)) errs.push({ id: "f-repo", msg: "Enter a full URL starting with https://" });
    if (d.registry && !isUrl(d.registry)) errs.push({ id: "f-registry", msg: "Enter a full URL starting with https://, or leave it empty." });
    if (!val("ecosystem")) errs.push({ id: "f-eco", msg: "Choose the ecosystem.", focus: 'input[name="ecosystem"]' });
    if (!d.broken) errs.push({ id: "f-broken", msg: "Tell us what's broken or why it's abandoned." });
    else if (d.broken.length < 15) errs.push({ id: "f-broken", msg: "Add a little more detail (at least 15 characters)." });
    if (d.partnership.indexOf("Something else") >= 0 && !val("partnership_other")) errs.push({ id: "f-partner-other", msg: "Describe the partnership you have in mind, or untick (e)." });
    if (!d.consent) errs.push({ id: "f-consent", msg: "Tick the box to confirm you agree." });
    return errs;
  }

  var ALL_ERR_IDS = ["f-name", "f-email", "f-role", "f-role-other", "f-project", "f-repo", "f-registry", "f-eco", "f-broken", "f-partner-other", "f-consent"];
  var attempted = false;

  function showErrors(errs, summary) {
    ALL_ERR_IDS.forEach(function (id) {
      var el = document.getElementById(id);
      var msg = document.getElementById(id + "-err");
      if (el) el.removeAttribute("aria-invalid");
      if (msg) msg.textContent = "";
    });
    errs.forEach(function (e) {
      var el = document.getElementById(e.id);
      var msg = document.getElementById(e.id + "-err");
      if (el && msg && !msg.textContent) { el.setAttribute("aria-invalid", "true"); msg.textContent = e.msg; }
    });
    var box = $("#error-summary");
    if (!summary) { if (!errs.length) box.hidden = true; return; }
    if (!errs.length) { box.hidden = true; return; }
    $("ul", box).innerHTML = errs.map(function (e) {
      return '<li><a href="#' + e.id + '" data-focus="' + R.esc(e.focus || "") + '">' + R.esc(e.msg) + "</a></li>";
    }).join("");
    box.hidden = false;
    box.focus();
  }

  function bullet(list) { return list.map(function (x) { return "- " + x; }).join("\n"); }

  function buildEmailBody(d) {
    var L = [];
    L.push("Hi Joshua,", "", "I'd like 360 Bench to consider reviving this project.", "");
    L.push("PROJECT");
    L.push("- Name: " + d.project);
    L.push("- Ecosystem: " + d.ecosystem);
    L.push("- Repository: " + d.repo);
    L.push("- Registry: " + (d.registry || "(not provided)"));
    L.push("", "WHAT'S BROKEN / WHY IT'S ABANDONED", d.broken);
    L.push("", "WHO DEPENDS ON IT", d.dependents || "(not provided)");
    L.push("", "PARTNERSHIP INTEREST");
    L.push(d.partnership.length ? bullet(d.partnership) : "- (none selected)");
    if (d.partnershipOther) L.push("  Details: " + d.partnershipOther);
    L.push("", "ABOUT ME");
    L.push("- Name: " + d.name);
    L.push("- Email: " + d.email);
    L.push("- Role: " + d.role);
    L.push("", "---");
    L.push("I agree that 360 Bench may contact me about this submission. Submitting is not a commitment by either side; any equity or partnership terms are agreed project by project after a conversation.");
    L.push("Sent from the 360 Bench website.");
    return L.join("\n");
  }

  function buildIssueBody(d) {
    var L = [];
    L.push("### Project", "");
    L.push("- **Name:** " + d.project);
    L.push("- **Ecosystem:** " + d.ecosystem);
    L.push("- **Repository:** " + d.repo);
    L.push("- **Registry:** " + (d.registry || "_not provided_"));
    L.push("", "### What's broken / why it's abandoned", "", d.broken);
    L.push("", "### Who depends on it", "", d.dependents || "_not provided_");
    L.push("", "### Partnership interest", "");
    var opts = ["Just fix it, no strings", "Transfer or share maintainership back after revival", "Open to discussing an equity position in exchange for reviving the project", "Sponsorship / paid support", "Something else"];
    opts.forEach(function (o) { L.push("- [" + (d.partnership.indexOf(o) >= 0 ? "x" : " ") + "] " + o); });
    if (d.partnershipOther) L.push("", "Details: " + d.partnershipOther);
    L.push("", "### Submitted by", "");
    L.push("- **Name:** " + d.name);
    L.push("- **Role:** " + d.role);
    if (d.publicEmail) L.push("- **Email:** " + d.email);
    L.push("", "---", "_Submitted via the 360 Bench website. Submitting is not a commitment by either side; any equity or partnership terms are agreed project by project after a conversation._");
    return L.join("\n");
  }

  function subjectFor(d) { return "360 Bench submission: " + d.project; }

  // RFC 6068: encode everything, CRLF line breaks.
  function buildMailto(d) {
    var body = buildEmailBody(d).replace(/\r?\n/g, "\r\n");
    return "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(subjectFor(d)) + "&body=" + encodeURIComponent(body);
  }

  function buildIssueUrl(d) {
    return ISSUE_BASE + "?title=" + encodeURIComponent(subjectFor(d)) +
      "&body=" + encodeURIComponent(buildIssueBody(d)) + "&labels=submission";
  }

  function showResult(via, d, url) {
    var box = $("#result");
    var isEmail = via === "email";
    var body = isEmail ? buildEmailBody(d) : buildIssueBody(d);
    $("#result-title").textContent = isEmail ? "Your email is ready." : "Your GitHub issue is ready.";
    $("#result-text").textContent = isEmail
      ? "Your email app should have opened with the message to " + CONTACT_EMAIL + ". Nothing is sent until you press send. If nothing opened, copy the message and email it to " + CONTACT_EMAIL + " with the subject \u201C" + subjectFor(d) + "\u201D."
      : "A pre-filled issue should have opened in a new tab. Review it, edit anything you like, and press \u201CSubmit new issue\u201D. If nothing opened, use the button below." + (url.length > 8000 ? " The message is long, so GitHub may cut it off: copy the message and paste it into the issue instead." : "");
    var open = $("#result-open");
    open.href = url;
    open.textContent = isEmail ? "Open email again" : "Open GitHub issue";
    if (isEmail) { open.removeAttribute("target"); } else { open.target = "_blank"; }
    $("#result-copy").onclick = function () {
      var b = this;
      copyText((isEmail ? "To: " + CONTACT_EMAIL + "\nSubject: " + subjectFor(d) + "\n\n" : "") + body).then(function () {
        b.textContent = "Copied"; announce("Message copied to clipboard");
        setTimeout(function () { b.textContent = "Copy message"; }, 1800);
      });
    };
    $("#result-body").textContent = isEmail ? "To: " + CONTACT_EMAIL + "\nSubject: " + subjectFor(d) + "\n\n" + body : "Title: " + subjectFor(d) + "\n\n" + body;
    box.hidden = false;
    box.focus();
  }

  function toggleReveal(wrapId, show) {
    var w = document.getElementById(wrapId);
    if (w) w.hidden = !show;
  }

  if (form) {
    form.addEventListener("change", function (e) {
      if (e.target.name === "role") toggleReveal("f-role-other-wrap", val("role") === "Other");
      if (e.target.name === "ecosystem") toggleReveal("f-eco-other-wrap", val("ecosystem") === "Other");
      if (e.target.id === "p-other") toggleReveal("f-partner-other-wrap", e.target.checked);
      if (attempted) showErrors(validate(), false);
    });
    form.addEventListener("input", function () { if (attempted) showErrors(validate(), false); });
    form.addEventListener("focusout", function (e) {
      // Validate a single text field on blur once the user has typed something.
      if (attempted || !e.target.value || !/^(INPUT|TEXTAREA)$/.test(e.target.tagName) || e.target.type === "checkbox" || e.target.type === "radio") return;
      var mine = validate().filter(function (er) { return er.id === e.target.id; });
      var msg = document.getElementById(e.target.id + "-err");
      if (!msg) return;
      if (mine.length) { e.target.setAttribute("aria-invalid", "true"); msg.textContent = mine[0].msg; }
      else { e.target.removeAttribute("aria-invalid"); msg.textContent = ""; }
    });

    $("#error-summary").addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (!a) return;
      e.preventDefault();
      var target = a.getAttribute("data-focus") ? form.querySelector(a.getAttribute("data-focus")) : document.querySelector(a.getAttribute("href"));
      if (target) { target.focus(); target.scrollIntoView({ block: "center" }); }
    });

    var lastVia = "email";
    $all('button[name="via"]', form).forEach(function (b) {
      b.addEventListener("click", function () { lastVia = b.value; });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      attempted = true;
      var via = (e.submitter && e.submitter.value) || lastVia;
      var errs = validate();
      showErrors(errs, true);
      if (errs.length) return;
      var d = collect();
      if (via === "github") {
        var url = buildIssueUrl(d);
        window.open(url, "_blank", "noopener");
        showResult("github", d, url);
      } else {
        var mt = buildMailto(d);
        window.location.href = mt;
        showResult("email", d, mt);
      }
    });
  }

  // Exposed for testing and for anyone who wants to reuse the builders.
  window.BenchForm = { collect: collect, validate: validate, buildMailto: buildMailto, buildIssueUrl: buildIssueUrl, buildEmailBody: buildEmailBody, buildIssueBody: buildIssueBody };

  renderAll();
  // If the page was opened with a #p-... hash, the cards now exist: scroll to it.
  if (/^#p-/.test(location.hash)) {
    var t = document.querySelector(location.hash);
    if (t) t.scrollIntoView();
  }
})();
