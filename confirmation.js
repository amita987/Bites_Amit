let order =
JSON.parse(localStorage.getItem("latestOrder"));



let container =
document.getElementById("order-details");



if(order){



let itemsHTML = "";



order.items.forEach(function(item){


    let price =
    Number(item.finalPrice.replace("₹",""));


    let total =
    price * item.quantity;



    itemsHTML += `

    <p>

    ${item.name}

    x

    ${item.quantity}

    =

    ₹${total}

    </p>


    `;


});




container.innerHTML = `


<h2>
🎉 Order Confirmed!
</h2>


<h3>
Order ID:
${order.orderId}
</h3>



<h3>
Customer Details
</h3>


<p>
Name:
${order.customer.name}
</p>


<p>
Mobile:
${order.customer.mobile}
</p>


<p>
Address:
${order.customer.address}
</p>


<p>
Payment:
${order.customer.payment}
</p>


<!-- ==========================================================
     ORDER TYPE

     PURPOSE:
     Displays how the customer chose to receive
     the order.

     Possible values:

     🍽️ Dine In
     🛍️ Customer Take Away
     🚚 Home Delivery

========================================================== -->

<p>
Order Type:
${order.orderType || "🚚 Home Delivery"}
</p>



<h3>
Order Items
</h3>


${itemsHTML}



<h3>
Total Amount:
₹${order.total}
</h3>



<h3>
Status:
🟡 ${order.status}
</h3>



`;



}
