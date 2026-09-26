/* =====================================================================
   SCRIPT.JS — all of Urbandana's front-end logic
   -----------------------------------------------------------------
   This file only contains logic — no giant image data. Product and
   hero-slide photos live in images.js and are referenced here as
   IMG.tee1, IMG.cap1, IMG.heroWall, etc.

   Load order in index.html must stay:
     1. images.js   (defines the IMG object)
     2. script.js    (this file — uses IMG.___)

   Jump straight to the parts you're most likely to edit:
     - Search "EDIT ZONE #1" for your product list (names, prices, stock, photos)
     - Search "EDIT ZONE #2" for the hero slideshow photo order
     - Search "EDIT ZONE #3" for the "Style Finder" suggestion photos
       (the pics shown after someone takes a live photo and picks Tee or Cap)
   Everything after that just wires up the cart, drawers and popups —
   you shouldn't need to touch it, but it is commented section by section.
   ===================================================================== */

/* =====================================================================
   ██████████████████████████████████████████████████████████████████
   ██  EDIT ZONE #1 — YOUR PRODUCTS GO HERE                          ██
   ██████████████████████████████████████████████████████████████████

   Everything below is plain JavaScript. You do NOT need to know how
   to code — just copy an existing product block (the bit between
   the curly braces { ... }), paste it as a new entry, and change the
   text/numbers.

   Fields explained:
     id          -> a unique number. Never reuse a number.
     name        -> the product title shown on the card.
     price       -> a plain number, e.g. 899  (no ₹ symbol, no commas).
     inStock     -> true  = shows "Add to cart"
                    false = shows "Out of stock" and disables the button.
     images      -> a list of photos for this product. The FIRST one
                    is used as the card thumbnail. Put your own image
                    link in quotes, for example:
                       images: ["https://yourcdn.com/photos/tee9.jpg"]
                    You can list more than one photo — all of them show
                    up in the "quick view" popup when a shopper clicks
                    the product image.
     description -> one or two lines shown in the quick view popup.

   -----------------------------------------------------------------
   EXAMPLE — adding a brand new T-shirt of your own:

     {
       id: 9,
       name: "Sunrise Bandana Tee",
       price: 999,
       inStock: true,
       images: [
         "https://yourcdn.com/photos/sunrise-tee-front.jpg",
         "https://yourcdn.com/photos/sunrise-tee-back.jpg"
       ],
       description: "Oversized fit tee with a hand-picked bandana panel."
     }

   Just add a comma after the previous product's closing "}" and paste
   your new block in before the closing "]" of the list.
   ===================================================================== */

const TSHIRT_PRODUCTS = [
  { id:1, name:"Maroon Bandana Panel Tee — Black", price:599, inStock:true,
    images:[IMG.tee1],
    description:"Oversized black tee with an authentic maroon bandana print panel running down the front. Premium cotton, regular fit." },
  { id:2, name:"Warli Art Panel Tee — White", price:599, inStock:true,
    images:[IMG.tee2],
    description:"Clean white tee featuring a hand-drawn Warli folk-art print panel. Soft, breathable premium cotton." },
  { id:3, name:"Maroon Bandana Panel Tee — White", price:599, inStock:true,
    images:[IMG.tee3],
    description:"White tee with the signature maroon bandana medallion panel. Strong stitching, all-day comfort." },
  { id:4, name:"Warli Art Panel Tee — Indigo", price:599, inStock:true,
    images:[IMG.tee4],
    description:"Black tee with a rich indigo Warli folk-art print panel depicting village life. Regular fit." },
  { id:5, name:"Madhubani Panel Tee — Black", price:599, inStock:true,
    images:[IMG.tee5],
    description:"Black tee with a bold Madhubani-inspired figure print panel in maroon, mustard and indigo." },
  { id:6, name:"Warli Art Panel Tee — Indigo II", price:599, inStock:true,
    images:[IMG.tee6],
    description:"Second colourway of our Warli folk-art panel tee, printed on heavyweight black cotton." },
  { id:7, name:"Warli Art Panel Tee — Ivory", price:599, inStock:true,
    images:[IMG.tee7],
    description:"Black tee with an ivory Warli-art print panel — clean, minimal, still a bold statement." },
  { id:8, name:"Folk Mask Panel Tee — Black", price:599, inStock:true,
    images:[IMG.tee8],
    description:"Black tee with a striking traditional folk-mask motif panel in maroon and gold tones." }
];

