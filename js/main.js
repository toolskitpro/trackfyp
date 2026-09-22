/* ============================================
   TrackFyp — shared site behaviour
   Include this on every page along with a
   <div id="site-header"></div> and
   <div id="site-footer"></div> placeholder.
   Pages set window.BASE = "" (root) or "../" (subfolder)
   before loading this script.
   ============================================ */
(function(){
  const BASE = window.BASE || "";

  const NAV_ITEMS = [
    { href: BASE + "index.html", ur: "Home", en: "Home" },
    { href: BASE + "tools/analyze.html", ur: "Analyze", en: "Analyze" },
    { href: BASE + "tools/hashtag-generator.html", ur: "Hashtags", en: "Hashtags" },
    { href: BASE + "tools/best-time.html", ur: "Best Time", en: "Best Time" },
    { href: BASE + "blog/index.html", ur: "Blog", en: "Blog" },
    { href: BASE + "premium.html", ur: "Premium", en: "Premium" }
  ];

  function buildHeader(){
    const el = document.getElementById("site-header");
    if(!el) return;
    const links = NAV_ITEMS.map(item =>
      `<a href="${item.href}" data-ur="${item.ur}" data-en="${item.en}">${item.ur}</a>`
    ).join("");
    el.innerHTML = `
      <div class="nav-row">
        <a href="${BASE}index.html" class="brand">Track<span>Fyp</span></a>
        <div class="nav-links" id="navLinks">${links}
          <div class="lang-switch">
            <button class="lang-btn" data-lang="ur">Roman Urdu</button>
            <button class="lang-btn" data-lang="en">English</button>
          </div>
        </div>
        <button class="menu-toggle" id="menuToggle">☰</button>
      </div>`;
    document.getElementById("menuToggle").addEventListener("click", () => {
      document.getElementById("navLinks").classList.toggle("open");
    });
  }

  function buildFooter(){
    const el = document.getElementById("site-footer");
    if(!el) return;
    el.innerHTML = `
      <div class="container" style="display:flex;flex-direction:column;gap:16px;">
        <div style="display:flex;gap:18px;flex-wrap:wrap;">
          <a href="${BASE}privacy.html" data-ur="Privacy Policy" data-en="Privacy Policy">Privacy Policy</a>
          <a href="${BASE}terms.html" data-ur="Terms of Use" data-en="Terms of Use">Terms of Use</a>
          <a href="${BASE}about.html" data-ur="Contact / About" data-en="Contact / About">Contact / About</a>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;flex-wrap:wrap;width:100%;border-top:1px solid var(--line);padding-top:16px;">
          <div data-ur="© TrackFyp — TikTok creators ke liye bana." data-en="© TrackFyp — built for TikTok creators.">© TrackFyp</div>
          <div data-ur="Sirf public data use hota hai. Kisi ke account ka koi private data access nahi hota." data-en="Only public data is used. No private account data is ever accessed.">Only public data is used.</div>
        </div>
      </div>`;
  }

  function applyLang(lang){
    document.querySelectorAll("[data-ur]").forEach(elm => {
      const val = lang === "ur" ? elm.getAttribute("data-ur") : elm.getAttribute("data-en");
      if(val !== null) elm.innerHTML = val;
    });
    document.querySelectorAll("[data-ur-ph]").forEach(elm => {
      const val = lang === "ur" ? elm.getAttribute("data-ur-ph") : elm.getAttribute("data-en-ph");
      if(val !== null) elm.setAttribute("placeholder", val);
    });
    document.querySelectorAll(".lang-btn").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
    try { localStorage.setItem("trackfyp_lang", lang); } catch(e){}
  }

  function initLang(){
    let lang = "ur";
    try { lang = localStorage.getItem("trackfyp_lang") || "ur"; } catch(e){}
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.addEventListener("click", () => applyLang(btn.dataset.lang));
    });
    applyLang(lang);
  }

  function highlightActiveNav(){
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(a => {
      if(a.getAttribute("href").endsWith(path)) a.classList.add("active");
    });
  }

  // Shows the "backend needed" notice under a tool form instead of
  // pretending to fetch real TikTok data from a static GitHub Pages site.
  window.showBackendNote = function(boxId){
    const box = document.getElementById(boxId);
    if(box) box.classList.add("show");
  };

  document.addEventListener("DOMContentLoaded", () => {
    buildHeader();
    buildFooter();
    initLang();
    highlightActiveNav();
  });
})();
