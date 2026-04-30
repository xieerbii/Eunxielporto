/* ═══════════════════════════════════════════════
   EUNXIEL — Luxury Cupcakes | script.js
   ═══════════════════════════════════════════════
   TABLE OF CONTENTS
   1.  Product Data
   2.  Cart State
   3.  Utility: Format Price
   4.  Render Products (dynamic DOM)
   5.  Cart: Add Item
   6.  Cart: Remove Item
   7.  Cart: Update Badge & Totals
   8.  Cart: Render Items List
   9.  Cart: Toggle Drawer Open/Close
   10. Testimonial Slider
   11. Navbar Scroll Behaviour
   12. Scroll Reveal (IntersectionObserver)
   13. Loading Screen Dismiss
   14. Init (run on DOMContentLoaded)
═══════════════════════════════════════════════ */


/* ─────────────────────────────────────────────
   1. PRODUCT DATA
   Each product: id, name, desc, price (IDR), image
───────────────────────────────────────────── */
const products = [
  {
    id: 1,
    name: "Golden Velvet Supreme",
    desc: "Belgian white chocolate, 24k gold leaf, Madagascar vanilla cream",
    price: 250000,
    image: "images/cupcake1.jpeg"
  },
  {
    id: 2,
    name: "Sakura Blossom Dream",
    desc: "Rose petal mousse, lychee jelly, cherry blossom glaze",
    price: 78000,
    image: "images/cupcake2.jpeg"
  },
  {
    id: 3,
    name: "Noir Dark Truffle",
    desc: "70% Valrhona cacao, salted caramel core, cocoa velvet finish",
    price: 82000,
    image: "images/cupcake3.jpeg"
  },
  {
    id: 4,
    name: "Ruby Strawberry Royale",
    desc: "Fresh Malang strawberries, champagne cream, ruby glaze",
    price: 75000,
    image: "images/cupcake4.jpeg"
  },
  {
    id: 5,
    name: "Earl Grey Prestige",
    desc: "Bergamot infused cream, honey lavender frosting, silver dust",
    price: 79000,
    image: "images/cupcake5.jpeg"
  },
  {
    id: 6,
    name: "Strawberry Emerald",
    desc: "Iranian pistachio paste, rose water buttercream, edible emerald",
    price: 83000,
    image: "images/cupcake6.jpeg"
  },
  {
    id: 7,
    name: "Crème Brûlée Royale",
    desc: "Tahitian vanilla custard, torched caramel dome, gold flake",
    price: 88000,
    image: "images/cupcake7.jpeg"
  },
  {
    id: 8,
    name: "Birthday Bliss Mille Crêpes",
    desc: "Fluffy layers, celebratory sprinkles, and mini macarons",
    price: 200000,
    image: "images/cupcake8.jpeg"
  },
  {
    id: 9,
    name: "Caramel Fleur de Sel",
    desc: "Brittany salted caramel, fleur de sel, toffee crisp crown",
    price: 80000,
    image: "images/cupcake9.jpeg"
  }
];


/* ─────────────────────────────────────────────
   2. CART STATE
───────────────────────────────────────────── */
let cart = [];            // Array of { ...product, qty }
let currentSlide = 0;     // Active testimonial index


/* ─────────────────────────────────────────────
   3. UTILITY: FORMAT PRICE
   Returns "Rp 85.000" style string (Indonesian locale)
───────────────────────────────────────────── */
function formatPrice(amount) {
  return "Rp " + amount.toLocaleString("id-ID");
}