const CAP_PRODUCTS = [
  { id:101, name:"Convertible Bandana Cap — Red Bloom", price:349, inStock:true,
    images:[IMG.cap1,IMG.cap2,IMG.cap3],
    description:"3 styles in 1: wear it as a cap, flip it into a full bandana, or fold it into a visor. One size fits all." },

  { id:102, name:"Convertible Bamdana cap - White Bloom",price:349, inStock:true,
    images : ["cap1.jpeg"],
    description:"3 styles in 1: wear it as a cap, flip it into a full bandana, or fold it into a visor. One size fits all." },

  { id:103, name:"Convertible Bamdana cap - Black Bloom",price:399, inStock:true,
    images : ["cap2.jpeg","cap2-1.jpeg","cap2-2.jpeg"],
    description:"3 styles in 1: wear it as a cap, flip it into a full bandana, or fold it into a visor. One size fits all." },

  { id:104, name:"Convertible Bamdana cap - Maroon Bloom",price:349, inStock:true,
    images : ["cap3.jpeg","cap3-1.jpeg"],
    description:"3 styles in 1: wear it as a cap, flip it into a full bandana, or fold it into a visor. One size fits all." },

  { id:105, name:"Convertible Bamdana cap - Blue Bloom",price:349, inStock:true,
    images : ["cap4-2.jpeg",,"cap4-1.jpeg","cap4.jpeg"],
    description:"3 styles in 1: wear it as a cap, flip it into a full bandana, or fold it into a visor. One size fits all." },
  /* -----------------------------------------------------------------
     ADD MORE CAPS HERE.
     Example of a second cap product using your own photos:

     { id:102, name:"Classic Black Bandana Cap", price:449, inStock:true,
       images:["https://yourcdn.com/photos/black-cap-1.jpg"],
       description:"Black bandana-print cap, one size fits all." },
  ----------------------------------------------------------------- */
];

/* =====================================================================
   ██████████████████████████████████████████████████████████████████
   ██  EDIT ZONE #2 — HERO SLIDESHOW PHOTOS (feature #3)             ██
   ██████████████████████████████████████████████████████████████████
   Add, remove or reorder slides here. "caption" is the small line
   of text above the big headline (the headline itself is fixed HTML
   above, inside the <section class="hero">).
   ===================================================================== */
const HERO_SLIDES = [
  IMG.heroWall,
  "cap1.jpeg",
  "tshirt-1.jpeg"
];

/* =====================================================================
   ██████████████████████████████████████████████████████████████████
   ██  EDIT ZONE #3 — "STYLE FINDER" SUGGESTION PHOTOS (prototype)   ██
   ██████████████████████████████████████████████████████████████████
   This powers the new feature: someone takes a live photo of their
   face, picks "T-Shirt" or "Cap", and gets shown ONE photo picked at
   RANDOM from the matching list below. It is NOT a real recommendation
   engine yet — it's just a placeholder so you can see the flow work.

   Each entry only needs:
     name  -> shown under the suggested photo
     image -> the photo shown. Can be an IMG.___ reference (reusing a
              photo already loaded in images.js) or your own image URL,
              e.g. "https://yourcdn.com/photos/recommended-tee-1.jpg"

   -----------------------------------------------------------------
   TO ADD MORE PHOTOS FOR THE SUGGESTION TO PICK FROM:
   just add another { name: "...", image: "..." } line below, for example:

     { name: "Rainy Day Bandana Tee", image: "https://yourcdn.com/rainy-tee.jpg" }

   The more entries you add to a list, the more variety "Try another
   suggestion" will have to shuffle through.
   ===================================================================== */
const STYLE_SUGGESTIONS = {
  tee: [
    { name:"Maroon Bandana Panel Tee — Black", image:IMG.tee1 },
    { name:"Warli Art Panel Tee — White", image:IMG.tee2 },
    { name:"Folk Mask Panel Tee — Black", image:IMG.tee8 },
    { name:"Warli Art Panel Tee — Indigo", image:IMG.tee4 }
    /* add more suggested tee photos here */
  ],
  cap: [
    { name:"Convertible Bandana Cap — Front", image:IMG.cap1 },
    { name:"Convertible Bandana Cap — Side", image:"cap4.jpeg" },
    { name:"Convertible Bandana Cap — Side", image:"cap2.jpeg" },
    { name:"Convertible Bandana Cap — Side", image:"cap4.jpeg" },
    { name:"Convertible Bandana Cap — Side", image:"cap3.jpeg" },
    /* add more suggested cap photos here */
  ]
};

/* =====================================================================
   That's it for the parts you're most likely to touch. Everything
   below just makes the buttons, drawers and popups work — you don't
   need to edit it, but it's commented in case you're curious.
   ===================================================================== */

// ---------- helpers ----------
const fmt = n => "₹" + n.toLocaleString("en-IN");
const $  = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

function showToast(msg){
  const t = $("#toast");
  $("#toastMsg").textContent = msg;
  t.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=>t.classList.remove("show"), 2600);
}

// give every product a "type" tag so tee id 1 and cap id 1 never collide
const ALL_PRODUCTS = [
  ...TSHIRT_PRODUCTS.map(p=>({...p, type:"tee"})),
  ...CAP_PRODUCTS.map(p=>({...p, type:"cap"}))
];
function findProduct(type, id){
  return ALL_PRODUCTS.find(p=>p.type===type && p.id===id);
}
function keyOf(type,id){ return type+"-"+id; }

