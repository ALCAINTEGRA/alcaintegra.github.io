/* ALCAINTEGRA Analytics — public website and synthetic demo only.
 * Activation requires the owner's GA4 web measurement ID and reviewed privacy disclosure.
 * Empty ID = no tracking, external requests, cookies or consent interface.
 */
(() => {
  "use strict";
  const ID = "";
  const paths = new Set(["/", "/index.html", "/demo.html"]);
  if (location.hostname !== "alcaintegra.github.io" || !paths.has(location.pathname) || !/^G-[A-Z0-9]+$/.test(ID)) return;
  const key = "alcaintegra.analytics.consent.v1";
  let consent = null, started = false, loaded = false;
  try { consent = localStorage.getItem(key); } catch (_) {}
  const page = location.pathname === "/demo.html" ? "demo" : "commercial";
  const pageUrl = location.origin + (page === "demo" ? "/demo.html" : "/");
  const cleanReferrer = () => { try { return document.referrer ? new URL(document.referrer).origin + "/" : ""; } catch (_) { return ""; } };
  function event(name, params = {}) {
    if (consent !== "yes" || !loaded || typeof window.gtag !== "function") return;
    window.gtag("event", name, {send_to:ID,page_location:pageUrl,page_referrer:cleanReferrer(), ...params});
  }
  function start() {
    if (started || consent !== "yes") return;
    started = true;
    window["ga-disable-" + ID] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){window.dataLayer.push(arguments);};
    window.gtag("consent","default",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
    window.gtag("consent","update",{analytics_storage:"granted",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
    window.gtag("js",new Date());
    window.gtag("config",ID,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:pageUrl,page_referrer:cleanReferrer()});
    const tag=document.createElement("script");tag.async=true;
    tag.src="https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(ID);
    tag.onload=()=>{if(consent!=="yes")return;loaded=true;event("page_view",{page_title:page==="demo"?"AIRA Demo":"ALCAINTEGRA"});if(page==="demo")event("demo_view");};
    document.head.append(tag);
  }
  const style=document.createElement("style");
  style.textContent=".aira-privacy-toggle{border:1px solid #788899;border-radius:12px;background:#192537;color:white;padding:10px 14px;min-height:44px;font:600 13px system-ui;cursor:pointer;margin:12px}.aira-privacy-panel{position:fixed;z-index:1000;bottom:calc(80px + env(safe-area-inset-bottom));right:12px;left:12px;max-width:440px;margin-left:auto;padding:18px;background:#192537;color:#f1f5fb;border:1px solid #50627a;border-radius:18px;box-shadow:0 14px 42px #0005;font:14px/1.45 system-ui}.aira-privacy-panel p{margin:8px 0 12px;color:#e1e8f0}.aira-privacy-panel a{color:#bce95a}.aira-privacy-panel button{border-radius:10px;border:1px solid #8fa0b2;padding:10px 12px;min-height:44px;margin:4px;background:#26394d;color:white;font:600 13px system-ui;cursor:pointer}.aira-privacy-panel button:first-of-type{background:#bce95a;color:#101a23;border-color:#bce95a}.aira-privacy-panel[hidden]{display:none}";
  document.head.append(style);
  const panel=document.createElement("section");panel.className="aira-privacy-panel";panel.setAttribute("aria-label","Preferencias de estadísticas");panel.hidden=consent==="yes"||consent==="no";
  panel.innerHTML='<strong>Estadísticas opcionales</strong><p>Con tu autorización usamos Google Analytics para conocer visitas y uso de la demostración. No enviamos formularios, búsquedas ni folios. Sin fines publicitarios. Puedes rechazar o cambiar tu decisión.</p><a href="https://policies.google.com/privacy?hl=es" target="_blank" rel="noopener noreferrer">Privacidad de Google</a><div><button type="button" data-choice="yes">Aceptar estadísticas</button><button type="button" data-choice="no">Rechazar</button></div>';
  document.body.append(panel);
  const toggle=document.createElement("button");toggle.type="button";toggle.className="aira-privacy-toggle";toggle.textContent="Preferencias de estadísticas";toggle.addEventListener("click",()=>{panel.hidden=!panel.hidden;toggle.setAttribute("aria-expanded",String(!panel.hidden));});toggle.setAttribute("aria-expanded",String(!panel.hidden));(document.querySelector("footer")||document.querySelector("main")||document.body).append(toggle);
  function clearCookies(){document.cookie.split(";").forEach(pair=>{const name=pair.split("=")[0].trim();if(/^_ga(?:_|$)/.test(name)){document.cookie=name+"=; Max-Age=0; Path=/; Secure; SameSite=Lax";document.cookie=name+"=; Max-Age=0; Path=/; Domain="+location.hostname+"; Secure; SameSite=Lax";}});}
  panel.addEventListener("click",e=>{const b=e.target.closest("[data-choice]");if(!b)return;consent=b.dataset.choice;try{localStorage.setItem(key,consent);}catch(_){}panel.hidden=true;toggle.setAttribute("aria-expanded","false");if(consent==="yes"){start();}else{window["ga-disable-"+ID]=true;clearCookies();if(started)location.reload();}});
  if(consent==="yes")start();
  const price=document.getElementById("inversion");
  if(price&&"IntersectionObserver" in window){const io=new IntersectionObserver(entries=>{if(entries.some(x=>x.isIntersecting)&&loaded&&consent==="yes"){event("pricing_view");io.disconnect();}},{threshold:.25});io.observe(price);}
  document.addEventListener("click",e=>{const el=e.target.closest("a,button");if(!el)return;if(el.matches('a[href="/demo.html"]'))event("demo_open");else if(el.id==="share-site")event("share_click");else if(el.dataset.dialog==="contact")event("contact_info_open");else if(page==="demo"&&["home","cases","payments","funds","control"].includes(el.dataset.view))event("demo_module",{module_name:el.dataset.view});});
})();
