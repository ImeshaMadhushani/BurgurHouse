// Initialize an empty cart array
let cart = [];

// Function to add an item to the cart
function addToCart(item) {
    // Check if the item already exists in the cart
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item exists
    } else {
        cart.push({ ...item, quantity: 1 }); // Add new item with quantity 1
    }
    updateCartDisplay(); // Update the cart display
}

// Function to update the cart display
function updateCartDisplay() {
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = ''; // Clear the cart container

    cart.forEach(cartItem => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        cartItemDiv.innerHTML = `
            <img src="${cartItem.image}" alt="${cartItem.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
            <div class="cart-item-details">
                <h2>${cartItem.name}</h2>
                <p>Price: $${cartItem.price}</p>
                <p>Quantity: ${cartItem.quantity}</p>
                <button class="remove-button">Remove</button>
            </div>
        `;

        cartContainer.appendChild(cartItemDiv);

        // Add event listener to the "Remove" button
        const removeButton = cartItemDiv.querySelector('.remove-button');
        removeButton.addEventListener('click', () => removeFromCart(cartItem));
    });

    // Update the total price
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.querySelector('.cart-total h2').textContent = `Total: $${total.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeFromCart(item) {
    cart = cart.filter(cartItem => cartItem.name !== item.name); // Remove the item
    updateCartDisplay(); // Update the cart display
}

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll('.addcart').forEach(button => {
    button.addEventListener('click', () => {
        const menuItem = button.closest('.menu-item'); // Get the parent menu item
        const item = {
            name: menuItem.querySelector('h4').textContent,
            price: parseFloat(menuItem.querySelector('.price').textContent.replace('$', '')),
            image: menuItem.querySelector('img').src
        };
        addToCart(item); // Add the item to the cart
    });
});