// ---------- app state (all in-memory only — resets on page refresh,
// exactly as requested: no database, no localStorage, no server) ----------
const state = {
  theme: "dark",
  cart: {},       // { "tee-1": qty, "cap-101": qty }
  favorites: new Set(), // "tee-1", "cap-101"
  cardQty: {},    // temp qty selection on product cards before "Add to cart"
  user: null,     // { name, email, phone } once "logged in"
  reviews: [
    { name:"Rahul Mehta", stars:5, text:"The bandana panel print quality is unreal — looks even better in person. Got so many compliments on the tee.", date:"2 weeks ago" },
    { name:"Sana Iqbal", stars:5, text:"Ordered the convertible cap and honestly wear it every day now. The fabric feels premium, not flimsy at all.", date:"1 month ago" },
    { name:"Karan Bose", stars:4, text:"Great fit and the fabric is soft. Wish there were a couple more colourways, but overall really happy.", date:"1 month ago" },
    { name:"Meher Kaur", stars:5, text:"Fast delivery and the packaging felt premium. The Warli print tee is my new favourite piece.", date:"6 weeks ago" }
  ],
  quickView: null // currently open product in the quick-view modal
};

// ==========================================================================
// THEME TOGGLE — feature #1
// ==========================================================================
function setTheme(mode){
  state.theme = mode;
  document.documentElement.setAttribute("data-theme", mode);
  $$("#themeToggle button").forEach(b=>b.classList.toggle("active", b.dataset.theme===mode));
}
$("#themeToggle").addEventListener("click", e=>{
  const btn = e.target.closest("button");
  if(btn) setTheme(btn.dataset.theme);
});

// ==========================================================================
// MOBILE MENU + NAV SEARCH TOGGLE
// ==========================================================================
$("#burgerBtn").addEventListener("click", ()=> $("#mobileMenu").classList.toggle("open"));
$$("#mobileMenu a").forEach(a=>a.addEventListener("click", ()=> $("#mobileMenu").classList.remove("open")));

$("#searchToggleBtn").addEventListener("click", ()=>{
  $("#searchBox").classList.toggle("open");
  if($("#searchBox").classList.contains("open")) $("#searchInput").focus();
});

// ==========================================================================
// SEARCH — feature #8 (live filter across both categories)
// ==========================================================================
$("#searchInput").addEventListener("input", e=>{
  const q = e.target.value.trim().toLowerCase();
  filterAndRenderGrid("teeGrid", TSHIRT_PRODUCTS, "tee", q);
  filterAndRenderGrid("capGrid", CAP_PRODUCTS, "cap", q);
  if(q){
    // jump to whichever section has matches, gently
    const anyTeeMatch = TSHIRT_PRODUCTS.some(p=>p.name.toLowerCase().includes(q));
    const target = anyTeeMatch ? "#tshirts" : "#caps";
    document.querySelector(target).scrollIntoView({behavior:"smooth", block:"start"});
  }
});

// ==========================================================================
// PRODUCT CARD RENDERING — feature #4 (grid + price/stock placeholders)
// ==========================================================================
function cardTemplate(p){
  const favKey = keyOf(p.type, p.id);
  const isFav = state.favorites.has(favKey);
  const qty = state.cardQty[favKey] || 1;
  return `
  <div class="card" data-key="${favKey}">
    <div class="card-media" data-action="quickview">
      <img src="${p.images[0]}" alt="${p.name}">
      <button class="card-fav ${isFav?"active":""}" data-action="fav" aria-label="Add to favorites">
        <svg viewBox="0 0 24 24" fill="${isFav?'currentColor':'none'}" stroke="currentColor" stroke-width="2"><path d="M12 21s-8-4.6-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 6.4-8 11-8 11z"/></svg>
      </button>
      <span class="stock-chip ${p.inStock?'in':'out'}">${p.inStock ? "In stock" : "Out of stock"}</span>
    </div>
    <div class="card-body">
      <h3>${p.name}</h3>
      <div class="card-price">${fmt(p.price)}</div>
      <div class="card-actions">
        <div class="qty-stepper">
          <button data-action="qty-minus">−</button>
          <span>${qty}</span>
          <button data-action="qty-plus">+</button>
        </div>
        <button class="add-cart-btn" data-action="add-cart" ${p.inStock?"":"disabled"}>
          ${p.inStock ? "Add to cart" : "Sold out"}
        </button>
      </div>
    </div>
  </div>`;
}

function renderGrid(gridId, products, type){
  // IMPORTANT: each product object must carry its "tee"/"cap" type before
  // being handed to cardTemplate(), otherwise the card's data-key ends up
  // as "undefined-1" and every button on it (add to cart, favorite, qty)
  // silently fails to find the matching product.
  $("#"+gridId).innerHTML = products.map(p => cardTemplate({...p, type})).join("");
}
function filterAndRenderGrid(gridId, products, type, query){
  const filtered = query ? products.filter(p=>p.name.toLowerCase().includes(query)) : products;
  if(filtered.length===0 && query){
    $("#"+gridId).innerHTML = `<p style="color:var(--text-muted); grid-column:1/-1;">No products match "${query}" in this section.</p>`;
  } else {
    $("#"+gridId).innerHTML = filtered.map(p=>cardTemplate({...p,type})).join("");
  }
}

