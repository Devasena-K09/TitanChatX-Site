/* ============ INSTALL LINKS: edit these two lines ============
   play: your Google Play link, e.g. 'https://play.google.com/store/apps/details?id=com.titanchatx.app'
   apk : a direct link to the signed APK, e.g. a GitHub Releases link or 'downloads/TitanChatX.apk'
   If both are empty, the button stays "Ask for early access". If both are set, Play wins. */
const INSTALL = { play: '', apk: 'https://github.com/Devasena-K09/TitanChatX-Releases/releases/latest/download/TitanChatX.apk', version: '3.22.0' };

(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ---------- install buttons (nav, hero and final section all use the same link) ---------- */
  (() => {
    const btns = Array.from(document.querySelectorAll('[data-install]')); if (!btns.length) return;
    const main = document.getElementById('installBtn');
    const text = document.getElementById('installText'), meta = document.getElementById('installMeta'), help = document.getElementById('installHelp');
    const android = /Android/i.test(navigator.userAgent);
    const url = INSTALL.play || INSTALL.apk;
    if (!url) return; // nothing configured: buttons keep their early-access behaviour
    btns.forEach((b) => {
      b.href = url;
      if (INSTALL.play) { b.target = '_blank'; b.rel = 'noopener'; } else b.setAttribute('download', 'TitanChatX.apk');
    });
    if (INSTALL.play) {
      main.textContent = 'Get it on Google Play';
      text.textContent = 'TitanChatX is available on Google Play for Android.';
    } else {
      main.textContent = 'Download for Android (APK)';
      text.textContent = 'Download the Android app and install it in a minute.';
      meta.hidden = false; help.hidden = false;
      meta.textContent = 'Version ' + INSTALL.version + (android ? '' : '. Open this page on your Android phone to install.');
    }
  })();

  /* ---------- nav ---------- */
  const top = $('#top');
  const onScroll = () => top.classList.toggle('scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  const menu = $('#menu'), links = $('#links');
  menu.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', (e) => {
    if (e.target.closest('a')) { links.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
  });

  /* ---------- reveal on scroll ---------- */
  const rv = $$('.rv');
  if (reduce || !('IntersectionObserver' in window)) {
    rv.forEach((n) => n.classList.add('in'));
  } else {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    rv.forEach((n) => io.observe(n));
  }

  /* generic "is visible" helper */
  const visible = new WeakMap();
  const vio = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => visible.set(e.target, e.isIntersecting)), { threshold: 0.2 }) : null;
  const watch = (el) => { if (vio) vio.observe(el); else visible.set(el, true); };
  const isVis = (el) => visible.get(el) !== false;

  /* ---------- typed headline (the sizer in the HTML reserves the space, so nothing shifts) ---------- */
  const typed = $('#typed'), caret = $('#caret');
  const phrases = ['Chat Without Limits.', 'Think Beyond Messages.', 'Your Conversations. Reimagined.'];
  if (!reduce) {
    (async () => {
      let i = 0;
      typed.textContent = '';
      await sleep(700);
      for (;;) {
        const p = phrases[i % phrases.length];
        caret.classList.add('solid');
        for (let c = 1; c <= p.length; c++) {
          typed.textContent = p.slice(0, c);
          const ch = p[c - 1];
          await sleep(ch === ' ' ? 90 : ch === '.' ? 160 : 48 + Math.random() * 42);
        }
        caret.classList.remove('solid');
        await sleep(2300);
        caret.classList.add('solid');
        for (let c = p.length; c >= 0; c--) { typed.textContent = p.slice(0, c); await sleep(20); }
        caret.classList.remove('solid');
        await sleep(450);
        i++;
      }
    })();
  }

  /* ---------- waveforms: generated bars, with a play-head ---------- */
  const waves = $$('.wave[data-wave]');
  const heightsFor = (n, seed) => Array.from({ length: n }, (_, k) => {
    const v = Math.abs(Math.sin((k + 1) * 12.9898 + seed * 78.233) * 43758.5453) % 1;
    const env = 0.45 + 0.55 * Math.sin((k / (n - 1)) * Math.PI);
    return Math.round(18 + 78 * v * env);
  });
  waves.forEach((w, wi) => {
    const n = parseInt(w.dataset.wave, 10);
    heightsFor(n, wi + 1).forEach((h) => { const i = document.createElement('i'); i.style.setProperty('--h', h + '%'); w.appendChild(i); });
    watch(w);
    const bars = $$('i', w);
    const upto = w.hasAttribute('data-static') ? 0.45 : 0;
    bars.forEach((b, k) => b.classList.toggle('p', k < bars.length * upto));
  });
  const fmt = (t) => Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0');
  const playState = new Map();
  const active = (w) => {
    const slide = w.closest('.slide'); if (slide && !slide.classList.contains('on')) return false;
    const dyn = w.closest('.dyn'); if (dyn && !dyn.classList.contains('in')) return false;
    return isVis(w);
  };
  if (!reduce) {
    setInterval(() => {
      if (document.hidden) return;
      waves.forEach((w) => {
        if (w.hasAttribute('data-static')) return;
        const vt = w.parentElement.querySelector('.vt'); if (!vt) return;
        const dur = parseFloat(vt.dataset.dur) || 10;
        if (!active(w)) { playState.set(w, 0); return; }
        let t = (playState.get(w) || 0) + 0.1;
        if (t > dur + 1.6) t = 0;
        playState.set(w, t);
        const p = Math.min(1, t / dur);
        const bars = w.children;
        for (let k = 0; k < bars.length; k++) bars[k].classList.toggle('p', k < bars.length * p);
        vt.textContent = fmt(Math.min(t, dur));
      });
    }, 100);
  }

  /* ---------- hero chat: realistic conversation that keeps arriving ---------- */
  const chat = $('#heroChat');
  const typingEl = $('#typing'), hStatus = $('#hStatus'), comp = $('#comp'), sendBtn = $('#sendBtn');
  const dyn = $$('.dyn', chat);
  const [inviteB, sentB, voiceB] = dyn;
  const tick = $('#tick');
  const setTyping = (on) => { typingEl.classList.toggle('on', on); hStatus.textContent = on ? 'typing\u2026' : 'online'; hStatus.classList.toggle('typ', on); };
  if (reduce) {
    dyn.forEach((b) => b.classList.add('in'));
    tick.innerHTML = '&#10003;&#10003;'; tick.classList.add('read');
  } else {
    (async () => {
      await sleep(1500);
      for (;;) {
        dyn.forEach((b) => b.classList.remove('in'));
        tick.innerHTML = '&#10003;'; tick.classList.remove('read');
        comp.textContent = 'Message'; comp.classList.remove('typing-now');
        await sleep(900);
        // 1) friend sends a duel invite
        setTyping(true); await sleep(1300); setTyping(false);
        inviteB.classList.add('in'); await sleep(1500);
        // 2) you type your reply in the composer, then send it
        const msg = 'Send it. I am taking you down.';
        comp.classList.add('typing-now'); comp.textContent = '';
        for (let c = 1; c <= msg.length; c++) { comp.textContent = msg.slice(0, c); await sleep(38 + Math.random() * 30); }
        await sleep(350);
        sendBtn.classList.add('pop'); await sleep(160); sendBtn.classList.remove('pop');
        comp.textContent = 'Message'; comp.classList.remove('typing-now');
        sentB.classList.add('in');
        await sleep(800); tick.innerHTML = '&#10003;&#10003;';
        await sleep(1100); tick.classList.add('read');
        // 3) friend replies with a voice note
        await sleep(600); setTyping(true); hStatus.textContent = 'recording\u2026'; await sleep(1700); setTyping(false);
        voiceB.classList.add('in');
        await sleep(14000);
      }
    })();
  }

  /* ---------- typing helper with cancel ---------- */
  const typers = new WeakMap();
  async function typeInto(el, text, speed = 22) {
    const token = {}; typers.set(el, token);
    if (reduce) { el.textContent = text; return; }
    el.textContent = '';
    for (let i = 1; i <= text.length; i++) {
      if (typers.get(el) !== token) return;
      el.textContent = text.slice(0, i);
      await sleep(speed);
    }
  }
  const cancelType = (el) => typers.set(el, {});

  /* ---------- showcase tabs ---------- */
  const tabs = $$('#tabs .tab');
  const slides = $$('#slides .slide');
  const showSec = $('#showcase');
  watch(showSec);
  let cur = 0, auto = !reduce, timer = null;

  function enter(i) {
    if (i === 1) typeInto($('#aiType'), $('#aiType').dataset.text, 20);
    if (i === 3) typeInto($('#trType'), $('#trType').dataset.text, 22);
  }
  function go(i, fromUser) {
    cur = (i + tabs.length) % tabs.length;
    if (fromUser) auto = false;
    tabs.forEach((t, k) => {
      const on = k === cur;
      t.setAttribute('aria-selected', String(on));
      t.classList.remove('auto');
      if (on) { void t.offsetWidth; if (auto) t.classList.add('auto'); }
    });
    slides.forEach((s, k) => s.classList.toggle('on', k === cur));
    enter(cur);
    schedule();
  }
  function schedule() {
    clearTimeout(timer);
    if (!auto) return;
    timer = setTimeout(() => {
      if (!isVis(showSec) || document.hidden || hovering) { schedule(); return; }
      go(cur + 1, false);
    }, 7000);
  }
  let hovering = false;
  [$('#tabs'), $('.phone-wrap')].forEach((el) => {
    el.addEventListener('pointerenter', () => { hovering = true; });
    el.addEventListener('pointerleave', () => { hovering = false; });
  });
  tabs.forEach((t, k) => t.addEventListener('click', () => go(k, true)));
  $('#tabs').addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1, true); tabs[cur].focus(); }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1, true); tabs[cur].focus(); }
  });
  go(0, false);

  /* ---------- memory game ---------- */
  const mem = $('#mem');
  const symbols = ['◆', '▲', '●', '■', '✦', '☾'];
  let first = null, lock = false, moves = 0, matched = 0;
  function buildMem() {
    mem.innerHTML = ''; first = null; lock = false; moves = 0; matched = 0;
    $('#mMoves').textContent = 'Moves: 0';
    $('#mMsg').textContent = 'Tap a card';
    const deck = symbols.concat(symbols).map((s, i) => ({ s, r: Math.random() + i * 0 })).sort((a, b) => a.r - b.r);
    deck.forEach((d) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'mc'; b.dataset.s = d.s; b.setAttribute('aria-label', 'Card');
      b.innerHTML = '<span class="in"><span class="k"></span><span class="f">' + d.s + '</span></span>';
      b.addEventListener('click', () => flip(b));
      mem.appendChild(b);
    });
  }
  function flip(b) {
    if (lock || b.classList.contains('flip') || b.classList.contains('ok')) return;
    b.classList.add('flip');
    if (!first) { first = b; return; }
    moves++; $('#mMoves').textContent = 'Moves: ' + moves;
    if (first.dataset.s === b.dataset.s) {
      first.classList.replace('flip', 'ok'); b.classList.replace('flip', 'ok');
      matched++; first = null;
      $('#mMsg').textContent = matched === symbols.length ? 'Done in ' + moves + ' moves!' : 'Match!';
    } else {
      lock = true; const a = first; first = null;
      $('#mMsg').textContent = 'Not a pair';
      setTimeout(() => { a.classList.remove('flip'); b.classList.remove('flip'); lock = false; }, 800);
    }
  }
  $('#mReset').addEventListener('click', buildMem);
  buildMem();

  /* ---------- checklists ---------- */
  document.addEventListener('click', (e) => {
    const cb = e.target.closest('.cb');
    if (!cb) return;
    cb.classList.toggle('done');
    const row = cb.closest('.task');
    if (row) row.classList.toggle('done', cb.classList.contains('done'));
  });
  $$('.task').forEach((t) => { if ($('.cb.done', t)) t.classList.add('done'); });

  /* ---------- bento demos ---------- */
  // safety number
  const safety = $('#safetyLive');
  if (safety) {
    watch(safety);
    const rnd = () => String(Math.floor(Math.random() * 100000)).padStart(5, '0');
    if (!reduce) setInterval(() => { if (isVis(safety) && !document.hidden) safety.textContent = rnd() + ' ' + rnd() + ' ' + rnd(); }, 2200);
  }
  // recall
  const del = $('#del'), delTxt = $('#delTxt'), delBtn = $('#delBtn');
  delBtn.addEventListener('click', () => {
    const back = del.classList.toggle('back');
    delTxt.textContent = back ? 'Dinner at 8, bring the tickets' : 'This message was deleted';
    delBtn.textContent = back ? 'Delete again' : 'Restore';
  });
  // search typing loop
  const sr = $('#srchType');
  if (sr) {
    watch(sr);
    if (reduce) sr.textContent = sr.dataset.text;
    else (async () => { for (;;) { if (isVis(sr) && !document.hidden) { await typeInto(sr, sr.dataset.text, 90); await sleep(2600); sr.textContent = ' '; } await sleep(900); } })();
  }
  // stories
  $$('#stories .sring').forEach((r) => r.addEventListener('click', () => r.classList.toggle('seen')));
  // swatches
  const prev = $('#prev');
  $$('#sw button').forEach((b) => b.addEventListener('click', () => {
    $$('#sw button').forEach((x) => x.setAttribute('aria-pressed', 'false'));
    b.setAttribute('aria-pressed', 'true');
    prev.style.setProperty('--bub', b.style.getPropertyValue('--c'));
  }));

  /* ---------- heading word reveal ---------- */
  if (!reduce) {
    $$('h2.sec').forEach((h) => {
      const words = h.textContent.trim().split(/\s+/);
      h.setAttribute('aria-label', h.textContent.trim());
      h.innerHTML = words.map((w, k) => '<span class="w" aria-hidden="true" style="--wi:' + k + '"><span>' + w + '</span></span>').join(' ');
    });
  }

  /* ---------- section rule lines ---------- */
  if ('IntersectionObserver' in window) {
    const sio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('seen'); sio.unobserve(e.target); } }), { threshold: 0.05 });
    $$('section').forEach((x) => sio.observe(x));
  } else $$('section').forEach((x) => x.classList.add('seen'));

  /* ---------- scroll-linked: progress bar, ambient drift, showcase fan-in ---------- */
  const bar = $('#bar'), trio = $('#trio'), amb = $('.ambient');
  let sTick = false;
  const clamp = (v) => Math.max(0, Math.min(1, v));
  const onScrollFx = () => {
    sTick = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? clamp(window.scrollY / max) : 0).toFixed(4) + ')';
    amb.style.setProperty('--sy', (window.scrollY * 0.06).toFixed(1));
    amb.style.setProperty('--sx', Math.sin(window.scrollY / 900).toFixed(3));
    if (trio && !reduce) {
      const r = trio.getBoundingClientRect(), vh = window.innerHeight;
      trio.style.setProperty('--p', clamp((vh * 0.92 - r.top) / (vh * 0.62)).toFixed(3));
    }
  };
  if (!reduce) {
    window.addEventListener('scroll', () => { if (!sTick) { sTick = true; requestAnimationFrame(onScrollFx); } }, { passive: true });
    window.addEventListener('resize', onScrollFx);
    onScrollFx();
  }

  /* ---------- parallax (uses the independent "translate" property) ---------- */
  if (!reduce) {
    const ps = $$('[data-parallax]');
    const stage = $('#stage');
    let px = 0, py = 0, sy = window.scrollY, ticking = false;
    const apply = () => {
      ticking = false;
      ps.forEach((el) => {
        const f = parseFloat(el.dataset.parallax);
        el.style.translate = (px * f * 100).toFixed(1) + 'px ' + ((py * f * 100) + sy * f * -0.35).toFixed(1) + 'px';
      });
    };
    const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(apply); } };
    stage.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width - 0.5; py = (e.clientY - r.top) / r.height - 0.5; req();
    });
    stage.addEventListener('pointerleave', () => { px = 0; py = 0; req(); });
    window.addEventListener('scroll', () => { sy = window.scrollY; if (sy < 1400) req(); }, { passive: true });
  }

  /* ---------- tile spotlight ---------- */
  $$('.tile').forEach((t) => t.addEventListener('pointermove', (e) => {
    const r = t.getBoundingClientRect();
    t.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    t.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }));

  /* ---------- particles ---------- */
  const cv = $('#fx');
  if (cv && !reduce) {
    const ctx = cv.getContext('2d');
    let w, h, dpr, pts = [], run = true;
    const make = () => {
      const n = Math.min(46, Math.floor((w * h) / 30000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.12, vy: -Math.random() * 0.18 - 0.03,
        c: Math.random() < 0.65 ? '137,87,255' : '198,200,210', a: Math.random() * 0.5 + 0.2
      }));
    };
    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      make();
    };
    const draw = () => {
      if (run) {
        ctx.clearRect(0, 0, w, h);
        for (const p of pts) {
          p.x += p.vx; p.y += p.vy;
          if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
          if (p.x < -4) p.x = w + 4; if (p.x > w + 4) p.x = -4;
          ctx.beginPath(); ctx.fillStyle = 'rgba(' + p.c + ',' + p.a + ')';
          ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
        }
      }
      requestAnimationFrame(draw);
    };
    size(); draw();
    let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(size, 150); });
    document.addEventListener('visibilitychange', () => { run = !document.hidden; });
  }
})();
