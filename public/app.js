document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');

    // Sample Products Data
    const sampleProducts = [
        {
            name: "Wireless Headphones",
            description: "High-quality wireless headphones with noise cancellation.",
            price: 2500,
            image: "https://via.placeholder.com/150"
        },
        {
            name: "Smartphone",
            description: "Latest model smartphone with all the features you need.",
            price: 50000,
            image: "https://via.placeholder.com/150"
        },
        {
            name: "Gaming Laptop",
            description: "High-performance gaming laptop for enthusiasts.",
            price: 120000,
            image: "https://via.placeholder.com/150"
        }
    ];

    renderProducts(sampleProducts);
});

const productList = document.getElementById('product-list');
const cart = [];

function renderProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>Price:</strong> Ksh ${product.price}</p>
            <button class="btn buy-btn">Buy</button>
            <button class="btn add-to-cart-btn">Add to Cart</button>
        `;
        productList.appendChild(productCard);

        // Add event listener to 'Buy' button
        productCard.querySelector('.buy-btn').addEventListener('click', () => {
            showOrderPopup(product);
        });

        // Add event listener to 'Add to Cart' button
        productCard.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            showAddToCartPopup(product);
        });
    });
}

function showOrderPopup(product) {
    const orderQuantity = prompt(`How many ${product.name} would you like to order?`);
    if (orderQuantity !== null && !isNaN(orderQuantity) && orderQuantity > 0) {
        processPayment(product, orderQuantity);
    } else {
        alert('Invalid quantity. Please enter a valid number.');
    }
}

function processPayment(product, quantity) {
    alert(`Successfully purchased ${quantity} ${product.name}(s) for Ksh ${product.price * quantity}.`);
}

function showAddToCartPopup(product) {
    const orderQuantity = prompt(`How many ${product.name} would you like to add to the cart?`);
    if (orderQuantity !== null && !isNaN(orderQuantity) && orderQuantity > 0) {
        addToCart(product, parseInt(orderQuantity));
    } else {
        alert('Invalid quantity. Please enter a valid number.');
    }
}

function addToCart(product, quantity) {
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        product.quantity = quantity;
        cart.push(product);
    }
    updateCartCount();
}

function updateCartCount() {
    const cartBtn = document.getElementById('cart-btn');
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartBtn.textContent = `Cart (${cartCount})`;
}
function navigateToLogin() {
    window.location.href = "Login.html";
}
