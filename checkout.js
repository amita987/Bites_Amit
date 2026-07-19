/* ==========================================================
   LOAD CHECKOUT SUMMARY
   ========================================================== */


let checkoutCart =
JSON.parse(localStorage.getItem("cart")) || [];



function loadCheckoutSummary(){


    const itemsBox =
    document.getElementById("checkout-items");


    if(!itemsBox){

        return;

    }



    let subtotal = 0;


    let html = "";



    checkoutCart.forEach(function(item){


        let price =
        Number(item.finalPrice.replace("₹",""));


        let total =
        price * item.quantity;



        subtotal += total;



        html += `

        <p>

        ${item.name}
        x
        ${item.quantity}

        =
        ₹${total}

        </p>

        `;


    });



    let discount = 0;


    if(subtotal >= 500){

        discount = 50;

    }



    let delivery = 40;



    let grandTotal =
    subtotal - discount + delivery;



    itemsBox.innerHTML = html;



    document.getElementById("checkout-subtotal").textContent = subtotal;


    document.getElementById("checkout-discount").textContent = discount;


    document.getElementById("checkout-delivery").textContent = delivery;


    document.getElementById("checkout-total").textContent = grandTotal;


}



loadCheckoutSummary();


function placeOrder(){


    let name =
    document.getElementById("customer-name").value;


    let mobile =
    document.getElementById("mobile").value;


    let address =
    document.getElementById("address").value;

   let payment =
   document.querySelector(
   'input[name="payment"]:checked'
   ).value;



    if(name==="" || mobile==="" || address===""){


        alert("Please fill all required details");

        return;

    }



    let total =
    Number(
        document.getElementById("checkout-total").textContent
    );



   /* ==========================================================
      GENERATE UNIQUE ORDER ID
   
      PURPOSE:
      Generates sequential Order IDs.
   
      Example:
   
      BA1001
      BA1002
      BA1003
   
      ========================================================== */
   
   let lastOrderId =
   
   Number(
   
   localStorage.getItem("lastOrderId")
   
   ) || 1000;
   
   
   lastOrderId++;
   
   
   localStorage.setItem(
   
   "lastOrderId",
   
   lastOrderId
   
   );
   
   
   let orderId =
   
   "BA" + lastOrderId;


   /* ==========================================================
      ORDER DATE & TIME
   
      PURPOSE:
      Stores when the customer placed the order.
   
      ========================================================== */
   
   const now = new Date();
   
   
   const orderDate =
   
   now.toLocaleDateString(
   
   "en-GB",
   
   {
   
   day: "2-digit",
   
   month: "short",
   
   year: "numeric"
   
   }
   
   );
   
   
   const orderTime =
   
   now.toLocaleTimeString(
   
   "en-IN",
   
   {
   
   hour: "2-digit",
   
   minute: "2-digit",
   
   hour12: true
   
   }
   
   );
   
   
   let order = {
   
   
       orderId: orderId,
   
   
       orderDate: orderDate,
   
   
       orderTime: orderTime,
   
   
       customer:{
   
   
           name:name,
   
           mobile:mobile,
   
           address:address,
   
           payment:payment
   
   
       },

      /* ==========================================================
         ORDER ITEM SNAPSHOT
      
         PURPOSE:
         Creates a permanent copy of the purchased item details.
      
         This ensures future menu price changes never affect
         historical orders.
      
      ========================================================== */
      
      items: checkoutCart.map(function(item){
      
          return {
      
              id: item.id,
      
              name: item.name,
      
              quantity: item.quantity,
      
              purchasedPrice: item.purchasedPrice,
      
              purchasedDiscount: item.purchasedDiscount,
      
              purchasedFinalPrice: item.purchasedFinalPrice
      
          };
      
      }),
   
   
       total: total,
   
   
       status:"Preparing Food"
   
   
   };



   /* ==========================================================
      SAVE ORDER
   
      PURPOSE:
      Saves the latest order for the confirmation page
      and stores all orders for Admin Order Management.
   
      ========================================================== */
   
   /* Save latest order */
   
   localStorage.setItem(
   
       "latestOrder",
   
       JSON.stringify(order)
   
   );
   
   
   /* Load existing orders */
   
   let allOrders =
   
   JSON.parse(
   
   localStorage.getItem("orders")
   
   ) || [];
   
   
   /* Add new order */
   
   allOrders.push(order);
   
   
   /* Save all orders */
   
   localStorage.setItem(
   
       "orders",
   
       JSON.stringify(allOrders)
   
   );



    localStorage.removeItem("cart");



    window.location.href =
    "order-confirmation.html";


}



/* ==========================================================
   BACK TO CHECKOUT

   PURPOSE:
   Returns the customer to the CHECK OUT page (shopping cart) without
   changing any cart contents.

   ========================================================== */

function backToCheckout(){

    window.location.href = "cart.html";

}





