const cartToggleBtn = document.getElementById('cart-toggle');
const cart = document.getElementById('cart');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountSpan = document.getElementById('cart-count');
const cartTotalDiv = document.getElementById('cart-total');

let cartItems = {};

cartToggleBtn.addEventListener('click', () => {
  cart.classList.toggle('cart-visible');
});

closeCartBtn.addEventListener('click', () => {
  cart.classList.remove('cart-visible');
});

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const productDiv = e.target.closest('.product');
    const id = productDiv.dataset.id;
    const name = productDiv.dataset.name;
    const price = parseFloat(productDiv.dataset.price);

    if(cartItems[id]) {
      cartItems[id].quantity += 1;
    } else {
      cartItems[id] = { name, price, quantity: 1 };
    }

    updateCartUI();
  });
});

function updateCartUI() {
  cartItemsContainer.innerHTML = '';
  let total = 0;
  let itemCount = 0;

  for (const id in cartItems) {
    const item = cartItems[id];
    total += item.price * item.quantity;
    itemCount += item.quantity;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <span>${item.name} x${item.quantity}</span>
      <span>R${(item.price * item.quantity).toFixed(2)}</span>
      <button data-id="${id}" class="remove-item">×</button>
    `;

    cartItemsContainer.appendChild(itemDiv);
  }

  cartCountSpan.textContent = itemCount;
  cartTotalDiv.textContent = `Total: R${total.toFixed(2)}`;

  // Add remove functionality
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = e.target.dataset.id;
      delete cartItems[id];
      updateCartUI();
    });
  });
}

document.getElementById('checkout-btn').addEventListener('click', () => {
  alert('Checkout functionality is not implemented in this demo.');
});
