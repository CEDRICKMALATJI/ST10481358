// =========================
// ENQUIRY FORM
// =========================

const forms = document.querySelectorAll("form");

forms.forEach(function(form) {

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        alert("Thank you! Your message has been received.");

        form.reset();

    });

});
let cart = [];

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${item.name}</strong>
            - R${item.price.toFixed(2)}

            <button onclick="decreaseQuantity(${index})">−</button>

            ${item.quantity}

            <button onclick="increaseQuantity(${index})">+</button>

            <button onclick="removeItem(${index})">
                Remove
            </button>

            <br>
            Subtotal: R${itemTotal.toFixed(2)}
        `;

        cartItems.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
}

function increaseQuantity(index) {
    cart[index].quantity++;
    displayCart();
}

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    displayCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    displayCart();
}

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty. Please add a product first.");
        return;
    }

    let order = "Your Order:\n\n";

    cart.forEach(item => {
        order += `${item.name} x ${item.quantity}\n`;
    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    order += `\nTotal: R${total.toFixed(2)}`;

    alert(order + "\n\nThank you for ordering from Metswako's Delicious Corner!");

    cart = [];
    displayCart();
}