/* ==========================================================
   FILE: cart.js

   PURPOSE:
   Handles all shopping cart functionality.

   FEATURES:
   - Load cart from browser
   - Add items to cart
   - Merge duplicate items
   - Save cart
   - Update cart counter
   ========================================================== */


/* ==========================================================
   SHOPPING CART

   Loads the shopping cart from the browser.
   If nothing is saved, an empty cart is created.
   ========================================================== */

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


/* ==========================================================
   ADD TO CART

   Adds the selected menu item into the shopping cart.
   ========================================================== */

function addToCart(button){

    // Find the current row
    const row = button.closest("tr");

    // Read values from the table
    const serialNumber = row.cells[0].textContent;
    const itemName = row.cells[2].textContent;
    const price = row.cells[3].textContent;
    const discount = row.cells[4].textContent;
    const finalPrice = row.cells[5].textContent;
    const quantity =
        Number(row.querySelector(".quantity").textContent);

    // Create shopping cart object
    const item = {

        serialNumber: serialNumber,
        name: itemName,
        price: price,
        discount: discount,
        finalPrice: finalPrice,
        quantity: quantity

    };


    /* ==========================================================
       UPDATE EXISTING ITEM

       If the item already exists, increase its quantity.
       ========================================================== */

    const existingItem =
        cart.find(cartItem => cartItem.name === item.name);

    if(existingItem){

        existingItem.quantity += quantity;

    }
    else{

        cart.push(item);

    }


    /* ==========================================================
       SAVE SHOPPING CART

       Saves the latest shopping cart into the browser.
       ========================================================== */

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );


    /* ==========================================================
       UPDATE CART COUNTER
       ========================================================== */

    updateCartCount();

    console.log(cart);

    alert(itemName + " added to cart.");

}


/* ==========================================================
   UPDATE CART COUNTER

   Displays the total number of unique items.
   ========================================================== */

function updateCartCount(){

    const cartCount =
        document.getElementById("cart-count");

    if(cartCount){

        cartCount.textContent =
            "(" + cart.length + ")";

    }

}


/* ==========================================================
   INITIALIZE CART

   Updates the cart counter when the page loads.
   ========================================================== */

updateCartCount();
