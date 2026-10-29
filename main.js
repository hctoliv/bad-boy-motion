const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const brl = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const STORE = 'https://badboy.com.br/products/';
const ALL = Object.values(CATALOG).flat();
const byHandle = h => ALL.find(p => p.h === h);

/* cards de produto */
function priceHTML(p) {
  return p.c
    ? `<p class="price is-sale"><b>${brl(p.p)}</b><s>${brl(p.c)}</s></p>`
    : `<p class="price"><b>${brl(p.p)}</b></p>`;
}
function cardHTML(p) {
  const off = p.c ? Math.round((1 - p.p / p.c) * 100) : 0;
  return `<article class="card">
    <a href="${STORE + p.h}" class="card__media">
      ${off ? `<span class="card__badge">${off}% OFF</span>` : ''}
      <img src="${p.imgs[0]}" alt="${p.t}" loading="lazy">
      ${p.imgs[1] ? `<img src="${p.imgs[1]}" alt="" loading="lazy">` : ''}
    </a>
    <button class="card__quick" data-quick="${p.h}">Compra<br>rápida</button>
    <div class="card__info">
      <a href="${STORE + p.h}" class="card__title">${p.t}</a>
      ${priceHTML(p)}
      ${p.sizes.length > 1 ? `<p class="card__sizes">${p.sizes.join(' · ')}</p>` : ''}
    </div>
  </article>`;
}
function renderGrid(grid, key) {
  grid.innerHTML = CATALOG[key].map(cardHTML).join('');
  $$('.card', grid).forEach((c, i) => { c.style.transitionDelay = `${i * 80}ms`; io.observe(c); });
}

/* entrada no scroll */
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
}), { threshold: .12 });
$$('.reveal').forEach(el => io.observe(el));
$$('[data-products]').forEach(g => renderGrid(g, g.dataset.products));

/* barra de aviso girando */
(() => {
  const ps = $$('.announce__track p');
  let i = 0;
  setInterval(() => {
    const cur = ps[i];
    cur.classList.replace('is-on', 'is-out');
    setTimeout(() => cur.classList.remove('is-out'), 500);
    i = (i + 1) % ps.length;
    ps[i].classList.add('is-on');
  }, 4200);
})();

/* cabeçalho sólido depois do hero */
const header = $('#header');
const onScroll = () => header.classList.toggle('is-solid', scrollY > 60);
addEventListener('scroll', onScroll, { passive: true });
onScroll();
const mega = $('.mega');
mega.addEventListener('mouseenter', () => header.classList.add('is-mega'));
mega.addEventListener('mouseleave', () => header.classList.remove('is-mega'));

/* slideshow */
(() => {
  const root = $('.slideshow');
  const slides = $$('.slide', root);
  const dots = $$('.slideshow__dots button', root);
  const MS = 6000;
  root.style.setProperty('--slide-ms', MS + 'ms');
  let i = 0, timer, paused = false;
  const go = n => {
    slides[i].classList.remove('is-on'); dots[i].classList.remove('is-on');
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('is-on');
    void dots[i].offsetWidth;
    dots[i].classList.add('is-on');
  };
  const play = () => { clearInterval(timer); timer = setInterval(() => !paused && go(i + 1), MS); };
  dots.forEach((d, n) => d.addEventListener('click', () => { go(n); play(); }));
  $('.slideshow__pause', root).addEventListener('click', e => {
    paused = !paused;
    root.classList.toggle('is-paused', paused);
    $$('.slide img', root).forEach(img => img.style.animationPlayState = paused ? 'paused' : '');
    e.currentTarget.innerHTML = paused
      ? '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7L8 5Z"/></svg>'
      : '<svg viewBox="0 0 24 24"><path d="M9 6v12M15 6v12"/></svg>';
    e.currentTarget.setAttribute('aria-label', paused ? 'Tocar slideshow' : 'Pausar slideshow');
  });
  play();
})();

/* abas de coleção */
const TAB_CTA = {
  kimonos: ['Ver todos os kimonos', 'kimonos'],
  rash: ['Ver todas as rashguards', 'rashguard-todas'],
  sport: ['Ver camisetas sport', 'camiseta-sport'],
};
$$('.tabs button').forEach(b => b.addEventListener('click', () => {
  if (b.classList.contains('is-on')) return;
  $$('.tabs button').forEach(x => x.classList.toggle('is-on', x === b));
  const grid = $('.tab-grid');
  grid.classList.add('is-swapping');
  setTimeout(() => {
    renderGrid(grid, b.dataset.tab);
    grid.classList.remove('is-swapping');
    const [label, col] = TAB_CTA[b.dataset.tab];
    const cta = $('#tab-cta');
    cta.textContent = label;
    cta.href = 'https://badboy.com.br/collections/' + col;
  }, 300);
}));

/* parallax da faixa de imagem */
(() => {
  const sec = $('.feature-media'), bg = $('.feature-media__bg');
  const tick = () => {
    const r = sec.getBoundingClientRect();
    if (r.bottom > 0 && r.top < innerHeight) {
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      bg.style.transform = `translate3d(0, ${p * -12}%, 0)`;
    }
  };
  addEventListener('scroll', () => requestAnimationFrame(tick), { passive: true });
  tick();
})();

/* contagem Bad Friday */
(() => {
  const clock = $('.countdown__clock');
  const end = new Date(clock.dataset.deadline).getTime();
  const pad = n => String(n).padStart(2, '0');
  const tick = () => {
    let s = Math.max(0, Math.floor((end - Date.now()) / 1000));
    const d = Math.floor(s / 86400); s %= 86400;
    const h = Math.floor(s / 3600); s %= 3600;
    const m = Math.floor(s / 60); s %= 60;
    $('[data-cd=d]').textContent = pad(d);
    $('[data-cd=h]').textContent = pad(h);
    $('[data-cd=m]').textContent = pad(m);
    $('[data-cd=s]').textContent = pad(s);
  };
  tick(); setInterval(tick, 1000);
})();

