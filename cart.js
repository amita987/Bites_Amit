/* ==========================================================
   SAVE SHOPPING CART

   Saves the latest cart into the browser.
   ========================================================== */

localStorage.setItem(

    "cart",

    JSON.stringify(cart)

);

updateCartCount();

console.log(cart);

alert(itemName + " added to cart.");

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
   
      If the item already exists in the shopping cart,
      increase its quantity instead of creating a duplicate.
      ========================================================== */
   
   const existingItem = cart.find(cartItem =>
       cartItem.name === item.name
   );
   
   if(existingItem){
   
       existingItem.quantity += quantity;
   
   }
   else{
   
       cart.push(item);
   
   }
   

   /* ==========================================================
      CART COUNTER
   
      Updates the number displayed beside the Cart menu.
      ========================================================== */
   
   updateCartCount();
   
   console.log(cart);
   
   alert(itemName + " added to cart.");

}


/* ==========================================================
   UPDATE CART COUNTER

   Displays the total number of unique items in the cart.
   ========================================================== */

function updateCartCount(){

    const cartCount =
        document.getElementById("cart-count");

    if(cartCount){

        cartCount.textContent = "(" + cart.length + ")";

    }

}


/* ==========================================================
   INITIALIZE CART

   Updates the cart counter when the page loads.
   ========================================================== */

updateCartCount();








