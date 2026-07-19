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
   
   
   
   /* ==========================================================
      LOAD CURRENT MENU
   
      PURPOSE:
   
      Single source of truth.
   
      Invoice prices always come from
      Manage Menu data.
   
   ========================================================== */
   
   
   const restaurantMenu =
   
       JSON.parse(
   
           localStorage.getItem(
               "restaurantMenu"
           )
   
       ) || [];
   

   /* ==========================================================
      GET MENU ITEM
   
      PURPOSE:
      Finds the current menu item using Item ID.
   
      Item ID is now the single source of truth
      shared by:
      - Customer Menu
      - Cart
      - Checkout
      - Orders
      - Invoice
   
      ========================================================== */

   /* ==========================================================
      GET MENU ITEM
   
      PURPOSE:
      Finds a menu item for both:
   
      ✓ New Orders  -> Item ID
      ✓ Old Orders  -> Item Name
   
      This keeps every historical invoice working.
   
      ========================================================== */
   
   function getMenuItem(item){
   
       for(let category of restaurantMenu){
   
           const foundItem =
   
           category.items.find(function(menuItem){
   
               /* ----------------------------------------------
                  NEW ORDERS
               ---------------------------------------------- */
   
               if(item.id !== undefined){
   
                   return menuItem.id === Number(item.id);
   
               }
   
               /* ----------------------------------------------
                  OLD ORDERS
               ---------------------------------------------- */
   
               return (
   
                   menuItem.name.trim().toLowerCase()
   
                   ===
   
                   item.name.trim().toLowerCase()
   
               );
   
           });
   
           if(foundItem){
   
 
              return {
               
                   item: foundItem,
               
                   category: category.category
               
               };
   
           }
   
       }
   
       return null;
   
   }



   /* ----------------------------------------------------------
      BUILD PROFESSIONAL ORDERED ITEMS TABLE
   
      PURPOSE:
      Displays invoice item details:
   
      - Item Name
      - Quantity
      - Unit Price
      - Total Price
   
   ---------------------------------------------------------- */
   
   
   let itemsTable = "";
   
   
   if(order.items && order.items.length > 0){
   
   
       itemsTable = `
   
   
       <!-- ==========================================================
            ORDER ITEMS TABLE
   
            PURPOSE:
            Professional invoice style item listing.
   
       ========================================================== -->
   
   
       <table 
   
           width="100%" 
   
           border="1"
   
           cellspacing="0"
   
           cellpadding="8"
   
       >
   
   
           <thead>
   
   
               <tr>
  
                     <th align="left">
                     
                         Item
                     
                     </th>
                     
                     <th align="left">
                     
                         Category
                     
                     </th>
   
   
   
                   <th>
   
                       Qty
   
                   </th>
   
   
   
                   <th align="right">
   
                       Unit Price
   
                   </th>
   
   
   
                   <th align="right">
   
                       Item Total
   
                   </th>
   
   
               </tr>
   
   
           </thead>
   
   
   
           <tbody>
   
   
       `;
   
   
   
       order.items.forEach(function(item){
   
   
         /* ==========================================================
            ITEM TOTAL CALCULATION
         
            PURPOSE:
            Prevents NaN errors.
         
            Handles:
            - Missing quantity
            - Missing price
            - Old orders with text values
         
         ========================================================== */
         
         
         const quantity =
         
             Number(
         
                 item.quantity
         
             ) || 0;
         

         /* ==========================================================
            PURCHASED PRICE
         
            PURPOSE:
         
            If the order already contains the price that the
            customer paid, always use that.
         
            Otherwise, fall back to the current menu.
         
         ========================================================== */
         
         let price =
         
         Number(item.purchasedFinalPrice);
         
         
         
         if(isNaN(price)){
         


            const menuData = getMenuItem(item);

               if(menuData){
               
                   price =
               
                   menuData.item.price -
               
                   (
               
                       menuData.item.price *
               
                       menuData.item.discount /
               
                       100
               
                   );
               
               }
         
             else{
         
                 price = 0;
         
             }
         
         }
         
         
         
         /* ==========================================================
            ITEM TOTAL
         
         ========================================================== */
         
         
         const itemTotal =
         
         quantity * price;
   
   
   
           itemsTable += `
   
   
               <tr>
   

                  <td>
                  
                      ${item.name || "-"}
                  
                  </td>
                  
                  <td>
                  
                      ${menuData ? menuData.category : "-"}
                  
                  </td>
   
   
                     <td align="center">
                     
                         ${Number(item.quantity) || 0}
                     
                     </td>
   


                     <td align="right">
                     
                     ₹${price}
                     
                     </td>
   
   
   
                   <td align="right">
   
                       ₹${itemTotal}
   
                   </td>
   
   
               </tr>
   
   
           `;
   
   
       });
   
   
   
       itemsTable += `
   
   
           </tbody>
   
   
       </table>
   
   
       `;
   
   
   }
   
   else{
   
   
       itemsTable = `
   
   
           <!-- ==========================================================
                EMPTY ORDER MESSAGE
   
                PURPOSE:
                Shows message when no items exist.
   
           ========================================================== -->
   
   
           <p>
   
               No items found.
   
           </p>
   
   
       `;
   
   
   }
   
   

   /* ----------------------------------------------------------
      Display Order Details
   ---------------------------------------------------------- */
   
   content.innerHTML = `
   
       <div class="order-invoice">
   
      <!-- ==========================================================
           INVOICE HEADER
      
           PURPOSE:
           Displays the restaurant name and invoice title.
      
      ========================================================== -->
      
      <div class="invoice-header">
      
          <h2>
      
              🍽️ Bite Amit Restaurant
      
          </h2>
      
          <h4>
      
              Restaurant Order Invoice
      
          </h4>
      
      </div>
      
      <hr>
   
            <!-- ==========================================================
                 ORDER INFORMATION
            
            ========================================================== -->
            
            <table width="100%">
            
                <tr>
            
                    <td><strong>Order ID</strong></td>
            
                    <td>${order.orderId}</td>
            
                </tr>
            
                <tr>
            
                    <td><strong>Date</strong></td>
            
                    <td>${order.orderDate || "-"}</td>
            
                </tr>
            
                <tr>
            
                    <td><strong>Time</strong></td>
            
                    <td>${order.orderTime || "-"}</td>
            
                </tr>
            
            </table>
            
            <hr>
   
   
            <!-- ==========================================================
                 CUSTOMER INFORMATION
            
            ========================================================== -->
            
            <table width="100%">
            
                <tr>
            
                    <td><strong>Customer</strong></td>
            
                    <td>${order.customer?.name || "-"}</td>
            
                </tr>
            
                <tr>
            
                    <td><strong>Mobile</strong></td>
            
                    <td>${order.customer?.mobile || "-"}</td>
            
                </tr>
            
            </table>
            
            <hr>
   
   
           <h3>Ordered Items</h3>
   
           ${itemsTable}
   
           <hr>
   

      <!-- ==========================================================
           INVOICE CALCULATION SECTION
      
           PURPOSE:
           Displays:
      
           - Subtotal
           - Tax
           - Final Grand Total
      
      ========================================================== -->
      
      
      <div class="invoice-summary">
      
      
          <!-- ------------------------------------------------------
               SUBTOTAL CALCULATION
      
               PURPOSE:
               Adds all item prices before tax.
      
          ------------------------------------------------------- -->
      
      
          <p>
      
      
              <strong>
      
                  Subtotal :
      
              </strong>
      
      
              ₹${order.total}
      
      
          </p>
      
      
      
      
          <!-- ------------------------------------------------------
               TAX CALCULATION
      
               PURPOSE:
               Calculates restaurant tax.
      
               Currently:
               5% tax
      
               This can be changed later.
      
          ------------------------------------------------------- -->
      
      
          <p>
      
      
              <strong>
      
                  
                  Tax (${localStorage.getItem("restaurantTax") || 5}%) :
      
              </strong>
      
      
              ₹${Math.round(
               
                   order.total *
               
                   (
               
                       Number(
               
                           localStorage.getItem(
               
                               "restaurantTax"
               
                           )
               
                       || 5)
               
                       / 100
               
                   )
               
               )}
      
      
          </p>
      
      
      
      
          <hr>
      
      
      
      
          <!-- ------------------------------------------------------
               FINAL GRAND TOTAL
      
               PURPOSE:
               Shows final payable amount.
      
          ------------------------------------------------------- -->
      
      
          <h3 style="color:#8B0000;">
      
      
              Grand Total :
      

               ₹${
               
                   order.total +
               
                   Math.round(
               
                       order.total *
               
                       (
               
                           Number(
               
                               localStorage.getItem(
               
                                   "restaurantTax"
               
                               )
               
                           || 5)
               
                           /100
               
                       )
               
                   )
               
               }
      
      
          </h3>
      
      
      </div>
   

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
            
            
            
            <br><br>
            
            
            
            <!-- ==========================================================
                 INVOICE FOOTER
            
                 PURPOSE:
                 Displays thank you message.
            
            ========================================================== -->
            
            
            <div class="invoice-footer">
            
            
                <hr>
            
            
                <h4>
            
                    Thank you for ordering!
            
                </h4>
            
            
                <p>
            
                    Visit Again ❤️
            
                </p>
            
            
            </div>
            
            
            
            
            <!-- ==========================================================
                 INVOICE ACTION BUTTONS
            
                 PURPOSE:
                 Provides:
            
                 1. Print Invoice
                 2. Close Invoice Popup
            
            ========================================================== -->
            
            
            <div class="invoice-buttons">
            
            
                <button
            
                    onclick="printInvoice()"
            
                >
            
                    🖨 Print Invoice
            
                </button>
            
            
            
                <button
            
                    onclick="closeOrderModal()"
            
                >
            
                    ❌ Close
            
                </button>
            
            
            </div>
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


/* ==========================================================
   PRINT INVOICE

   PURPOSE:
   Opens browser print dialog for invoice.

========================================================== */


function printInvoice(){


    const invoice =

        document.querySelector(
            ".order-invoice"
        );


    if(!invoice){


        alert(
            "Invoice not found."
        );


        return;


    }


    const printWindow =

        window.open(
            "",
            "",
            "width=800,height=600"
        );



    printWindow.document.write(`


        <html>


        <head>


            <title>

                Restaurant Invoice

            </title>



            <style>


                body{

                    font-family:Arial;

                    padding:20px;

                }


                table{

                    width:100%;

                    border-collapse:collapse;

                }


                td,th{

                    border:1px solid #000;

                    padding:8px;

                }


            </style>


        </head>



        <body>


            ${invoice.innerHTML}


        </body>



        </html>


    `);



    printWindow.document.close();



    printWindow.print();


}


/* ==========================================================
   RESTAURANT TAX SETTINGS

   PURPOSE:
   Saves the tax percentage selected by admin.

   Storage:
   Browser localStorage

   Example:
   Tax = 5
   means invoice tax will be 5%

========================================================== */


function saveTaxPercentage(){


    const taxInput =

        document.getElementById(
            "taxPercentage"
        );


    if(!taxInput){

        return;

    }



    const tax =

        Number(
            taxInput.value
        ) || 0;



    localStorage.setItem(

        "restaurantTax",

        tax

    );



    alert(

        "Tax percentage saved successfully."

    );


}





/* ==========================================================
   LOAD TAX PERCENTAGE

   PURPOSE:
   Automatically loads saved tax value
   when Order Management page opens.

========================================================== */


function loadTaxPercentage(){


    const taxInput =

        document.getElementById(
            "taxPercentage"
        );


    if(!taxInput){

        return;

    }



    const savedTax =

        localStorage.getItem(

            "restaurantTax"

        );



    if(savedTax !== null){


        taxInput.value = savedTax;


    }


}





/* ==========================================================
   PAGE LOAD EVENT

   PURPOSE:
   Loads restaurant tax settings.

========================================================== */


window.addEventListener(

    "load",

    loadTaxPercentage

);




