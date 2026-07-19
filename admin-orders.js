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
            /* ==========================================================
               VIEW ORDER BUTTON
            
               PURPOSE:
               Opens the Order Details popup for the selected order.
            
               ========================================================== */

        table += `

        <tr>


            
            <td>
            
                <button
            
                    onclick="viewOrder('${order.orderId}')"
            
                    title="View Order"
            
                >
            
                    👁
            
                </button>
            
            </td>

            <td>${order.orderId}</td>

            <td>${order.orderDate || "-"}</td>

            <td>${order.orderTime || "-"}</td>

            <td>${order.customer?.name || "-"}</td>
            
            <td>${order.customer?.mobile || "-"}</td>

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


/* ==========================================================
   VIEW ORDER

   PURPOSE:
   Opens the Order Details popup and displays
   the selected order information.

   ========================================================== */

function viewOrder(orderId){

    /* ----------------------------------------------------------
       Get all saved orders
    ---------------------------------------------------------- */

    const orders =

        JSON.parse(
            localStorage.getItem("orders")
        ) || [];

    /* ----------------------------------------------------------
       Find the selected order
    ---------------------------------------------------------- */

    const order =

        orders.find(function(item){

            return item.orderId === orderId;

        });

    if(!order){

        alert("Order not found.");

        return;

    }

    /* ----------------------------------------------------------
       Get popup elements
    ---------------------------------------------------------- */

    const modal =

        document.getElementById(
            "order-details-modal"
        );

    const content =

        document.getElementById(
            "order-details-content"
        );



   /* ----------------------------------------------------------
      Build Ordered Items Table
   ---------------------------------------------------------- */
   
   let itemsTable = "";
   
   if(order.items && order.items.length > 0){
   
       itemsTable = `
   
           <table width="100%" border="1">
   
               <tr>
   
                   <th>Item</th>
   
                   <th>Qty</th>
   
                   <th>Price</th>
   
                   <th>Subtotal</th>
   
               </tr>
   
       `;
   
       order.items.forEach(function(item){
   
           itemsTable += `
   
               <tr>
   
                   <td>${item.name}</td>
   
                   <td>${item.quantity}</td>
   
                   <td>₹${item.price}</td>
   
                   <td>₹${item.quantity * item.price}</td>
   
               </tr>
   
           `;
   
       });
   
       itemsTable += "</table>";
   
   }
   else{
   
       itemsTable = "<p>No items found.</p>";
   
   }
   
   

   /* ----------------------------------------------------------
      Display Order Details
   ---------------------------------------------------------- */
   
   content.innerHTML = `
   
       <div class="order-invoice">
   
           <h2 style="text-align:center;color:#8B0000;">
   
               🍽️ Bite Amit Restaurant
   
           </h2>
   
           <hr>
   
           <h3>Order Information</h3>
   
           <p><strong>Order ID :</strong> ${order.orderId}</p>
   
           <p><strong>Date :</strong> ${order.orderDate || "-"}</p>
   
           <p><strong>Time :</strong> ${order.orderTime || "-"}</p>
   
           <hr>
   
           <h3>Customer Information</h3>
   
           <p><strong>Name :</strong> ${order.customer?.name || "-"}</p>
   
           <p><strong>Mobile :</strong> ${order.customer?.mobile || "-"}</p>
   
           <hr>
   
           <h3>Ordered Items</h3>
   
           ${itemsTable}
   
           <hr>
   
           <h3 style="color:#8B0000;">
   
               Grand Total : ₹${order.total}
   
           </h3>
   

            <!-- ----------------------------------------------------------
                 ORDER STATUS
            
                 PURPOSE:
                 Allows the administrator to change the order status.
            
            ----------------------------------------------------------- -->
            
            <p>
            
                <strong>Status :</strong>
            
                <select id="orderStatus">
            
                    <option
                        value="Pending"
                        ${order.status === "Pending" ? "selected" : ""}
                    >
                        Pending
                    </option>
            
                    <option
                        value="Preparing"
                        ${order.status === "Preparing" ? "selected" : ""}
                    >
                        Preparing
                    </option>
            
                    <option
                        value="Ready"
                        ${order.status === "Ready" ? "selected" : ""}
                    >
                        Ready
                    </option>
            
                    <option
                        value="Delivered"
                        ${order.status === "Delivered" ? "selected" : ""}
                    >
                        Delivered
                    </option>
            
                    <option
                        value="Cancelled"
                        ${order.status === "Cancelled" ? "selected" : ""}
                    >
                        Cancelled
                    </option>
            
                </select>
            
            </p>
               <!-- ==========================================================
                 SAVE STATUS BUTTON
            
                 PURPOSE:
                 Saves the updated order status.
            
            ========================================================== -->
            
            <br>
            
            <button
            
                onclick="saveOrderStatus('${order.orderId}')"
            
            >
            
                💾 Save Status
            
            </button>
       </div>
   
   `;

    /* ----------------------------------------------------------
       Show Popup
    ---------------------------------------------------------- */

    modal.style.display = "block";

}


/* ==========================================================
   CLOSE ORDER MODAL

   PURPOSE:
   Closes the Order Details popup.

   ========================================================== */

function closeOrderModal(){

    document.getElementById(
        "order-details-modal"
    ).style.display = "none";

}

/* ==========================================================
   SAVE ORDER STATUS

   PURPOSE:
   Updates the selected order status and
   refreshes the Order Management table.

   ========================================================== */

function saveOrderStatus(orderId){

    /* ----------------------------------------------------------
       Load Orders
    ---------------------------------------------------------- */

    const orders =

        JSON.parse(

            localStorage.getItem("orders")

        ) || [];

    /* ----------------------------------------------------------
       Find Selected Order
    ---------------------------------------------------------- */

    const order =

        orders.find(function(item){

            return item.orderId === orderId;

        });

    if(!order){

        alert("Order not found.");

        return;

    }

    /* ----------------------------------------------------------
       Get Selected Status
    ---------------------------------------------------------- */

    const newStatus =

        document.getElementById(
            "orderStatus"
        ).value;

    /* ----------------------------------------------------------
       Update Status
    ---------------------------------------------------------- */

    order.status = newStatus;

    /* ----------------------------------------------------------
       Save Orders
    ---------------------------------------------------------- */

    localStorage.setItem(

        "orders",

        JSON.stringify(orders)

    );

    /* ----------------------------------------------------------
       Refresh Order Table
    ---------------------------------------------------------- */

    displayOrders();

    /* ----------------------------------------------------------
       Reopen Updated Order
    ---------------------------------------------------------- */

    viewOrder(orderId);

    alert("Order status updated successfully.");

}