/* toast */
const toast = msg => {
  const t = $('.toast');
  t.textContent = msg; t.classList.add('is-on');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('is-on'), 2400);
};
$('[data-copy]').addEventListener('click', e => {
  navigator.clipboard?.writeText(e.currentTarget.dataset.copy).catch(() => {});
  toast('Cupom ESQUENTABLACK copiado');
});

/* camadas: menu, busca, compra rápida, carrinho */
const scrim = $('.scrim');
let openLayer = null;
function open(id) {
  close();
  openLayer = $('#' + id);
  openLayer.classList.add('is-on');
  openLayer.setAttribute('aria-hidden', 'false');
  if (id !== 'search') scrim.classList.add('is-on');
  document.body.classList.add('is-locked');
  if (id === 'search') setTimeout(() => $('#search input').focus(), 300);
}
function close() {
  if (!openLayer) return;
  openLayer.classList.remove('is-on');
  openLayer.setAttribute('aria-hidden', 'true');
  scrim.classList.remove('is-on');
  document.body.classList.remove('is-locked');
  openLayer = null;
}
document.addEventListener('click', e => {
  const o = e.target.closest('[data-open]');
  if (o) { open(o.dataset.open); if (o.dataset.open === 'cart') renderCart(); return; }
  if (e.target.closest('[data-close]')) close();
  if (e.target.id === 'quick') close();
});
addEventListener('keydown', e => e.key === 'Escape' && close());

/* busca no catálogo da prévia */
$('#search input').addEventListener('input', e => {
  const q = e.target.value.trim().toLowerCase();
  const hits = q.length < 2 ? [] : ALL.filter((p, i, a) => a.findIndex(x => x.h === p.h) === i && p.t.toLowerCase().includes(q)).slice(0, 6);
  $('.search__results').innerHTML = hits.map(p =>
    `<a href="${STORE + p.h}"><img src="${p.imgs[0]}" alt="">${p.t}<b>${brl(p.p)}</b></a>`).join('');
});

/* compra rápida */
document.addEventListener('click', e => {
  const q = e.target.closest('[data-quick]');
  if (!q) return;
  const p = byHandle(q.dataset.quick);
  $('#quick .modal__media').innerHTML = p.imgs.map(s => `<img src="${s}" alt="${p.t}">`).join('');
  const hasSizes = p.sizes.length > 0;
  $('#quick .modal__info').innerHTML = `
    <p class="eyebrow">Bad Boy</p>
    <h3>${p.t}</h3>
    ${priceHTML(p)}
    ${hasSizes ? `<p class="eyebrow">Tamanho</p><div class="sizes">${p.sizes.map(s => `<button>${s}</button>`).join('')}</div>` : ''}
    <p class="modal__hint"></p>
    <button class="btn btn--block" data-add="${p.h}">Adicionar ao carrinho</button>
    <a class="link" href="${STORE + p.h}">Ver detalhes do produto</a>`;
  if (p.sizes.length === 1) $('#quick .sizes button').classList.add('is-on');
  open('quick');
});
$('#quick').addEventListener('click', e => {
  const s = e.target.closest('.sizes button');
  if (s) {
    $$('#quick .sizes button').forEach(b => b.classList.toggle('is-on', b === s));
    $('#quick .modal__hint').textContent = '';
  }
  const add = e.target.closest('[data-add]');
  if (add) {
    const p = byHandle(add.dataset.add);
    const size = $('#quick .sizes button.is-on')?.textContent || '';
    if (p.sizes.length && !size) { $('#quick .modal__hint').textContent = 'Escolhe o tamanho primeiro'; return; }
    addToCart(p, size);
    open('cart'); renderCart();
  }
});

/* carrinho (só na prévia, sem checkout real) */
const cart = [];
function addToCart(p, size) {
  const line = cart.find(l => l.h === p.h && l.size === size);
  line ? line.qty++ : cart.push({ h: p.h, size, qty: 1 });
  const badge = $('.cart-count');
  badge.hidden = false;
  badge.textContent = cart.reduce((n, l) => n + l.qty, 0);
  badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump');
}
function renderCart() {
  const box = $('.cart__items');
  if (!cart.length) {
    box.innerHTML = '<p class="cart__empty">Seu carrinho tá vazio.</p>';
  } else {
    box.innerHTML = cart.map((l, i) => {
      const p = byHandle(l.h);
      return `<div class="cart-line">
        <img src="${p.imgs[0]}" alt="">
        <div><h4>${p.t}</h4>${l.size ? `<p>Tamanho ${l.size}</p>` : ''}
          <div class="qty"><button data-q="${i}" data-d="-1" aria-label="Menos">−</button><span>${l.qty}</span><button data-q="${i}" data-d="1" aria-label="Mais">+</button></div>
        </div>
        <p class="price"><b>${brl(p.p * l.qty)}</b></p>
      </div>`;
    }).join('');
  }
  $('[data-subtotal]').textContent = brl(cart.reduce((s, l) => s + byHandle(l.h).p * l.qty, 0));
  const n = cart.reduce((s, l) => s + l.qty, 0);
  $('.cart-count').textContent = n;
  $('.cart-count').hidden = !n;
}
$('.cart__items').addEventListener('click', e => {
  const b = e.target.closest('[data-q]');
  if (!b) return;
  const l = cart[b.dataset.q];
  l.qty += +b.dataset.d;
  if (l.qty < 1) cart.splice(b.dataset.q, 1);
  renderCart();
});
