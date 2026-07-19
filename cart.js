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
    
   const itemId = Number(row.cells[0].textContent);
    const itemName = row.cells[2].textContent;
    const price = row.cells[3].textContent;
    const discount = row.cells[4].textContent;
    const finalPrice = row.cells[5].textContent;
    const quantity =
        Number(row.querySelector(".quantity").textContent);

    // Create shopping cart object

   /* ==========================================================
      CART ITEM
   
      PURPOSE:
      Stores both:
   
      - Current menu values
      - Purchased values
   
      Purchased values are copied into the order so
      historical invoices remain accurate.
   
   ========================================================== */

   const item = {
   
       id: itemId,
   
       name: itemName,
   
       quantity: quantity,
   
       price: price,
   
       discount: discount,
   
       finalPrice: finalPrice,
   
       purchasedPrice: Number(price.replace("₹","")),
   
       purchasedDiscount: Number(discount.replace("% OFF","")),
   
       purchasedFinalPrice: Number(finalPrice.replace("₹",""))
   
   };


    /* ==========================================================
       UPDATE EXISTING ITEM

       If the item already exists, increase its quantity.
       ========================================================== */

    const existingItem =

         cart.find(cartItem => cartItem.id === item.id);

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
      
          /* ==========================================================
             RESET CART SUMMARY
      
             PURPOSE:
             Clears all totals when no items remain.
          ========================================================== */
      
          const subtotal = document.getElementById("subtotal");
          const discount = document.getElementById("discount");
          const delivery = document.getElementById("delivery");
          const grandTotal = document.getElementById("grand-total");
      
          if(subtotal){
      
              subtotal.textContent = "0";
              discount.textContent = "0";
              delivery.textContent = "0";
              grandTotal.textContent = "0";
      
          }
      
          /* ==========================================================
             HIDE CHECKOUT BUTTON
      
             PURPOSE:
             Prevent checkout when cart is empty.
          ========================================================== */
      
          const checkoutButton =
          document.querySelector(
              'button[onclick="goToCheckout()"]'
          );
      
          if(checkoutButton){
      
              checkoutButton.style.display = "none";
      
          }
      
          return;
      
      }


/* ==========================================================
   SHOW CHECKOUT BUTTON

   PURPOSE:
   Displays the checkout button whenever
   the cart contains items.
========================================================== */

const checkoutButton =
document.querySelector(
    'button[onclick="goToCheckout()"]'
);

if(checkoutButton){

    checkoutButton.style.display = "";

}

   
    let table = `

    <table border="1">

        <tr>

            <th>Item ID</th>

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

            
            <td>${item.id}</td>

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

calculateSummary();

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


   /* ==========================================================
      LOAD CART PAGE
      ========================================================== */
   
   displayCart();
   
   calculateSummary();


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



   /* ==========================================================
      LOAD CART PAGE
      ========================================================== */
   
   displayCart();
   
   calculateSummary();


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



   /* ==========================================================
      LOAD CART PAGE
      ========================================================== */
   
   displayCart();
   
   calculateSummary();


}

/* ==========================================================
   CART SUMMARY
   ========================================================== */


function calculateSummary(){


    let subtotal = 0;


    cart.forEach(function(item){


        let price =
        Number(item.finalPrice.replace("₹",""));


        subtotal += price * item.quantity;


    });



   /* ==========================================================
      CALCULATE TOTAL SAVINGS
   
      PURPOSE:
      Shows how much the customer saved because of
      menu item discounts.
   
   ========================================================== */
   
   let savedOnOrder = 0;
   
   cart.forEach(function(item){
   
       const originalPrice =
       Number(item.price.replace("₹",""));
   
       const finalPrice =
       Number(item.finalPrice.replace("₹",""));
   
       savedOnOrder +=
       (originalPrice - finalPrice) * item.quantity;
   
   });

      /* ==========================================================
      DELIVERY CHARGES
   
      PURPOSE:
      No delivery charge when the cart is empty.
   
   ========================================================== */
   
   let delivery = 0;
   
   if(cart.length > 0){
   
       delivery = 40;
   
   }



    let grandTotal =
    subtotal + delivery;



    const subtotalBox =
    document.getElementById("subtotal");


    if(subtotalBox){


        subtotalBox.textContent = subtotal;


        document.getElementById("discount").textContent =
         savedOnOrder;

       document.getElementById(
         "saved-highlight"
         ).textContent = savedOnOrder;


        document.getElementById("delivery").textContent = delivery;


        document.getElementById("grand-total").textContent = grandTotal;

         /* ==========================================================
            SHOW / HIDE CART BUTTONS
         
            PURPOSE:
            Hide Checkout and Clear Cart when cart is empty.
         
         ========================================================== */
         
         const checkoutButton =
         document.querySelector(
         '#cart-buttons button:first-child'
         );
         
         const clearCartButton =
         document.getElementById(
         "clear-cart-btn"
         );
         
         if(cart.length === 0){
         
             checkoutButton.style.display = "none";
         
             clearCartButton.style.display = "none";
         
         }
         else{
         
             checkoutButton.style.display = "";
         
             clearCartButton.style.display = "";
         
         }


    }


}

/* ==========================================================
   CONNECT CART BUTTON
   ========================================================== */


function goToCheckout(){

    window.location.href="checkout.html";

}



/* ==========================================================
   CANCEL

   PURPOSE:
   Returns the customer to the menu.

   IMPORTANT:
   Does NOT clear the cart.

========================================================== */

function continueShopping(){

    window.location.href = "menu.html";

}

/* ==========================================================
   CLEAR CART

   PURPOSE:
   Removes all items from the shopping cart.

========================================================== */

function clearCart(){

    if(!confirm("Clear the entire cart?")){

        return;

    }

    cart = [];

    localStorage.removeItem("cart");

    updateCartCount();

    displayCart();

    calculateSummary();

}





