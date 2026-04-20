// Дані про товари збережені в масиві
const products = [
    { id: 1, name: "Букет 'Весна'", price: 750, img: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400" },
    { id: 2, name: "Червоні троянди", price: 1200, img: "https://images.unsplash.com/photo-1548610762-656977da608c?w=400" },
    { id: 3, name: "Набір солодощів", price: 450, img: "https://images.unsplash.com/photo-1549465220-1d8c9d9c4701?w=400" },
    { id: 4, name: "Кошик фруктів", price: 900, img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400" }
];

let cart = [];

// Функція перемикання між секціями (SPA-підхід)
function showSection(id) {
    const sections = ['home', 'catalog', 'about'];
    sections.forEach(s => {
        document.getElementById(s).className = (s === id) ? 'active-section' : 'hidden-section';
    });
}

// Відображення товарів
function renderProducts() {
    const container = document.getElementById('product-list');
    container.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>Ціна: ${p.price} грн</p>
            <button class="btn-select" onclick="addToCart(${p.id})">Обрати</button>
        </div>
    `).join('');
}

// Додавання до списку та розрахунок суми
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById('cart-items');
    const totalEl = document.getElementById('total-price');
    
    if (cart.length === 0) {
        cartDiv.innerHTML = "Список порожній";
        totalEl.innerText = "0";
        return;
    }

    cartDiv.innerHTML = cart.map((item, idx) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
            <span>${item.name}</span>
            <span>${item.price} грн <button onclick="remove(${idx})" style="border:none; background:none; cursor:pointer;">🗑️</button></span>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalEl.innerText = total;
}

function remove(index) {
    cart.splice(index, 1);
    updateCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Будь ласка, спочатку оберіть товари.");
    } else {
        const total = document.getElementById('total-price').innerText;
        alert(`Дякуємо! Ваше замовлення прийнято. Загальна сума: ${total} грн.`);
        cart = [];
        updateCart();
    }
}

// Запуск при завантаженні
window.onload = renderProducts;