// delegated click handling for both grids (add/remove cards dynamically -> use event delegation)
["teeGrid","capGrid"].forEach(gridId=>{
  $("#"+gridId).addEventListener("click", e=>{
    const cardEl = e.target.closest(".card");
    if(!cardEl) return;
    const [type,idStr] = cardEl.dataset.key.split("-");
    const id = Number(idStr);
    const p = findProduct(type,id);
    const favKey = keyOf(type,id);
    const action = e.target.closest("[data-action]")?.dataset.action;

    if(action==="quickview") openQuickView(type,id);
    if(action==="fav") toggleFavorite(type,id);
    if(action==="qty-plus"){ state.cardQty[favKey] = (state.cardQty[favKey]||1)+1; rerenderProduct(cardEl,p); }
    if(action==="qty-minus"){ state.cardQty[favKey] = Math.max(1,(state.cardQty[favKey]||1)-1); rerenderProduct(cardEl,p); }
    if(action==="add-cart"){
      const qty = state.cardQty[favKey]||1;
      addToCart(type,id,qty);
    }
  });
});
function rerenderProduct(cardEl,p){
  cardEl.outerHTML = cardTemplate(p);
}

// ==========================================================================
// FAVORITES — feature #9
// ==========================================================================
function toggleFavorite(type,id){
  const key = keyOf(type,id);
  if(state.favorites.has(key)){ state.favorites.delete(key); }
  else { state.favorites.add(key); showToast("Added to favorites"); }
  renderGrid("teeGrid", TSHIRT_PRODUCTS, "tee");
  renderGrid("capGrid", CAP_PRODUCTS, "cap");
  renderFavBadge();
  renderFavDrawer();
}
function renderFavBadge(){
  const n = state.favorites.size;
  $("#favBadge").style.display = n? "flex":"none";
  $("#favBadge").textContent = n;
}
function renderFavDrawer(){
  const items = Array.from(state.favorites).map(key=>{
    const [type,idStr] = key.split("-");
    return findProduct(type, Number(idStr));
  });
  if(items.length===0){
    $("#favBody").innerHTML = `<div class="drawer-empty">No favorites yet. Tap the heart on any product to save it here.</div>`;
    return;
  }
  $("#favBody").innerHTML = items.map(p=>`
    <div class="drawer-item">
      <img src="${p.images[0]}" alt="${p.name}">
      <div class="drawer-item-info">
        <h4>${p.name}</h4>
        <span style="color:var(--text-muted); font-size:12.5px;">${fmt(p.price)}</span>
        <div class="row">
          <button class="btn btn-dark" style="padding:7px 14px; font-size:11.5px;" data-fav-add="${p.type}-${p.id}">Add to cart</button>
          <button class="drawer-remove" data-fav-remove="${p.type}-${p.id}">Remove</button>
        </div>
      </div>
    </div>`).join("");
}
$("#favBody").addEventListener("click", e=>{
  const addKey = e.target.closest("[data-fav-add]")?.dataset.favAdd;
  const remKey = e.target.closest("[data-fav-remove]")?.dataset.favRemove;
  if(addKey){ const [type,id]=addKey.split("-"); addToCart(type,Number(id),1); }
  if(remKey){ const [type,id]=remKey.split("-"); toggleFavorite(type,Number(id)); }
});

// ==========================================================================
// CART — feature #5, #10 quantity is carried over from the product card
// ==========================================================================
function addToCart(type,id,qty){
  const p = findProduct(type,id);
  if(!p.inStock){ showToast("Sorry, that item is out of stock"); return; }
  const key = keyOf(type,id);
  state.cart[key] = (state.cart[key]||0) + qty;
  renderCartBadge();
  renderCartDrawer();
  showToast(`${p.name} added to cart`);
}
function changeCartQty(key, delta){
  state.cart[key] = Math.max(0, (state.cart[key]||0)+delta);
  if(state.cart[key]===0) delete state.cart[key];
  renderCartBadge(); renderCartDrawer();
}
function removeFromCart(key){ delete state.cart[key]; renderCartBadge(); renderCartDrawer(); }
function cartEntries(){
  return Object.entries(state.cart).map(([key,qty])=>{
    const [type,idStr] = key.split("-");
    const p = findProduct(type, Number(idStr));
    return { key, qty, p };
  });
}
function cartTotal(){ return cartEntries().reduce((sum,e)=> sum + e.p.price*e.qty, 0); }
function renderCartBadge(){
  const n = Object.values(state.cart).reduce((a,b)=>a+b,0);
  $("#cartBadge").style.display = n? "flex":"none";
  $("#cartBadge").textContent = n;
}
function renderCartDrawer(){
  const entries = cartEntries();
  if(entries.length===0){
    $("#cartBody").innerHTML = `<div class="drawer-empty">Your cart is empty. Go grab a bandana tee or cap!</div>`;
    $("#cartFoot").style.display = "none";
    return;
  }
  $("#cartFoot").style.display = "flex";
  $("#cartBody").innerHTML = entries.map(({key,qty,p})=>`
    <div class="drawer-item">
      <img src="${p.images[0]}" alt="${p.name}">
      <div class="drawer-item-info">
        <h4>${p.name}</h4>
        <span style="color:var(--text-muted); font-size:12.5px;">${fmt(p.price)} × ${qty} = ${fmt(p.price*qty)}</span>
        <div class="row">
          <div class="qty-stepper">
            <button data-cart-minus="${key}">−</button>
            <span>${qty}</span>
            <button data-cart-plus="${key}">+</button>
          </div>
          <button class="drawer-remove" data-cart-remove="${key}">Remove</button>
        </div>
      </div>
    </div>`).join("");
  $("#cartSubtotal").textContent = fmt(cartTotal());
}
$("#cartBody").addEventListener("click", e=>{
  const plus = e.target.closest("[data-cart-plus]")?.dataset.cartPlus;
  const minus = e.target.closest("[data-cart-minus]")?.dataset.cartMinus;
  const rem = e.target.closest("[data-cart-remove]")?.dataset.cartRemove;
  if(plus) changeCartQty(plus, 1);
  if(minus) changeCartQty(minus, -1);
  if(rem) removeFromCart(rem);
});

