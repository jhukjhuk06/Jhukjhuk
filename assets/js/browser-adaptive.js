/* JHUK JHUK browser-aware runtime optimization + opt-in diagnostics.
   No telemetry is transmitted. Add ?jjhdebug=1 to the URL to show the local diagnostics panel. */
(() => {
  'use strict';
  const nav = navigator;
  const conn = nav.connection || nav.mozConnection || nav.webkitConnection || null;
  const root = document.documentElement;
  const started = performance.now();
  const report = {
    capturedAt: new Date().toISOString(),
    url: location.href.split('?')[0],
    browser: nav.userAgent,
    platform: nav.userAgentData?.platform || nav.platform || 'unknown',
    language: nav.language || 'unknown',
    viewport: { width: innerWidth, height: innerHeight, dpr: devicePixelRatio || 1 },
    hardware: { cores: nav.hardwareConcurrency || null, deviceMemoryGB: nav.deviceMemory || null },
    network: conn ? { effectiveType: conn.effectiveType || null, downlinkMbps: conn.downlink || null, rttMs: conn.rtt || null, saveData: !!conn.saveData } : { available: false },
    preferences: { reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches, touch: matchMedia('(pointer: coarse)').matches, online: nav.onLine },
    page: { loadMs: null, domContentLoadedMs: null, longTasks: 0, longTaskTotalMs: 0, cls: 0, lcpMs: null, failedImages: [], errors: [] },
    adaptation: []
  };
  const mobile = matchMedia('(max-width: 760px)').matches || matchMedia('(pointer: coarse)').matches;
  const constrained = mobile || (nav.deviceMemory && nav.deviceMemory <= 4) || (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) || (conn && (conn.saveData || /^(slow-2g|2g|3g)$/.test(conn.effectiveType || '')));
  const lowBandwidth = !!(conn && (conn.saveData || /^(slow-2g|2g|3g)$/.test(conn.effectiveType || '')));
  const reduced = report.preferences.reducedMotion;
  function adapt(reason, css) { root.classList.add(css); report.adaptation.push(reason); }
  if (constrained) adapt('constrained-device-mode', 'jjh-light-mode');
  if (lowBandwidth) adapt('slow-or-data-saving-network', 'jjh-low-bandwidth');
  if (reduced) adapt('reduced-motion-preference', 'jjh-reduced-motion');
  if (mobile) {
    // Prevent expensive video decoding and autoplay on phones; poster imagery remains visible.
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('video').forEach(video => {
        video.pause?.();
        video.removeAttribute('autoplay');
        video.preload = 'none';
        video.querySelectorAll('source').forEach(source => source.removeAttribute('src'));
        video.load?.();
      });
      document.querySelectorAll('.poster-card').forEach(card => card.classList.add('jjh-mobile-static'));
    }, { once: true });
    report.adaptation.push('mobile-video-decoding-disabled');
  }
  if (lowBandwidth) {
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('video').forEach(video => { video.pause?.(); video.preload = 'none'; });
    }, { once: true });
  }
  // Observe actual runtime signals where the browser supports them.
  try {
    new PerformanceObserver(list => list.getEntries().forEach(entry => {
      if (entry.entryType === 'longtask') { report.page.longTasks++; report.page.longTaskTotalMs += Math.round(entry.duration); }
    })).observe({ type: 'longtask', buffered: true });
  } catch (_) {}
  try {
    new PerformanceObserver(list => list.getEntries().forEach(entry => {
      if (!entry.hadRecentInput) report.page.cls += entry.value;
    })).observe({ type: 'layout-shift', buffered: true });
  } catch (_) {}
  try {
    new PerformanceObserver(list => list.getEntries().forEach(entry => { report.page.lcpMs = Math.round(entry.startTime); }))
      .observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (_) {}
  addEventListener('error', event => {
    if (event.target && event.target !== window) {
      const el = event.target;
      if (el.tagName === 'IMG') report.page.failedImages.push({ src: el.currentSrc || el.src || '', alt: el.alt || '' });
      else report.page.errors.push('Resource failed: ' + (el.src || el.href || el.tagName));
    } else report.page.errors.push(String(event.message || 'JavaScript error'));
  }, true);
  addEventListener('unhandledrejection', event => report.page.errors.push('Unhandled promise: ' + String(event.reason || 'unknown')));
  addEventListener('online', () => { report.preferences.online = true; });
  addEventListener('offline', () => { report.preferences.online = false; });
  addEventListener('resize', () => { report.viewport.width = innerWidth; report.viewport.height = innerHeight; report.viewport.dpr = devicePixelRatio || 1; }, { passive: true });
  addEventListener('load', () => {
    report.page.loadMs = Math.round(performance.now());
    const timing = performance.getEntriesByType('navigation')[0];
    if (timing) report.page.domContentLoadedMs = Math.round(timing.domContentLoadedEventEnd);
  }, { once: true });
  function buildPanel() {
    if (!new URLSearchParams(location.search).has('jjhdebug') || document.getElementById('jjh-runtime-diagnostics')) return;
    const panel = document.createElement('aside');
    panel.id = 'jjh-runtime-diagnostics';
    panel.innerHTML = '<div class="jjh-diag-head"><strong>JH Travel Diagnostics</strong><button type="button" data-close aria-label="Close diagnostics">×</button></div><pre data-report></pre><div class="jjh-diag-actions"><button type="button" data-refresh>Refresh report</button><button type="button" data-download>Download report</button></div><small>Local-only diagnostics. Nothing is sent automatically.</small>';
    Object.assign(panel.style, { position:'fixed', zIndex:'2147483647', right:'10px', bottom:'10px', width:'min(360px,calc(100vw - 20px))', maxHeight:'65vh', overflow:'auto', background:'#201033', color:'#fff', border:'1px solid #20B9B0', borderRadius:'14px', padding:'12px', boxShadow:'0 12px 40px #0006', font:'12px/1.45 system-ui,sans-serif' });
    const style = document.createElement('style'); style.textContent = '#jjh-runtime-diagnostics button{background:#20B9B0;color:#102e31;border:0;border-radius:7px;padding:7px 9px;font-weight:700}#jjh-runtime-diagnostics .jjh-diag-head,#jjh-runtime-diagnostics .jjh-diag-actions{display:flex;justify-content:space-between;gap:8px;align-items:center}#jjh-runtime-diagnostics pre{white-space:pre-wrap;overflow-wrap:anywhere;max-height:34vh;overflow:auto;color:#fff}#jjh-runtime-diagnostics small{display:block;margin-top:8px;color:#ddd}';
    document.head.appendChild(style); document.body.appendChild(panel);
    const render = () => { report.runtimeMs = Math.round(performance.now() - started); panel.querySelector('[data-report]').textContent = JSON.stringify(report, null, 2); };
    panel.querySelector('[data-close]').onclick = () => panel.remove();
    panel.querySelector('[data-refresh]').onclick = render;
    panel.querySelector('[data-download]').onclick = () => { render(); const blob = new Blob([JSON.stringify(report,null,2)], {type:'application/json'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download='jjh-browser-diagnostics.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000); };
    render(); setInterval(() => { if (document.body.contains(panel)) render(); }, 3000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildPanel, { once: true }); else buildPanel();
  // Expose read-only current report for manual debugging in DevTools.
  Object.defineProperty(window, 'JJHBrowserDiagnostics', { configurable: false, get: () => JSON.parse(JSON.stringify(report)) });
})();
