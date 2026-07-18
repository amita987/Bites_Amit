/* ==========================================================
   FILE : admin-orders.js

   PURPOSE:
   Displays all customer orders.

   ========================================================== */
/* ==========================================================
   ORDER TABLE SORTING

   PURPOSE:
   Stores which column is currently sorted.

   ========================================================== */

let orderSort = {

    column: "",

    direction: "asc"

};

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
      
      
      /* ==========================================================
         SORT ORDERS
      
         ========================================================== */
      
      orders.sort(compareOrders);


    if(orders.length === 0){

        container.innerHTML =

        "<h3>No Orders Found</h3>";

        return;

    }



   let table = `
   
   <!-- ==========================================================
        ORDER SEARCH
   
        PURPOSE:
        Search orders by:
        - Order ID
        - Customer Name
        - Mobile Number
        - Status
   
        ========================================================== -->
   
   <label>
   
   🔍 Search Orders:
   
   </label>
   
   <input
   
   type="text"
   
   id="orderSearch"
   
   placeholder="Search Order ID, Customer, Mobile..."
   
   onkeyup="searchOrders()"
   
   >
   
   <br><br>
   
   <table border="1" width="100%">
   
   <tr>

        <th>Action</th>

         <th
         style="cursor:pointer;"
         onclick="sortOrders('orderId')"
         >
         
         Order ID ▲▼
         
         </th>
         
         
         <th
         style="cursor:pointer;"
         onclick="sortOrders('orderDate')"
         >
         
         Date ▲▼
         
         </th>
         
         
         <th>
         
         Time
         
         </th>
         
         
         <th
         style="cursor:pointer;"
         onclick="sortOrders('customer')"
         >
         
         Customer ▲▼
         
         </th>
         
         
         <th>
         
         Mobile
         
         </th>
         
         
         <th
         style="cursor:pointer;"
         onclick="sortOrders('total')"
         >
         
         Total ▲▼
         
         </th>
         
         
         <th
         style="cursor:pointer;"
         onclick="sortOrders('status')"
         >
         
         Status ▲▼
         
         </th>

    </tr>

    `;


    orders.forEach(function(order){

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


/* ==========================================================
   SEARCH ORDERS

   PURPOSE:
   Filters the order table while typing.

   ========================================================== */

function searchOrders(){

    const searchValue =
    document.getElementById("orderSearch")
    .value
    .toLowerCase();

    const table =
    document.querySelector("#admin-orders-container table");

    const rows =
    table.getElementsByTagName("tr");

    for(let i = 1; i < rows.length; i++){

        const rowText =
        rows[i].innerText.toLowerCase();

        if(rowText.includes(searchValue)){

            rows[i].style.display = "";

        }
        else{

            rows[i].style.display = "none";

        }

    }

}


/* ==========================================================
   SORT ORDERS

   PURPOSE:
   Changes Ascending ↔ Descending.

   ========================================================== */

function sortOrders(column){

    if(orderSort.column === column){

        orderSort.direction =

        orderSort.direction === "asc"

        ?

        "desc"

        :

        "asc";

    }

    else{

        orderSort.column = column;

        orderSort.direction = "asc";

    }

    displayOrders();

}


/* ==========================================================
   COMPARE ORDERS

   PURPOSE:
   Used by JavaScript sort() to compare
   two orders.

   ========================================================== */

function compareOrders(a, b){

    if(orderSort.column === ""){

        return 0;

    }

    let valueA;

    let valueB;

    switch(orderSort.column){

        case "orderId":

            valueA = a.orderId;

            valueB = b.orderId;

            break;

        case "orderDate":

            valueA = a.orderDate || "";

            valueB = b.orderDate || "";

            break;

        case "customer":

            valueA = a.customer.name.toLowerCase();

            valueB = b.customer.name.toLowerCase();

            break;

        case "total":

            valueA = a.total;

            valueB = b.total;

            break;

        case "status":

            valueA = a.status.toLowerCase();

            valueB = b.status.toLowerCase();

            break;

        default:

            return 0;

    }

    if(valueA < valueB){

        return orderSort.direction === "asc"

        ? -1

        : 1;

    }

    if(valueA > valueB){

        return orderSort.direction === "asc"

        ? 1

        : -1;

    }

    return 0;

}


console.log("admin-orders.js loaded");
console.log(typeof compareOrders);



