// script.js â€“ Full storefront with cart & AI chat placeholder

// ---------- Dá»® LIá»†U Sáº¢N PHáº¨M (cÃ³ thá»ƒ thay báº±ng API thá»±c) ----------
const products = [
  {
    id: 1,
    name: "Vá»¯a XÃ¢y Dá»±ng Victory",
    img: "https://vuaxoatuong.vn/pic/SystemWebsite/logo_6355.jpg",
    desc: "Vá»¯a cháº¥t lÆ°á»£ng cao, gia cÃ´ng nhanh, phÃ¹ há»£p cho má»i cÃ´ng trÃ¬nh.",
    price: 150000 // VND
  },
  {
    id: 2,
    name: "Vá»¯a XÃ¢y Dá»±ng Premium",
    img: "https://vuaxoatuong.vn/pic/SystemWebsite/logo_6355.jpg",
    desc: "Vá»¯a háº¡t má»‹n, Ä‘á»™ bÃ¡m tá»‘t, chá»‹u thá»i tiáº¿t tá»‘t.",
    price: 200000
  },
  {
    id: 3,
    name: "Keo DÃ¡n Gáº¡ch Victory",
    img: "https://vuaxoatuong.vn/pic/SystemWebsite/logo_6355.jpg",
    desc: "Keo dÃ¡n gáº¡ch nhanh khÃ´, Ä‘á»™ bÃ¡m máº¡nh.",
    price: 120000
  }
];

// ---------- GIá»Ž HÃ€NG ----------
let cart = [];

function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const countEl = document.getElementById("cartCount");
  const totalEl = document.getElementById("cartTotal");
  const itemsEl = document.getElementById("cartItems");

  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  countEl.textContent = totalQty;
  totalEl.textContent = totalPrice.toLocaleString("vi-VN") + "â€¯VND";

  // render item list
  itemsEl.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name} x ${item.qty}</span>
      <span>${(item.price * item.qty).toLocaleString('vi-VN')}â€¯VND</span>
      <button class="remove-btn" data-id="${item.id}">âœ–ï¸</button>
    `;
    itemsEl.appendChild(li);
  });

  // attach remove handlers
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      removeFromCart(id);
    });
  });
}

function toggleCart(show) {
  const overlay = document.getElementById("cartOverlay");
  if (show) overlay.classList.remove("hidden");
  else overlay.classList.add("hidden");
}

// ---------- RENDER Sáº¢N PHáº¨M ----------
function renderProducts() {
  const container = document.getElementById("products");
  const noData = document.getElementById("no-data");
  container.innerHTML = "";

  if (products.length === 0) {
    noData.classList.remove("hidden");
    return;
  }
  noData.classList.add("hidden");

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <p class="price">${p.price.toLocaleString('vi-VN')}â€¯VND</p>
        <button class="add-to-cart" data-id="${p.id}">ðŸ›’ ThÃªm vÃ o giá»</button>
      </div>
    `;
    container.appendChild(card);
  });

  // addâ€‘toâ€‘cart listeners
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const prod = products.find(p => p.id === id);
      if (prod) addToCart(prod);
    });
  });
}

// ---------- CHATBOX ----------
function initChat() {
  const chatBtn = document.getElementById("chatBtn");
  const chatOverlay = document.getElementById("chatOverlay");
  const closeChat = document.getElementById("closeChat");
  const sendBtn = document.getElementById("sendBtn");
  const chatInput = document.getElementById("chatInput");
  const chatLog = document.getElementById("chatLog");

  chatBtn.addEventListener("click", () => chatOverlay.classList.remove("hidden"));
  closeChat.addEventListener("click", () => chatOverlay.classList.add("hidden"));
  sendBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", e => { if (e.key === "Enter") sendMessage(); });

  function sendMessage() {
    const msg = chatInput.value.trim();
    if (!msg) return;
    appendMessage("Báº¡n", msg);
    // Placeholder AI: echo with a short delay
    setTimeout(() => appendMessage("AI", `Báº¡n nÃ³i: ${msg}`), 400);
    chatInput.value = "";
  }

  function appendMessage(sender, text) {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatLog.appendChild(p);
    chatLog.scrollTop = chatLog.scrollHeight;
  }
}

// ---------- INITIALIZATION ----------
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  initChat();

  // Cart toggle
  document.getElementById("cartToggle").addEventListener("click", () => toggleCart(true));
  document.getElementById("closeCart").addEventListener("click", () => toggleCart(false));
  document.getElementById("checkoutBtn").addEventListener("click", () => {
    alert(`Báº¡n cÃ³ ${cart.length} máº·t hÃ ng trong giá», tá»•ng cá»™ng ${cart.reduce((s,i)=>s+i.price*i.qty,0).toLocaleString('vi-VN')}â€¯VND.\n(Thanh toÃ¡n chÆ°a Ä‘Æ°á»£c tÃ­ch há»£p)`);
  });
});