// open/close cart + fav drawers
function openDrawer(drawerId, backdropId){ $("#"+drawerId).classList.add("open"); $("#"+backdropId).classList.add("open"); }
function closeDrawer(drawerId, backdropId){ $("#"+drawerId).classList.remove("open"); $("#"+backdropId).classList.remove("open"); }
$("#cartToggleBtn").addEventListener("click", ()=> openDrawer("cartDrawer","cartBackdrop"));
$("#cartCloseBtn").addEventListener("click", ()=> closeDrawer("cartDrawer","cartBackdrop"));
$("#cartBackdrop").addEventListener("click", ()=> closeDrawer("cartDrawer","cartBackdrop"));
$("#favToggleBtn").addEventListener("click", ()=> openDrawer("favDrawer","favBackdrop"));
$("#favCloseBtn").addEventListener("click", ()=> closeDrawer("favDrawer","favBackdrop"));
$("#favBackdrop").addEventListener("click", ()=> closeDrawer("favDrawer","favBackdrop"));

// ==========================================================================
// QUICK VIEW MODAL — feature #10 (quantity selector + buy now)
// ==========================================================================
function openQuickView(type,id){
  const p = findProduct(type,id);
  state.quickView = {type,id,activeImg:0,qty:1};
  renderQuickView();
  openModal("quickViewModal");
}
function renderQuickView(){
  const {type,id,activeImg,qty} = state.quickView;
  const p = findProduct(type,id);
  const favKey = keyOf(type,id);
  const isFav = state.favorites.has(favKey);
  $("#qvContent").innerHTML = `
    <div>
      <div class="qv-main-img"><img src="${p.images[activeImg]}" alt="${p.name}"></div>
      ${p.images.length>1 ? `<div class="qv-thumbs">${p.images.map((img,i)=>`<img src="${img}" class="${i===activeImg?'active':''}" data-thumb="${i}">`).join("")}</div>` : ""}
    </div>
    <div>
      <span class="stock-chip ${p.inStock?'in':'out'}" style="position:static; display:inline-flex; margin-bottom:10px;">${p.inStock?"In stock":"Out of stock"}</span>
      <h3>${p.name}</h3>
      <div class="qv-price">${fmt(p.price)}</div>
      <p class="qv-desc">${p.description}</p>
      <div class="qty-stepper" style="width:fit-content;">
        <button data-qv-qty="-1">−</button>
        <span>${qty}</span>
        <button data-qv-qty="1">+</button>
      </div>
      <div class="qv-row">
        <button class="btn btn-dark" style="flex:1;" id="qvAddCart" ${p.inStock?"":"disabled"}>Add to cart</button>
        <button class="btn btn-solid" style="flex:1;" id="qvBuyNow" ${p.inStock?"":"disabled"}>Buy now</button>
        <button class="icon-btn" style="border:1px solid var(--line-strong);" id="qvFavBtn" aria-label="favorite">
          <svg viewBox="0 0 24 24" fill="${isFav?'currentColor':'none'}" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><path d="M12 21s-8-4.6-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 6.4-8 11-8 11z"/></svg>
        </button>
      </div>
    </div>`;
}
$("#qvContent").addEventListener("click", e=>{
  const thumb = e.target.closest("[data-thumb]");
  const qtyBtn = e.target.closest("[data-qv-qty]");
  if(thumb){ state.quickView.activeImg = Number(thumb.dataset.thumb); renderQuickView(); }
  if(qtyBtn){ state.quickView.qty = Math.max(1, state.quickView.qty + Number(qtyBtn.dataset.qvQty)); renderQuickView(); }
  if(e.target.closest("#qvAddCart")){ addToCart(state.quickView.type, state.quickView.id, state.quickView.qty); }
  if(e.target.closest("#qvFavBtn")){ toggleFavorite(state.quickView.type, state.quickView.id); renderQuickView(); }
  if(e.target.closest("#qvBuyNow")){
    addToCart(state.quickView.type, state.quickView.id, state.quickView.qty);
    closeModal("quickViewModal");
    openCheckout();
  }
});

