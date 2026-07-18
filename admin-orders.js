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



