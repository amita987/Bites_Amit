/* ==========================================================
   MENU TABLE GENERATION

   Generates the restaurant menu dynamically from menu-data.js
   ========================================================== */

const menuContainer = document.getElementById("menu-container");

menuData.forEach(category => {

    let html = `
        <h2>${category.category}</h2>

        <table border="1" cellpadding="10" cellspacing="0" width="100%">

            <tr>
                <th>S.No</th>
                <th>Image</th>
                <th>Item</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Final Price</th>
                <th>Quantity</th>
                <th>Add to Cart</th>
            </tr>
    `;

    category.items.forEach(item => {

        const finalPrice =
            item.price - (item.price * item.discount / 100);

        html += `

        <tr>

            <td>${item.id}</td>

            <td>
                <img src="${item.image}" width="80">
            </td>

            <td>${item.name}</td>

            <td>₹${item.price}</td>

            <td>
                <span class="discount-badge">
                    ${item.discount}% OFF
                </span>
            </td>

            <td>₹${finalPrice}</td>

            <td>

                <button class="qty-btn" onclick="decreaseMenuQuantity(this)">−</button>

                <span class="quantity">1</span>

                <button class="qty-btn" onclick="increaseMenuQuantity(this)">+</button>

            </td>

            <td>

                <button
                   class="cart-btn"
                   onclick="addToCart(this)">
               
                   🛒 Add to Cart
               
               </button>

            </td>

        </tr>

        `;

    });

    html += "</table><br><br>";

    menuContainer.innerHTML += html;

});


/* ==========================================================
   QUANTITY FUNCTIONS

   Handles the + and − quantity buttons.
   ========================================================== */

function increaseMenuQuantity(button){

    const quantity =
        button.parentElement.querySelector(".quantity");

    quantity.textContent =
        Number(quantity.textContent) + 1;

}


function decreaseMenuQuantity(button){

    const quantity =
        button.parentElement.querySelector(".quantity");

    let value = Number(quantity.textContent);

    if(value > 1){

        quantity.textContent = value - 1;

    }

}




