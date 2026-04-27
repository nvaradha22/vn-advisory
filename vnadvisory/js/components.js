/* ============================================================
   components.js — VN Advisory
   Inlines nav and footer into every page that calls:
     <div id="nav-placeholder"></div>
     <div id="footer-placeholder"></div>
   ============================================================ */

(function () {
  'use strict';

  /* ── Detect path depth so relative hrefs work from any directory ── */
  const depth  = (window.location.pathname.match(/\//g) || []).length - 1;
  const root   = depth <= 1 ? './' : '../';  // '' for root, '../' for /insights/, /case-studies/ etc.

  /* ──────────────────────────────────────────────────────────────
     NAV HTML
     ────────────────────────────────────────────────────────────── */
  const navHTML = `
<nav class="site-nav" id="site-nav" role="navigation" aria-label="Main navigation">

  <!-- Gold top rule -->
  <div style="position:absolute;top:0;left:0;width:100%;height:2px;background:linear-gradient(90deg,var(--gold),transparent 60%);pointer-events:none"></div>

  <div class="nav-inner">

    <!-- Wordmark -->
    <a href="${root}index.html" class="nav-brand" aria-label="VN Advisory — home">
      <span class="nav-brand-main">VN Advisory</span>
      <span class="nav-brand-sub">Strategic Intelligence</span>
    </a>

    <!-- Desktop links -->
    <ul class="nav-links" role="list">
      <li><a href="${root}index.html"    class="nav-link">Home</a></li>
      <li><a href="${root}services.html" class="nav-link">Services</a></li>
      <li><a href="${root}insights.html" class="nav-link">Insights</a></li>
      <li><a href="${root}about.html"    class="nav-link">About</a></li>
    </ul>

    <!-- CTA -->
    <a href="${root}contact.html" class="nav-cta">Request a Briefing</a>

    <!-- Mobile hamburger -->
    <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-mobile-panel">
      <span></span><span></span><span></span>
    </button>

  </div>

  <!-- Mobile panel -->
  <div class="nav-mobile" id="nav-mobile-panel" role="dialog" aria-label="Mobile navigation" hidden>
    <ul role="list">
      <li><a href="${root}index.html"    class="nav-link">Home</a></li>
      <li><a href="${root}services.html" class="nav-link">Services</a></li>
      <li><a href="${root}insights.html" class="nav-link">Insights</a></li>
      <li><a href="${root}about.html"    class="nav-link">About</a></li>
      <li><a href="${root}contact.html"  class="nav-link nav-link--cta">Request a Briefing</a></li>
    </ul>
    <div class="nav-mobile-contact">
      <a href="mailto:info@vnadvisory.in">info@vnadvisory.in</a>
    </div>
  </div>

</nav>`;

  /* ──────────────────────────────────────────────────────────────
     FOOTER HTML
     ────────────────────────────────────────────────────────────── */
  const footerHTML = `
<footer class="site-footer" role="contentinfo">

  <!-- Gold top rule -->
  <div style="width:100%;height:1px;background:linear-gradient(90deg,var(--gold),transparent 50%);margin-bottom:56px"></div>

  <div class="container">
    <div class="footer-grid">

      <!-- Col 1: Brand + descriptor -->
      <div class="footer-brand-col">
        <a href="${root}index.html" class="footer-wordmark" aria-label="VN Advisory home">
          VN Advisory
        </a>
        <p class="footer-descriptor">
          Boutique supply chain intelligence. GCC · India · ASEAN.
        </p>
        <p class="footer-descriptor" style="margin-top:8px;font-style:italic">
          Active engagements across GCC steel, FMCG distribution,
          precision manufacturing, commodity trading, and industrial logistics.
        </p>
        <div class="footer-social">
          <a href="https://linkedin.com/company/vnadvisory" target="_blank" rel="noopener" aria-label="VN Advisory on LinkedIn" class="footer-social-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
          <a href="mailto:info@vnadvisory.in" aria-label="Email VN Advisory" class="footer-social-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            Email
          </a>
        </div>
      </div>

      <!-- Col 2: Services -->
      <div class="footer-nav-col">
        <h3 class="footer-col-heading">Services</h3>
        <ul class="footer-nav-list" role="list">
          <li><a href="${root}services.html#supply-chain">Supply Chain Intelligence</a></li>
          <li><a href="${root}services.html#procurement">Procurement &amp; Strategic Sourcing</a></li>
          <li><a href="${root}services.html#geopolitical">Geopolitical Risk</a></li>
          <li><a href="${root}services.html#digital">AI Operations</a></li>
          <li><a href="${root}services.html#commodity">Commodity &amp; Trade Advisory</a></li>
          <li><a href="${root}services.html#logistics">Logistics &amp; Transportation</a></li>
        </ul>
      </div>

      <!-- Col 3: Intelligence -->
      <div class="footer-nav-col">
        <h3 class="footer-col-heading">Intelligence</h3>
        <ul class="footer-nav-list" role="list">
          <li><a href="${root}insights/supply-chain-risk-financial.html">Supply Chain Risk is Now Financial Risk</a></li>
          <li><a href="${root}insights/cbam-2026.html">CBAM 2026</a></li>
          <li><a href="${root}insights/geopolitical-fragmentation.html">Geopolitical Fragmentation</a></li>
          <li><a href="${root}insights/ai-supply-chain.html">AI-Driven Supply Chains</a></li>
          <li><a href="${root}insights/procurement-transformation.html">Procurement Transformation</a></li>
          <li><a href="${root}insights.html">All Insights &amp; Case Studies →</a></li>
        </ul>
      </div>

      <!-- Col 4: Contact -->
      <div class="footer-nav-col">
        <h3 class="footer-col-heading">Contact</h3>
        <ul class="footer-nav-list footer-contact-list" role="list">
          <li>
            <a href="mailto:info@vnadvisory.in">info@vnadvisory.in</a>
            <span class="footer-contact-note">General enquiries</span>
          </li>
          <li>
            <a href="mailto:varadha@vnadvisory.in">varadha@vnadvisory.in</a>
            <span class="footer-contact-note">Direct — Varadha N.</span>
          </li>
          <li style="margin-top:16px">
            <a href="${root}contact.html" class="footer-cta-link">Request a Briefing →</a>
          </li>
        </ul>
      </div>

    </div><!-- /footer-grid -->

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <span>&copy; <span id="footer-year"></span> VN Advisory. All rights reserved.</span>
      <span class="footer-bottom-sep">·</span>
      <span>vnadvisory.in</span>
      <span class="footer-bottom-sep">·</span>
      <span>Chennai &amp; GCC</span>
    </div>

  </div><!-- /container -->

</footer>`;

  /* ──────────────────────────────────────────────────────────────
     NAV STYLES (injected once, keeps main.css clean)
     ────────────────────────────────────────────────────────────── */
  const navCSS = `
.site-nav {
  position: sticky;
  top: 0;
  z-index: 900;
  background: var(--navy);
  border-bottom: 0.5px solid rgba(201,162,39,.18);
  box-shadow: 0 1px 24px rgba(0,0,0,.25);
}
.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 40px;
  position: relative;
}
.nav-brand {
  display: flex;
  flex-direction: column;
  gap: 1px;
  text-decoration: none;
  flex-shrink: 0;
}
.nav-brand-main {
  font-family: var(--serif);
  font-size: 1.15rem;
  font-weight: 400;
  color: var(--text-invert);
  letter-spacing: .02em;
  line-height: 1;
}
.nav-brand-sub {
  font-family: var(--sans);
  font-size: .58rem;
  font-weight: 500;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--gold);
  line-height: 1;
}
.nav-links {
  display: flex;
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: auto;
}
.nav-link {
  font-family: var(--sans);
  font-size: .8rem;
  font-weight: 500;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: rgba(248,246,241,.7);
  text-decoration: none;
  padding: 4px 0;
  border-bottom: 1.5px solid transparent;
  transition: color .2s, border-color .2s;
}
.nav-link:hover,
.nav-link.active {
  color: var(--text-invert);
  border-bottom-color: var(--gold);
}
.nav-cta {
  font-family: var(--sans);
  font-size: .75rem;
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--navy);
  background: var(--gold);
  padding: 9px 20px;
  border-radius: 3px;
  text-decoration: none;
  white-space: nowrap;
  transition: opacity .2s, transform .15s;
  flex-shrink: 0;
}
.nav-cta:hover { opacity: .88; transform: translateY(-1px); }
.nav-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin-left: auto;
}
.nav-hamburger span {
  display: block;
  width: 22px;
  height: 1.5px;
  background: var(--text-invert);
  border-radius: 2px;
  transition: transform .25s, opacity .2s;
}
.nav-hamburger[aria-expanded="true"] span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.nav-hamburger[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
.nav-hamburger[aria-expanded="true"] span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
.nav-mobile {
  background: var(--navy-dk);
  border-top: 0.5px solid rgba(201,162,39,.15);
  padding: 24px;
}
.nav-mobile[hidden] { display: none; }
.nav-mobile ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0; }
.nav-mobile ul li { border-bottom: 0.5px solid rgba(248,246,241,.06); }
.nav-mobile ul li:last-child { border-bottom: none; }
.nav-mobile .nav-link {
  display: block;
  padding: 14px 0;
  font-size: .85rem;
  color: rgba(248,246,241,.8);
  border-bottom: none;
}
.nav-mobile .nav-link--cta {
  color: var(--gold);
  font-weight: 600;
  margin-top: 8px;
  border-bottom: none;
}
.nav-mobile-contact {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 0.5px solid rgba(248,246,241,.08);
}
.nav-mobile-contact a {
  font-family: var(--sans);
  font-size: .78rem;
  color: rgba(248,246,241,.4);
  text-decoration: none;
}
@media (max-width: 768px) {
  .nav-links, .nav-cta { display: none; }
  .nav-hamburger { display: flex; }
  .nav-inner { gap: 0; }
}

/* ── FOOTER ── */
.site-footer {
  background: var(--navy-dk);
  padding: 56px 0 40px;
  margin-top: 0;
}
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1.2fr 1.2fr 1.2fr;
  gap: 48px;
  padding-bottom: 48px;
  border-bottom: 0.5px solid rgba(248,246,241,.08);
}
.footer-wordmark {
  font-family: var(--serif);
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--text-invert);
  text-decoration: none;
  letter-spacing: .03em;
  display: block;
  margin-bottom: 14px;
}
.footer-descriptor {
  font-family: var(--serif-body);
  font-size: .85rem;
  font-weight: 300;
  color: rgba(248,246,241,.45);
  line-height: 1.7;
  margin: 0;
}
.footer-social {
  display: flex;
  gap: 16px;
  margin-top: 20px;
  flex-wrap: wrap;
}
.footer-social-link {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--sans);
  font-size: .75rem;
  font-weight: 500;
  color: rgba(248,246,241,.5);
  text-decoration: none;
  transition: color .2s;
}
.footer-social-link:hover { color: var(--gold); }
.footer-col-heading {
  font-family: var(--sans);
  font-size: .65rem;
  font-weight: 600;
  letter-spacing: .13em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0 0 16px;
}
.footer-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer-nav-list a {
  font-family: var(--sans);
  font-size: .8rem;
  color: rgba(248,246,241,.5);
  text-decoration: none;
  line-height: 1.5;
  transition: color .2s;
}
.footer-nav-list a:hover { color: var(--text-invert); }
.footer-contact-note {
  display: block;
  font-family: var(--sans);
  font-size: .68rem;
  color: rgba(248,246,241,.28);
  margin-top: 2px;
}
.footer-cta-link {
  font-family: var(--sans);
  font-size: .78rem;
  font-weight: 600;
  color: var(--gold) !important;
  letter-spacing: .04em;
}
.footer-bottom {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 24px;
  font-family: var(--sans);
  font-size: .72rem;
  color: rgba(248,246,241,.25);
  flex-wrap: wrap;
}
.footer-bottom-sep { opacity: .4; }

@media (max-width: 900px) {
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
  .footer-brand-col { grid-column: 1 / -1; }
}
@media (max-width: 560px) {
  .footer-grid { grid-template-columns: 1fr; }
}
`;

  /* ──────────────────────────────────────────────────────────────
     INJECT
     ────────────────────────────────────────────────────────────── */
  function inject () {

    /* 1. Inject styles once */
    if (!document.getElementById('vna-component-styles')) {
      const style = document.createElement('style');
      style.id = 'vna-component-styles';
      style.textContent = navCSS;
      document.head.appendChild(style);
    }

    /* 2. Nav */
    const navEl = document.getElementById('nav-placeholder');
    if (navEl) {
      navEl.outerHTML = navHTML;

      /* Hamburger toggle */
      const ham   = document.getElementById('nav-hamburger');
      const panel = document.getElementById('nav-mobile-panel');
      if (ham && panel) {
        ham.addEventListener('click', function () {
          const open = this.getAttribute('aria-expanded') === 'true';
          this.setAttribute('aria-expanded', String(!open));
          panel.hidden = open;
        });
      }

      /* Active link highlight */
      const path  = window.location.pathname;
      document.querySelectorAll('.nav-link').forEach(function (a) {
        if (a.getAttribute('href') && path.endsWith(a.getAttribute('href').replace(/^\.\//, ''))) {
          a.classList.add('active');
        }
      });
    }

    /* 3. Footer */
    const footEl = document.getElementById('footer-placeholder');
    if (footEl) {
      footEl.outerHTML = footerHTML;
      const yr = document.getElementById('footer-year');
      if (yr) yr.textContent = new Date().getFullYear();
    }
  }

  /* Run after DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
