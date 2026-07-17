let order =
JSON.parse(localStorage.getItem("latestOrder"));



let container =
document.getElementById("order-details");



if(order){


container.innerHTML = `


<h3>
Order ID:
${order.orderId}
</h3>


<p>
Customer:
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


<h3>
Total:
₹${order.total}
</h3>


<p>
Status:
${order.status}
</p>


`;


}
