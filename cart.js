/* ==========================================================
   SHOPPING CART

   Stores items selected by the customer.
   ========================================================== */

let cart = [];


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
   
   console.log(cart);
   
   alert(itemName + " added to cart.");

}
