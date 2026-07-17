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


/* ==========================================================
   DISPLAY CART ITEMS

   Reads shopping cart data and displays it
   inside cart.html
   ========================================================== */


function displayCart(){

    const cartContainer =
        document.getElementById("cart-container");


    // Run only on cart page
    if(!cartContainer){

        return;

    }


    // If cart is empty
    if(cart.length === 0){

        cartContainer.innerHTML =
        `
        <h3>Your cart is empty</h3>
        `;

        return;

    }


    let table = `

    <table border="1">

        <tr>

            <th>S.No</th>

            <th>Item</th>

            <th>Price</th>

            <th>Qty</th>

            <th>Total</th>

            <th>Remove</th>

        </tr>

    `;


    cart.forEach(function(item,index){


        let total =
            Number(item.finalPrice.replace("₹",""))
            *
            item.quantity;


        table +=

        `

        <tr>

            <td>${index + 1}</td>

            <td>${item.name}</td>

            <td>${item.finalPrice}</td>


            <td>
            
            <button onclick="decreaseQuantity(${index})">
            -
            </button>
            
            
            ${item.quantity}
            
            
            <button onclick="increaseQuantity(${index})">
            +
            </button>
            
            </td>

            <td>₹${total}</td>

            <td>
            
            <button onclick="removeFromCart(${index})">
            
            ❌
            
            </button>
            
            </td>

        </tr>

        `;


    });


    table +=

    `

    </table>

    `;


    cartContainer.innerHTML = table;


}


/* ==========================================================
   LOAD CART PAGE
   ========================================================== */

displayCart();

/* ==========================================================
   REMOVE ITEM FROM CART
   ========================================================== */

function removeFromCart(index){


    cart.splice(index,1);


    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );


    updateCartCount();


    displayCart();


}

/* ==========================================================
   INCREASE QUANTITY
   ========================================================== */

function increaseQuantity(index){


    cart[index].quantity++;


    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );


    displayCart();


}


/* ==========================================================
   DECREASE QUANTITY
   ========================================================== */

function decreaseQuantity(index){


    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }


    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );


    displayCart();


}