/* ─────────────────────────────────────────────
   4. RENDER PRODUCTS
   Dynamically builds product card HTML and injects
   into #productGrid. Also registers each card with
   the scroll-reveal IntersectionObserver.
───────────────────────────────────────────── */
function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  products.forEach((product, index) => {
    // Stagger delay per column position (0, 1, or 2)
    const delay = (index % 3) * 0.1;

    const card = document.createElement("div");
    card.className = "product-card reveal";
    card.style.transitionDelay = delay + "s";

    card.innerHTML = `
      <div class="product-image-wrap">
        <div class="product-img-canvas">
          <img
            src="${product.image}"
            alt="${product.name}"
            style="width:100%;height:100%;object-fit:cover;display:block;"
          >
        </div>
        <div class="product-overlay"></div>
      </div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-desc">${product.desc}</div>
        <div class="product-footer">
          <div class="product-price">${formatPrice(product.price)}</div>
          <button
            class="add-btn"
            id="btn-${product.id}"
            onclick="addToCart(${product.id})"
          >Add to Cart</button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}


/* ─────────────────────────────────────────────
   5. CART: ADD ITEM
   Adds a product to cart (or increments qty).
   Briefly changes button text to "Added ✓", then
   restores it after 1.5s.
───────────────────────────────────────────── */
function addToCart(id) {
  const product  = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  // Button feedback
  const btn = document.getElementById("btn-" + id);
  if (btn) {
    btn.textContent = "Added ✓";
    btn.classList.add("added");
    setTimeout(() => {
      btn.textContent = "Add to Cart";
      btn.classList.remove("added");
    }, 1500);
  }

  updateCart();
}


/* ─────────────────────────────────────────────
   6. CART: REMOVE ITEM
   Removes a product entirely from the cart array.
───────────────────────────────────────────── */
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
  renderCart();
}


/* ─────────────────────────────────────────────
   7. CART: UPDATE BADGE & TOTALS
   Recalculates total count and shows/hides the
   nav badge indicator.
───────────────────────────────────────────── */
function updateCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  const badge = document.getElementById("cartBadge");
  badge.textContent = count;
  badge.classList.toggle("show", count > 0);

  renderCart();
}


/* ─────────────────────────────────────────────
   8. CART: RENDER ITEMS LIST
   Rebuilds the cart drawer item list and total.
───────────────────────────────────────────── */
function renderCart() {
  const container = document.getElementById("cartItems");
  const emptyMsg  = document.getElementById("cartEmpty");
  const footer    = document.getElementById("cartFooter");

  if (cart.length === 0) {
    emptyMsg.style.display = "block";
    footer.style.display   = "none";
    container.innerHTML    = "";
    container.appendChild(emptyMsg);
    return;
  }

  emptyMsg.style.display = "none";
  footer.style.display   = "block";
  container.innerHTML    = "";

  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div class="cart-item-emoji">
        <img
          src="${item.image}"
          alt="${item.name}"
          style="width:100%;height:100%;object-fit:cover;border-radius:4px;"
        >
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">
          ${formatPrice(item.price)} × ${item.qty}
        </div>
      </div>
      <button
        class="cart-item-remove"
        onclick="removeFromCart(${item.id})"
      >✕</button>
    `;
    container.appendChild(row);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  document.getElementById("cartTotal").textContent = formatPrice(total);
}


/* ─────────────────────────────────────────────
   9. CART: TOGGLE DRAWER
   Opens/closes the side cart drawer and overlay.
   Locks body scroll when open.
───────────────────────────────────────────── */
function toggleCart() {
  const overlay = document.getElementById("cartOverlay");
  const drawer  = document.getElementById("cartDrawer");
  const isOpen  = drawer.classList.contains("open");

  overlay.classList.toggle("open", !isOpen);
  drawer.classList.toggle("open", !isOpen);
  document.body.style.overflow = isOpen ? "" : "hidden";
}


/* ─────────────────────────────────────────────
   10. TESTIMONIAL SLIDER
   Auto-advances every 5 seconds.
   Dot buttons are generated programmatically.
───────────────────────────────────────────── */
function initTestimonials() {
  const slides = document.querySelectorAll(".testimonial-slide");
  const navEl  = document.getElementById("tNav");

  // Build dot buttons
  slides.forEach((_, i) => {
    const dot    = document.createElement("button");
    dot.className = "t-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    dot.onclick  = () => goToSlide(i);
    navEl.appendChild(dot);
  });

  // Auto-advance
  setInterval(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, 5000);
}

function goToSlide(n) {
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots   = document.querySelectorAll(".t-dot");

  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");

  currentSlide = n;

  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}


/* ─────────────────────────────────────────────
   11. NAVBAR SCROLL BEHAVIOUR
   Adds `.scrolled` class when page scrolled > 60px,
   which transitions the navbar from transparent → cream.
───────────────────────────────────────────── */
function initNavbar() {
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 60);
  });
}


/* ─────────────────────────────────────────────
   12. SCROLL REVEAL (IntersectionObserver)
   Observes all `.reveal` elements and adds `.visible`
   when they enter the viewport (threshold 10%).
───────────────────────────────────────────── */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}


/* ─────────────────────────────────────────────
   13. LOADING SCREEN DISMISS
   Hides the fullscreen loader 1.8s after the
   window `load` event fires.
───────────────────────────────────────────── */
function initLoader() {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("hide");
  }, 1800);

  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("hide");
  }, 3000);
}


/* ─────────────────────────────────────────────
   14. INIT
   Runs all initialisation functions once the DOM
   is fully parsed.
───────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();       // Build product grid
  initTestimonials();     // Testimonial slider + dots
  initNavbar();           // Transparent → solid on scroll
  initLoader();           // Dismiss loading screen

  // Delay reveal observer slightly so dynamically
  // rendered product cards are in the DOM first
  setTimeout(() => {
    initScrollReveal();
  }, 100);
});
