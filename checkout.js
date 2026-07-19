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


   /* ==========================================================
      CALCULATE TOTAL SAVINGS
   
      PURPOSE:
      Shows how much the customer saved from menu discounts.
   ========================================================== */
   
   let savedOnOrder = 0;
   
   checkoutCart.forEach(function(item){
   
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
      Uses the delivery charge saved by the admin.
      No delivery charge is applied when there are
      no items in the checkout.
   
   ========================================================== */
   
   let delivery = 0;
   
   if(checkoutCart.length > 0){
   
       delivery =
   
           Number(
   
               localStorage.getItem(
   
                   "restaurantDeliveryCharge"
   
               )
   
           ) || 0;
   
   }
   

   /* ==========================================================
      TAX CALCULATION
   
      PURPOSE:
      Calculates the restaurant tax using the
      current tax percentage saved by the admin.
   
      This tax is shown to the customer and
      becomes part of the final amount payable.
   
   ========================================================== */
   
   let taxPercentage =
   
       Number(
   
           localStorage.getItem(
   
               "restaurantTax"
   
           )
   
       ) || 0;
   
   
   /* ==========================================================
      TAX AMOUNT
   
      PURPOSE:
      Calculates the tax on the food subtotal only.
   
   ========================================================== */
   
   let taxAmount =
   
       Math.round(
   
           subtotal
   
           *
   
           taxPercentage
   
           / 100
   
       );
   
   
   /* ==========================================================
      GRAND TOTAL
   
      PURPOSE:
      Final amount payable by the customer.
   
      Formula:
   
      Subtotal
      + Delivery
      + Tax
   
   ========================================================== */
   
   let grandTotal =
   
       subtotal
   
       +
   
       delivery
   
       +
   
       taxAmount;



    itemsBox.innerHTML = html;



    document.getElementById("checkout-subtotal").textContent = subtotal;


    document.getElementById("checkout-discount").textContent = savedOnOrder;


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
      ORDER TOTALS SNAPSHOT
   
      PURPOSE:
      Stores the checkout totals exactly as shown to the customer.
      These values remain unchanged even if menu prices,
      discounts or delivery charges are changed later.
   
   ========================================================== */
   
   let subtotal =
   
   Number(
   
       document.getElementById(
   
           "checkout-subtotal"
   
       ).textContent
   
   );
   
   let discount =
   
   Number(
   
       document.getElementById(
   
           "checkout-discount"
   
       ).textContent
   
   );
   
   let delivery =
   
   Number(
   
       document.getElementById(
   
           "checkout-delivery"
   
       ).textContent
   
   );
      /* ==========================================================
      TAX SNAPSHOT
   
      PURPOSE:
      Stores the restaurant tax percentage and the
      tax amount charged when the customer places
      the order.
   
      This ensures future tax changes never affect
      historical orders.
   
   ========================================================== */
   
   let taxPercentage =
   
   Number(
   
       localStorage.getItem(
   
           "restaurantTax"
   
       )
   
   ) || 0;
   
   
   let taxAmount =
   
   Math.round(
   
       subtotal
   
       *
   
       taxPercentage
   
       / 100
   
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

         /* ==========================================================
            ORDER TOTAL SNAPSHOT
         
            PURPOSE:
            Stores the financial details exactly as they
            appeared when the customer placed the order.
         
            These values never change even if the
            restaurant updates tax, delivery charges,
            menu prices or discounts later.
         
         ========================================================== */
         
         subtotal: subtotal,
         
         discount: discount,
         
         delivery: delivery,
         
         taxPercentage: taxPercentage,
         
         taxAmount: taxAmount,
         
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





