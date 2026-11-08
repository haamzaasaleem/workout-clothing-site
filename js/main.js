(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const money = (n) => `$${n.toFixed(2)}`;
  const FREE_SHIP = 100;

  /* ---------- Product card ---------- */
  const card = (p) => `
    <article class="card" data-id="${p.id}">
      <div class="card__media">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
        <img src="${p.img}" alt="${p.name} in ${p.color}" loading="lazy" />
        <img class="card__alt" src="${p.img2}" alt="" loading="lazy" />
        <div class="card__quick">
          <div class="sizes">${["XS", "S", "M", "L", "XL"].map((s) => `<button data-size="${s}">${s}</button>`).join("")}</div>
        </div>
      </div>
      <div class="card__info">
        <h3>${p.name}</h3>
        <p class="card__color">${p.color}</p>
        <p class="card__price">${money(p.price)}</p>
      </div>
    </article>`;

  const render = (el, list) => { if (el) el.innerHTML = list.map(card).join(""); };
  const byTag = (t) => PRODUCTS.filter((p) => p.tags.includes(t));

  render($("#bestTrack"), byTag("best").filter((p) => p.cat === "men"));
  render($("#ironGrid"), byTag("iron").slice(0, 4));
  render($("#dropGrid"), byTag("drop"));
  render($("#setsGrid"), byTag("sets"));
  render($("#newGrid"), byTag("new").slice(0, 4));

  /* ---------- Tabs ---------- */
  $$("[data-tabs]").forEach((group) => {
    group.addEventListener("click", (e) => {
      const btn = e.target.closest(".tab");
      if (!btn) return;
      $$(".tab", group).forEach((t) => t.classList.toggle("is-active", t === btn));
      const f = btn.dataset.filter;
      if (group.dataset.tabs === "best") {
        const track = $("#bestTrack");
        render(track, byTag("best").filter((p) => p.cat === f));
        track.scrollLeft = 0;
      } else {
        render($("#setsGrid"), f === "all" ? byTag("sets") : byTag("sets").filter((p) => p.tags.includes(f)));
      }
    });
  });

  /* ---------- Carousel arrows ---------- */
  $$(".arrow").forEach((a) =>
    a.addEventListener("click", () => {
      const t = document.getElementById(a.dataset.target);
      t.scrollBy({ left: t.clientWidth * 0.8 * Number(a.dataset.dir), behavior: "smooth" });
    })
  );

  /* ---------- Cart ---------- */
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem("forgd-cart")) || []; } catch { cart = []; }
  const save = () => { try { localStorage.setItem("forgd-cart", JSON.stringify(cart)); } catch {} };

  const renderCart = () => {
    const count = cart.reduce((n, i) => n + i.qty, 0);
    const subtotal = cart.reduce((n, i) => n + i.qty * PRODUCTS.find((p) => p.id === i.id).price, 0);
    $("#cartCount").textContent = count;
    $("#cartCount").classList.toggle("show", count > 0);
    $("#cartSubtotal").textContent = money(subtotal);
    const left = FREE_SHIP - subtotal;
    $("#shipText").textContent = left > 0 ? `You're ${money(left)} away from free shipping` : "You've unlocked free shipping!";
    $("#shipBar").style.width = `${Math.min(100, (subtotal / FREE_SHIP) * 100)}%`;
    $("#cartItems").innerHTML = cart.length
      ? cart.map((i, idx) => {
          const p = PRODUCTS.find((x) => x.id === i.id);
          return `<div class="cart-item">
            <img src="${p.img.replace("w=800", "w=200")}" alt="" />
            <div>
              <h4>${p.name}</h4>
              <p>${p.color} / ${i.size}</p>
              <div class="qty">
                <button data-qty="-1" data-idx="${idx}" aria-label="Decrease">&minus;</button>
                <span>${i.qty}</span>
                <button data-qty="1" data-idx="${idx}" aria-label="Increase">+</button>
              </div>
            </div>
            <div class="cart-item__right">
              <strong>${money(p.price * i.qty)}</strong>
              <button class="remove" data-remove="${idx}">Remove</button>
            </div>
          </div>`;
        }).join("")
      : `<div class="cart-empty"><p>Your cart is empty.</p><a href="#shop" class="btn btn--dark" data-close>Start Shopping</a></div>`;
  };

  const addToCart = (id, size) => {
    const found = cart.find((i) => i.id === id && i.size === size);
    found ? found.qty++ : cart.push({ id, size, qty: 1 });
    save(); renderCart();
    const p = PRODUCTS.find((x) => x.id === id);
    toast(`Added ${p.name} (${size}) to cart`);
    open($("#cartDrawer"));
  };

  document.addEventListener("click", (e) => {
    const size = e.target.closest("[data-size]");
    if (size) { addToCart(Number(size.closest(".card").dataset.id), size.dataset.size); return; }
    const q = e.target.closest("[data-qty]");
    if (q) {
      const item = cart[q.dataset.idx];
      item.qty += Number(q.dataset.qty);
      if (item.qty < 1) cart.splice(q.dataset.idx, 1);
      save(); renderCart(); return;
    }
    const r = e.target.closest("[data-remove]");
    if (r) { cart.splice(r.dataset.remove, 1); save(); renderCart(); }
  });

  /* ---------- Drawers ---------- */
  const overlay = $("#overlay");
  function open(d) {
    $$(".drawer.is-open").forEach((x) => x !== d && x.classList.remove("is-open"));
    d.classList.add("is-open"); d.setAttribute("aria-hidden", "false");
    overlay.classList.add("is-open"); document.body.classList.add("lock");
  }
  function closeAll() {
    $$(".drawer").forEach((d) => { d.classList.remove("is-open"); d.setAttribute("aria-hidden", "true"); });
    overlay.classList.remove("is-open"); document.body.classList.remove("lock");
    closeSearch();
  }
  $("#cartBtn").addEventListener("click", () => open($("#cartDrawer")));
  $("#burger").addEventListener("click", () => open($("#mobileMenu")));
  overlay.addEventListener("click", closeAll);
  document.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeAll(); });
  $$("#mobileMenu a").forEach((a) => a.addEventListener("click", closeAll));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });

  /* ---------- Search ---------- */
  const search = $("#search");
  function closeSearch() { search.classList.remove("is-open"); search.setAttribute("aria-hidden", "true"); }
  $("#searchBtn").addEventListener("click", () => {
    search.classList.add("is-open"); search.setAttribute("aria-hidden", "false");
    overlay.classList.add("is-open");
    setTimeout(() => $("#searchInput").focus(), 50);
  });
  $("#searchClose").addEventListener("click", closeAll);
  $("#searchInput").addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    const res = q ? PRODUCTS.filter((p) => `${p.name} ${p.color}`.toLowerCase().includes(q)) : [];
    $("#searchResults").innerHTML = q
      ? res.length ? `<div class="grid-4">${res.slice(0, 8).map(card).join("")}</div>` : `<p class="sub">No results for "${e.target.value.replace(/</g, "&lt;")}"</p>`
      : "";
  });

  /* ---------- Reviews slider ---------- */
  const stars = "&#9733;&#9733;&#9733;&#9733;&#9733;";
  const rt = $("#reviewsTrack");
  rt.innerHTML = REVIEWS.map((r) => `
    <figure class="review">
      <div class="stars">${stars}</div>
      <h4>"${r.title}"</h4>
      <blockquote>${r.text}</blockquote>
      <figcaption><strong>${r.name}</strong> &mdash; Verified Buyer<br /><span>${r.product}</span></figcaption>
    </figure>`).join("");
  const dots = $("#reviewDots");
  dots.innerHTML = REVIEWS.map((_, i) => `<button aria-label="Review ${i + 1}" data-i="${i}"></button>`).join("");
  const goReview = (i) => {
    const el = rt.children[i];
    rt.scrollTo({ left: el.offsetLeft - rt.offsetLeft, behavior: "smooth" });
  };
  dots.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) goReview(+b.dataset.i); });
  rt.addEventListener("scroll", () => {
    const w = rt.children[0].offsetWidth;
    const i = Math.round(rt.scrollLeft / w);
    $$("button", dots).forEach((b, j) => b.classList.toggle("is-active", j === i));
  }, { passive: true });
  dots.children[0].classList.add("is-active");

  /* ---------- Announcement rotator ---------- */
  const ann = $$("#announceTrack p");
  let ai = 0;
  setInterval(() => { ann[ai].classList.remove("is-active"); ai = (ai + 1) % ann.length; ann[ai].classList.add("is-active"); }, 4000);

  /* ---------- Sticky header shadow ---------- */
  const header = $("#header");
  addEventListener("scroll", () => header.classList.toggle("is-scrolled", scrollY > 10), { passive: true });

  /* ---------- Newsletter ---------- */
  $("#newsForm").addEventListener("submit", (e) => {
    e.preventDefault();
    $("#newsMsg").textContent = "You're in! Check your inbox for 10% off.";
    e.target.reset();
  });

  /* ---------- Toast ---------- */
  let tt;
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(tt); tt = setTimeout(() => t.classList.remove("show"), 2200);
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((ents) => ents.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  $$(".section, .split, .banner, .statement, .perks").forEach((el) => { el.classList.add("reveal"); io.observe(el); });

  $("#year").textContent = new Date().getFullYear();
  renderCart();
})();
