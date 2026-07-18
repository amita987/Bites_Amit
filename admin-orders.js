/* ==========================================================
   FILE : admin-orders.js

   PURPOSE:
   Displays all customer orders.

   ========================================================== */


displayOrders();


function displayOrders(){


    const container =

    document.getElementById(

        "admin-orders-container"

    );


    let orders =

    JSON.parse(

        localStorage.getItem("orders")

    ) || [];


    if(orders.length === 0){

        container.innerHTML =

        "<h3>No Orders Found</h3>";

        return;

    }


    let table = `

    <table border="1" width="100%">

    <tr>

        <th>Action</th>

        <th>Order ID</th>

        <th>Date</th>

        <th>Time</th>

        <th>Customer</th>

        <th>Mobile</th>

        <th>Total</th>

        <th>Status</th>

    </tr>

    `;


    orders.forEach(function(order,index){

        table += `

        <tr>

            <td>

            <button>

            👁

            </button>

            </td>

            <td>${order.orderId}</td>

            <td>${order.orderDate || "-"}</td>

            <td>${order.orderTime || "-"}</td>

            <td>${order.customer.name}</td>

            <td>${order.customer.mobile}</td>

            <td>₹${order.total}</td>

            <td>${order.status}</td>

        </tr>

        `;

    });


    table += "</table>";


    container.innerHTML = table;

}