// ==========================================================================
// PROFILE / LOGIN — feature #2 (front-end only, no database)
// ==========================================================================
$("#profileBtn").addEventListener("click", ()=>{
  openModal("profileModal");
  $("#profileLoggedOut").style.display = state.user ? "none":"block";
  $("#profileLoggedIn").style.display = state.user ? "block":"none";
});
$("#profileForm").addEventListener("submit", e=>{
  e.preventDefault();
  state.user = {
    name: $("#profName").value.trim(),
    email: $("#profEmail").value.trim(),
    phone: $("#profPhone").value.trim()
  };
  applyLoggedInUI();
  showToast(`Welcome, ${state.user.name.split(" ")[0]}!`);
});
$("#logoutBtn").addEventListener("click", ()=>{
  state.user = null;
  closeModal("profileModal");
  showToast("Logged out");
});
function applyLoggedInUI(){
  $("#profileLoggedOut").style.display = "none";
  $("#profileLoggedIn").style.display = "block";
  $("#profileViewName").textContent = state.user.name;
  $("#profileViewEmail").textContent = state.user.email;
  $("#profileViewPhone").textContent = state.user.phone;
  $("#profileInitials").textContent = state.user.name.trim().charAt(0).toUpperCase() || "U";
}

// ==========================================================================
// CHECKOUT / BUY FLOW — feature #11 (visual demo only)
// ==========================================================================
function openCheckout(){
  $("#checkoutTotal").textContent = fmt(cartTotal());
  $("#checkoutFormWrap").style.display = "block";
  $("#checkoutSuccess").style.display = "none";
  openModal("checkoutModal");
}
$("#checkoutBtn").addEventListener("click", ()=>{
  if(cartTotal()===0){ showToast("Your cart is empty"); return; }
  closeDrawer("cartDrawer","cartBackdrop");
  openCheckout();
});
const API_BASE = "http://localhost:5000/api";

function showCheckoutSuccess(name){
  $("#checkoutFormWrap").style.display = "none";
  $("#checkoutSuccess").style.display = "block";
  $("#checkoutSuccessMsg").textContent = `Thanks ${name}! We'll reach out on WhatsApp/phone to confirm delivery of your ${fmt(cartTotal())} order.`;
  state.cart = {};
  renderCartBadge(); renderCartDrawer();
}

$("#checkoutForm").addEventListener("submit", async e=>{
  e.preventDefault();

  const name = $("#coName").value.trim();
  const payload = {
    name,
    phone: $("#coPhone").value.trim(),
    address: $("#coAddress").value.trim(),
    city: $("#coCity").value.trim(),
    pincode: $("#coPin").value.trim(),
    // "payOnline" is a checkbox/radio you'll need to add to the checkout form;
    // until then this always falls back to Cash on Delivery
    paymentMethod: $("#payOnline")?.checked ? "online" : "cod",
    items: cartEntries().map(e => ({ type: e.p.type, legacyId: e.p.id, qty: e.qty }))
  };

  try {
    const orderRes = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const order = await orderRes.json();
    if(!orderRes.ok){ showToast(order.message || "Could not place order"); return; }

    if(payload.paymentMethod === "cod"){
      showCheckoutSuccess(name);
      return;
    }

    // ---- online payment: open Razorpay Checkout ----
    const payRes = await fetch(`${API_BASE}/payments/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: order._id })
    });
    const pay = await payRes.json();
    if(!payRes.ok){ showToast(pay.message || "Could not start payment"); return; }

    const rzp = new Razorpay({
      key: pay.keyId,
      amount: pay.amount,
      currency: pay.currency,
      order_id: pay.razorpayOrderId,
      name: "Urbandana",
      prefill: { name, contact: payload.phone },
      theme: { color: "#000000" },
      handler: async (response) => {
        const verifyRes = await fetch(`${API_BASE}/payments/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: order._id, ...response })
        });
        if(verifyRes.ok){ showCheckoutSuccess(name); }
        else { showToast("Payment verification failed"); }
      },
      modal: {
        // if the user closes the Razorpay popup without paying, the order
        // stays "unpaid" in the DB — you'll still see it, just unpaid
        ondismiss: () => showToast("Payment cancelled")
      }
    });
    rzp.open();
  } catch(err){
    showToast("Network error — is the backend running?");
  }
});

// ==========================================================================
// GENERIC MODAL OPEN/CLOSE
// ==========================================================================
function openModal(id){ $("#"+id).classList.add("open"); }
function closeModal(id){
  $("#"+id).classList.remove("open");
  // special case: whenever the Style Finder modal closes (X button, Cancel,
  // "Close", or clicking the dark backdrop), make sure the webcam is
  // switched off. We never want the camera light left on in the background.
  if(id === "styleFinderModal") stopCamera();
}
$$(".modal-overlay").forEach(overlay=>{
  overlay.addEventListener("click", e=>{ if(e.target===overlay) closeModal(overlay.id); });
});
$$("[data-close]").forEach(btn=>{
  btn.addEventListener("click", ()=> closeModal(btn.dataset.close));
});

// ==========================================================================
// STYLE FINDER — prototype feature: live photo -> face check -> suggestion
// -----------------------------------------------------------------------
// Flow: openStyleFinder() -> startCamera() -> person clicks "Capture" ->
// capturePhoto() grabs one video frame onto an in-memory <canvas> ->
// detectFaceInCanvas() checks it -> either showNoFaceScreen() or
// showChooseScreen() -> person picks Tee/Cap -> showResultScreen() picks
// a random photo from STYLE_SUGGESTIONS (see EDIT ZONE #3 above).
//
// Nothing here is written to a database, localStorage, or any server —
// the captured frame lives only in a JavaScript variable in this tab
// and disappears the moment the modal is closed or the page is refreshed.
// ==========================================================================
let sfStream = null;        // the active webcam MediaStream, while the camera screen is showing
let sfLastCategory = null;  // "tee" or "cap" — remembered so "Try another suggestion" knows what to re-roll

