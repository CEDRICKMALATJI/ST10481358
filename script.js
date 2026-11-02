
"use strict";

// ======================================
// METSWAKO'S DELICIOUS CORNER
// MAIN JAVASCRIPT FILE
// ======================================


// ======================================
// 1. ENQUIRY AND CONTACT FORMS
// ======================================

document.querySelectorAll("form").forEach(function(form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        alert("Thank you! Your message has been received.");

        form.reset();
    });
});


// ======================================
// 2. SHOPPING CART
// ======================================

let cart = [];

function addToCart(name, price) {
    const existingItem = cart.find(function(item) {
        return item.name === name;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: Number(price),
            quantity: 1
        });
    }

    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(function(item, index) {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${item.name}</strong>
            - R${item.price.toFixed(2)}

            <button type="button"
                onclick="decreaseQuantity(${index})">−</button>

            ${item.quantity}

            <button type="button"
                onclick="increaseQuantity(${index})">+</button>

            <button type="button"
                onclick="removeItem(${index})">Remove</button>

            <br>
            Subtotal: R${itemTotal.toFixed(2)}
        `;

        cartItems.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
}

function increaseQuantity(index) {
    if (cart[index]) {
        cart[index].quantity++;
        displayCart();
    }
}

function decreaseQuantity(index) {
    if (cart[index]) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }

        displayCart();
    }
}

function removeItem(index) {
    if (cart[index]) {
        cart.splice(index, 1);
        displayCart();
    }
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add a product first.");
        return;
    }

    let order = "Your Order:\n\n";

    cart.forEach(function(item) {
        order += item.name + " x " + item.quantity + "\n";
    });

    const total = cart.reduce(function(sum, item) {
        return sum + item.price * item.quantity;
    }, 0);

    order += "\nTotal: R" + total.toFixed(2);

    alert(
        order +
        "\n\nThank you for ordering from Metswako's Delicious Corner!"
    );

    cart = [];
    displayCart();
}


// ======================================
// 3. IMAGE LIGHTBOX
// ======================================

function openLightbox(imageSrc) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");

    if (!lightbox || !lightboxImage) {
        console.error("Lightbox elements could not be found.");
        return;
    }

    // Keep the lightbox directly inside the body
    document.body.appendChild(lightbox);

    // Set the enlarged image
    lightboxImage.src = imageSrc;

    // Force full-screen positioning and centring
    lightbox.style.setProperty("display", "flex", "important");
    lightbox.style.setProperty("position", "fixed", "important");
    lightbox.style.setProperty("inset", "0", "important");
    lightbox.style.setProperty("width", "100vw", "important");
    lightbox.style.setProperty("height", "100vh", "important");
    lightbox.style.setProperty("z-index", "999999", "important");
    lightbox.style.setProperty("justify-content", "center", "important");
    lightbox.style.setProperty("align-items", "center", "important");
    lightbox.style.setProperty("background", "rgba(0, 0, 0, 0.92)", "important");

    // Centre and resize the enlarged image
    lightboxImage.style.setProperty("display", "block", "important");
    lightboxImage.style.setProperty("max-width", "90vw", "important");
    lightboxImage.style.setProperty("max-height", "85vh", "important");
    lightboxImage.style.setProperty("width", "auto", "important");
    lightboxImage.style.setProperty("height", "auto", "important");
    lightboxImage.style.setProperty("object-fit", "contain", "important");
    lightboxImage.style.setProperty("margin", "auto", "important");
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");

    if (lightbox) {
        lightbox.style.setProperty("display", "none", "important");
    }
}

// Close when clicking outside the enlarged image
document.addEventListener("click", function(event) {
    const lightbox = document.getElementById("lightbox");

    if (lightbox && event.target === lightbox) {
        closeLightbox();
    }
});

// Close when pressing Escape
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeLightbox();
    }
});


// ======================================
// 4. INITIALISE WEBSITE
// ======================================

document.addEventListener("DOMContentLoaded", function() {
    displayCart();
});
