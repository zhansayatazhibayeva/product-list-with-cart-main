const addToCartButtons = document.querySelectorAll('.add-to-card');
const cartItemsContainer = document.querySelector('.cartItemsContainer');
const cart=document.querySelector('.cart');
const noItemMessage = document.querySelector('.no-item');
let cartItems = {}; 
let totalSum = 0;

addToCartButtons.forEach((button, index) => {
  button.addEventListener('click', function () {
    const dessertItem = button.closest('.dessert');
    const counter = dessertItem.querySelector('.counter');

    if (counter) {
      counter.classList.toggle('visible');
    }

    const addBtn = counter.querySelector('button[id="add"]');
    const removeBtn = counter.querySelector('button[id="remove"]');
    const countProduct = counter.querySelector(`.counter-${index + 1}`);
    const dessertInfo = dessertItem.querySelector('.info');

    const productName = dessertInfo.querySelector('.dessert-name').textContent.trim();
    const productPrice = parseFloat(dessertInfo.querySelector('.dessert-price').textContent.replace('$', '').trim());

    let counterProduct = parseInt(countProduct.textContent);

    if (!addBtn.dataset.listener) {
      addBtn.addEventListener('click', function () {
        counterProduct += 1;
        countProduct.textContent = counterProduct;
        totalSum+=1;
        updateCart(productName, productPrice, 1,totalSum);
      });
      addBtn.dataset.listener = true;
    }

    if (!removeBtn.dataset.listener) {
      removeBtn.addEventListener('click', function () {
        if (counterProduct > 0) {
          counterProduct -= 1;
          countProduct.textContent = counterProduct;
          totalSum-=1;
        
          updateCart(productName, productPrice, -1,totalSum); 
        }
      });
      removeBtn.dataset.listener = true;
    }
  });
});

function updateCart(productName, productPrice, quantityChange,totalSum) {

  if (!cartItems[productName]) {
    cartItems[productName] = { price: productPrice, quantity: 0 };
  }

  cartItems[productName].quantity += quantityChange;


  if (cartItems[productName].quantity <= 0) {
    delete cartItems[productName];
  }
  const cartTotalSum = cart.querySelector('.total-sum');
  cartTotalSum.textContent = `${totalSum}`;
  console.log(cartTotalSum);
  renderCart(); 
}

function renderCart() {
  cartItemsContainer.innerHTML = ''; 

  const cartEntries = Object.entries(cartItems); 

  if (cartEntries.length === 0) {
    noItemMessage.style.display = 'flex';
    
  } else {
    noItemMessage.style.display = 'none';
    cartEntries.forEach(([name, { price, quantity }]) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-create');
      cartItem.innerHTML = `
        <div class="cartItem-info">
          <h4>${name}</h4>
          <div>
            <span>${quantity} x $${price.toFixed(2)}</span>
            <span>$${(price * quantity).toFixed(2)}</span>
          </div>
        </div>
        <button class="remove-cart-item">x</button>
      `;

      
      const removeButton = cartItem.querySelector('.remove-cart-item');
      removeButton.addEventListener('click', () => {
        delete cartItems[name];
        renderCart();
      });

      cartItemsContainer.appendChild(cartItem);

      const cartItemDivider = document.createElement('hr');
      cartItemsContainer.appendChild(cartItemDivider);
    });
  }
}