// ---- showing/hiding the 4 screens inside the modal ----
function sfShowScreen(screenId){
  ["sfCamera","sfNoFace","sfChoose","sfResult"].forEach(id=>{
    $("#"+id).style.display = (id===screenId) ? "block" : "none";
  });
}

function openStyleFinder(){
  openModal("styleFinderModal");
  sfShowScreen("sfCamera");
  $("#sfCameraError").style.display = "none";
  startCamera();
}

// ---- turning the webcam on/off ----
async function startCamera(){
  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
    sfShowCameraError("Your browser doesn't support camera access. Try the latest Chrome, Edge, or Safari.");
    return;
  }
  try{
    sfStream = await navigator.mediaDevices.getUserMedia({ video:{ facingMode:"user" }, audio:false });
    $("#sfVideo").srcObject = sfStream;
  }catch(err){
    // Most common real-world cases: permission denied, or no camera device.
    if(err.name === "NotAllowedError"){
      sfShowCameraError("Camera access was blocked. Please allow camera permission for this page and try again.");
    }else if(err.name === "NotFoundError"){
      sfShowCameraError("No camera was found on this device.");
    }else{
      sfShowCameraError("Couldn't start the camera: " + err.message);
    }
  }
}
function sfShowCameraError(msg){
  $("#sfCameraError").textContent = msg;
  $("#sfCameraError").style.display = "block";
}
function stopCamera(){
  if(sfStream){
    sfStream.getTracks().forEach(track => track.stop()); // actually releases the webcam
    sfStream = null;
  }
  $("#sfVideo").srcObject = null;
}

// ---- capturing a single frame from the live video ----
async function capturePhoto(){
  const video = $("#sfVideo");
  if(!video.videoWidth){ sfShowCameraError("Camera isn't ready yet — give it a second and try again."); return; }

  const canvas = document.createElement("canvas"); // a throwaway canvas, never added to the page or saved to disk
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  const photoDataUrl = canvas.toDataURL("image/jpeg", 0.85);

  stopCamera(); // we have our frame — no need to keep the webcam running

  const faceFound = await detectFaceInCanvas(canvas);
  if(faceFound){
    $("#sfChooseImg").src = photoDataUrl;
    sfShowScreen("sfChoose");
  }else{
    $("#sfNoFaceImg").src = photoDataUrl;
    sfShowScreen("sfNoFace");
  }
}

// ---- face detection ----
// 1) Prefer the browser's own built-in Shape Detection API (FaceDetector).
//    It's supported in Chrome/Edge on desktop + Android with zero setup —
//    no library to install, no API key, nothing to download.
// 2) If it isn't available (e.g. Firefox, Safari, older browsers), fall
//    back to a rough "is there a skin-tone-ish blob in the centre of the
//    frame" check. This is only good enough for a prototype demo — swap
//    in a real face-detection library (such as face-api.js) for production.
async function detectFaceInCanvas(canvas){
  if("FaceDetector" in window){
    try{
      const detector = new FaceDetector({ fastMode:true, maxDetectedFaces:1 });
      const faces = await detector.detect(canvas);
      return faces.length > 0;
    }catch(err){
      console.warn("Native FaceDetector failed, falling back to basic check:", err);
    }
  }
  return sfBasicSkinToneHeuristic(canvas);
}
function sfBasicSkinToneHeuristic(canvas){
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height;
  // Only look at the middle chunk of the frame, where a centred face should be.
  const sx = Math.floor(w*0.3), sy = Math.floor(h*0.15);
  const sw = Math.floor(w*0.4), sh = Math.floor(h*0.55);
  const { data } = ctx.getImageData(sx, sy, sw, sh);

  let skinPixels = 0, totalPixels = 0;
  for(let i=0; i<data.length; i+=4){
    const r=data[i], g=data[i+1], b=data[i+2];
    totalPixels++;
    // very rough skin-tone range check — not a real face detector, just a placeholder
    const isSkinish = r>60 && (r-g)>10 && (r-b)>10 && Math.max(r,g,b)-Math.min(r,g,b) > 12;
    if(isSkinish) skinPixels++;
  }
  const ratio = totalPixels ? skinPixels/totalPixels : 0;
  return ratio > 0.16; // loosely-tuned threshold for demo purposes
}

// ---- the suggestion screen ----
function showResultScreen(category){
  sfLastCategory = category;
  const pool = STYLE_SUGGESTIONS[category] || [];
  if(pool.length === 0){
    showToast("No suggestion photos added yet for this category — see STYLE_SUGGESTIONS in script.js");
    return;
  }
  const pick = pool[Math.floor(Math.random() * pool.length)];
  $("#sfResultImg").src = pick.image;
  $("#sfResultName").textContent = pick.name;
  $("#sfResultSub").textContent = category === "tee"
    ? "Based on your photo, here's a T-shirt pick for you:"
    : "Based on your photo, here's a cap pick for you:";
  sfShowScreen("sfResult");
}

