// Data produk
window.products = [
  {
    id: 1,
    name: "Kaos Simo Elang",
    price: 45000,
    originalPrice: 150000,
    desc: "simple & modern 100% katun",
    image: "products/elang.jpg"
  },
  {
    id: 2,
    name: "Kaos Simo",
    price: 40000,
    originalPrice: 130000,
    desc: "simple & modern 100% katun",
    image: "products/ChatGPT Image Jun 25, 2025, 10_20_19 PM.png"
  },
  {
    id: 3,
    name: "Kaos Garuda",
    price: 40000,
    originalPrice: 130000,
    desc: "simple & modern 100% katun",
    image: "products/garuda.jpg"
  },
  {
    id: 4,
    name: "Kaos Simo Classic",
    price: 40000,
    originalPrice: 130000,
    desc: "simple & modern 100% katun",
    image: "products/simo.jpg"
  },
  {
    id: 5,
    name: "Kaos Simo Classic",
    price: 40000,
    originalPrice: 130000,
    desc: "simple & modern 100% katun",
    image: "products/simo.jpg"
  },
  {
    id: 6,
    name: "Kaos Simo Classic",
    price: 40000,
    originalPrice: 130000,
    desc: "simple & modern 100% katun",
    image: "products/simo.jpg"
  },
  {
    id: 7,
    name: "Kaos Simo Classic",
    price: 40000,
    originalPrice: 130000,
    desc: "simple & modern 100% katun",
    image: "products/simo.jpg"
  },
  {
    id: 8,
    name: "Kaos Simo Classic",
    price: 40000,
    originalPrice: 130000,
    desc: "simple & modern 100% katun",
    image: "products/simo.jpg"
  }
];

// Fungsi render kartu produk
function renderProductCard(product) {
  return `
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <a href="detail.html?id=${product.id}">
        <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
        <div class="p-4">
          <h3 class="font-bold text-lg mb-2">${product.name}</h3>
          <div class="flex justify-between items-center">
            <span class="text-indigo-600 font-bold">Rp ${product.price.toLocaleString('id-ID')}</span>
            <span class="text-sm text-gray-500 line-through">Rp ${product.originalPrice.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </a>
    </div>
  `;
}

// Render ke halaman utama jika ada elemen featured-products
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("featured-products");
  if (container) {
    products.forEach(p => {
      container.innerHTML += renderProductCard(p);
    });
  }
});

// Ambil keranjang dari localStorage
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Simpan keranjang ke localStorage
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Tambahkan produk ke keranjang
function addToCart(productId) {
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  setCart(cart);
  updateCartCount();
}

// Update angka keranjang di navbar
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.qty, 0);
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = count;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  // ...kode lain misal render produk ke featured
});