// ---- wiring up all the buttons ----
$("#openStyleFinderBtn").addEventListener("click", openStyleFinder);
$("#sfCaptureBtn").addEventListener("click", capturePhoto);
$("#sfRetakeBtn").addEventListener("click", ()=>{ sfShowScreen("sfCamera"); $("#sfCameraError").style.display="none"; startCamera(); });
$("#sfWantTeeBtn").addEventListener("click", ()=> showResultScreen("tee"));
$("#sfWantCapBtn").addEventListener("click", ()=> showResultScreen("cap"));
$("#sfTryAgainBtn").addEventListener("click", ()=> showResultScreen(sfLastCategory));

// ==========================================================================
// REVIEWS — feature #7
// ==========================================================================
function renderReviews(){
  $("#reviewGrid").innerHTML = state.reviews.map(r=>`
    <div class="review-card">
      <div class="stars">${"★".repeat(r.stars)}${"☆".repeat(5-r.stars)}</div>
      <p>"${r.text}"</p>
      <div class="review-name">${r.name}</div>
      <div class="review-date">${r.date}</div>
    </div>`).join("");
}
let selectedStars = 5;
$("#starPicker").addEventListener("click", e=>{
  const btn = e.target.closest("button");
  if(!btn) return;
  selectedStars = Number(btn.dataset.star);
  $$("#starPicker button").forEach(b=> b.classList.toggle("on", Number(b.dataset.star)<=selectedStars));
});
$$("#starPicker button").forEach(b=> b.classList.toggle("on", Number(b.dataset.star)<=selectedStars));
$("#reviewForm").addEventListener("submit", e=>{
  e.preventDefault();
  const name = $("#reviewName").value.trim();
  const text = $("#reviewText").value.trim();
  state.reviews.unshift({name, stars:selectedStars, text, date:"Just now"});
  renderReviews();
  e.target.reset();
  selectedStars = 5;
  $$("#starPicker button").forEach(b=> b.classList.add("on"));
  showToast("Thanks for your review!");
});

// ==========================================================================
// HERO SLIDESHOW — feature #3
// ==========================================================================
let heroIndex = 0, heroTimer;
function renderHero(){
  $("#heroSlides").innerHTML = HERO_SLIDES.map((src,i)=>
    `<div class="hero-slide ${i===0?'active':''}" style="background-image:url('${src}')"></div>`).join("");
  $("#heroDots").innerHTML = HERO_SLIDES.map((_,i)=>
    `<button class="${i===0?'active':''}" data-slide="${i}" aria-label="Slide ${i+1}"></button>`).join("");
}
function goToSlide(i){
  heroIndex = (i+HERO_SLIDES.length) % HERO_SLIDES.length;
  $$(".hero-slide").forEach((el,idx)=> el.classList.toggle("active", idx===heroIndex));
  $$("#heroDots button").forEach((el,idx)=> el.classList.toggle("active", idx===heroIndex));
}
function startHeroAuto(){ heroTimer = setInterval(()=> goToSlide(heroIndex+1), 4200); }
function stopHeroAuto(){ clearInterval(heroTimer); }
$("#heroPrev").addEventListener("click", ()=>{ goToSlide(heroIndex-1); stopHeroAuto(); startHeroAuto(); });
$("#heroNext").addEventListener("click", ()=>{ goToSlide(heroIndex+1); stopHeroAuto(); startHeroAuto(); });
$("#heroDots").addEventListener("click", e=>{
  const btn = e.target.closest("button");
  if(btn){ goToSlide(Number(btn.dataset.slide)); stopHeroAuto(); startHeroAuto(); }
});
$(".hero").addEventListener("mouseenter", stopHeroAuto);
$(".hero").addEventListener("mouseleave", startHeroAuto);

// ==========================================================================
// MARQUEE — decorative ribbon, duplicated twice for seamless infinite scroll
// ==========================================================================
function renderMarquee(){
  const items = ["FREE SHIPPING ABOVE ₹999","AUTHENTIC BANDANA PRINTS","PREMIUM COTTON","COD AVAILABLE","NO RULES. JUST STYLE."];
  const html = items.map(t=>`<span>${t} <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4"/></svg></span>`).join("");
  $("#marqueeTrack").innerHTML = html + html; // duplicate for seamless loop
}

// ==========================================================================
// SCROLLSPY for nav active state (simple + lightweight)
// ==========================================================================
const sections = ["home","tshirts","caps","reviews"];
window.addEventListener("scroll", ()=>{
  let current = "home";
  for(const id of sections){
    const el = document.getElementById(id);
    if(el && window.scrollY >= el.offsetTop - 140) current = id;
  }
  $$(".nav-links a").forEach(a=> a.classList.toggle("active", a.getAttribute("href")==="#"+current));
});

// ==========================================================================
// INITIAL RENDER
// ==========================================================================
renderHero();
startHeroAuto();
renderMarquee();
renderGrid("teeGrid", TSHIRT_PRODUCTS, "tee");
renderGrid("capGrid", CAP_PRODUCTS, "cap");
renderReviews();
renderFavBadge();
renderCartBadge();
renderCartDrawer();
renderFavDrawer();