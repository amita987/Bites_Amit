/* ==========================================================
   FILE : admin.js

   PURPOSE:
   Handles all administrator functions.

   CURRENT FEATURES

   ✓ Admin Login

   Future Features

   - Admin Dashboard
   - Manage Menu
   - Add Menu Item
   - Edit Menu Item
   - Delete Menu Item
   ========================================================== */



/* ==========================================================
   ADMIN LOGIN

   PURPOSE:
   Checks whether username and password
   entered by administrator are correct.

   IF CORRECT

   Opens Admin Dashboard

   IF INCORRECT

   Shows login error.
   ========================================================== */

   function adminLogin(){
   
   
       let username =
   
           document.getElementById("username").value.trim();
   
   
       let password =
   
           document.getElementById("password").value;
   
   
   
       // ================================
       // USERNAME VALIDATION
       // ================================
   
       if(username.length < 5){
   
           alert(
               "Username must contain at least 5 characters."
           );
   
           return;
   
       }
   
   
   
       // ================================
       // PASSWORD VALIDATION
       // ================================
   
       let passwordRule =
   
           /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{10,}$/;
   
   
   
       if(!passwordRule.test(password)){
   
   
           alert(
   
           "Password must contain:\n\n" +
   
           "✓ Minimum 10 characters\n" +
   
           "✓ One uppercase letter\n" +
   
           "✓ One lowercase letter\n" +
   
           "✓ One number\n" +
   
           "✓ One special character"
   
           );
   
   
           return;
   
       }
   
   
   
       // ================================
       // LOGIN CHECK
       // ================================
   
   
       if(
   
           username === "admin"
   
           &&
   
           password === "Admin@12345"
   
       ){
   
         localStorage.setItem(
             "adminLoggedIn",
             "true"
         );
         
         
         window.location.href =
         
         "admin-dashboard.html";
   
       }
   
       else{
   
           alert(
   
               "Invalid Username or Password."
   
           );
   
       }
   
   
   }

/* ==========================================================
   INITIALIZE RESTAURANT MENU

   PURPOSE:
   Copies menuData into Local Storage only once.

   WHY?
   Future Admin changes (Add/Edit/Delete)
   will be saved in Local Storage instead
   of menu-data.js.
   ========================================================== */

function initializeRestaurantMenu(){

    // Check whether menu already exists

    if(

        localStorage.getItem("restaurantMenu") === null

    ){

        // Save original menu into Local Storage

        localStorage.setItem(

            "restaurantMenu",

            JSON.stringify(menuData)

        );

    }

}


/* ==========================================================
   HANDLE ENTER KEY FOR LOGIN

   PURPOSE:
   Allows administrator to press Enter
   instead of clicking the Login button.

   ========================================================== */

function handleAdminLogin(event){

    if(event.key === "Enter"){

        adminLogin();

    }

}

/* ==========================================================
   FORGOT PASSWORD

   PURPOSE:
   Provides password recovery message.

   ========================================================== */


function forgotPassword(){


    let email = prompt(

        "Enter registered email address:"

    );


    if(email){


        alert(

        "Password reset instructions will be sent to:\n" 

        + email

        );


    }


}

/* ==========================================================
   SHOW / HIDE PASSWORD

   PURPOSE:
   Toggles password visibility.
========================================================== */


function togglePassword(){


    let passwordField =

        document.getElementById("password");


    if(passwordField.type === "password"){


        passwordField.type = "text";


    }

    else{


        passwordField.type = "password";


    }


}

/* ==========================================================
   ADMIN LOGOUT

   PURPOSE:
   Removes admin login session and returns
   administrator to login page.

========================================================== */


function adminLogout(){


    localStorage.removeItem(
        "adminLoggedIn"
    );


    window.location.href =

    "admin-login.html";


}

/* ==========================================================
   ORDERS NEED ATTENTION SORT SETTINGS

   PURPOSE:
   Stores the currently selected column and
   sorting direction for the dashboard table.

   Default:
   Pickup / Serve Time (Ascending)

========================================================== */

let attentionOrderSort = {

    column : "pickup",

    direction : "asc"

};


/* ==========================================================
   SORT ATTENTION ORDERS

   PURPOSE:
   Called whenever the administrator clicks
   a table heading.

   Clicking the same heading again toggles:

   Ascending ↔ Descending

========================================================== */

function sortAttentionOrders(column){

    /* -----------------------------------------------
       SAME COLUMN

       Reverse the sort direction.
    ----------------------------------------------- */

    if(attentionOrderSort.column === column){

        attentionOrderSort.direction =

            attentionOrderSort.direction === "asc"

            ?

            "desc"

            :

            "asc";

    }

    /* -----------------------------------------------
       NEW COLUMN

       Start with ascending order.
    ----------------------------------------------- */

    else{

        attentionOrderSort.column = column;

        attentionOrderSort.direction = "asc";

    }


    /* -----------------------------------------------
       Reload dashboard table

    ----------------------------------------------- */

    loadOrdersNeedAttention();

}

/* ==========================================================
   ORDERS NEED ATTENTION

   PURPOSE:
   Displays active customer orders on the
   Admin Dashboard.

   Only orders that still require attention
   are shown.

   Hidden Orders:

   • Delivered
   • Cancelled

========================================================== */

function loadOrdersNeedAttention(){

    /* ------------------------------------------------------
       Dashboard Table Body

    ------------------------------------------------------ */

    const tableBody =

        document.getElementById(

            "orders-attention-body"

        );


    /* ------------------------------------------------------
       Exit if this page doesn't contain the table.

    ------------------------------------------------------ */

    if(!tableBody){

        return;

    }


    /* ------------------------------------------------------
       Load Orders

    ------------------------------------------------------ */

    const orders =

        JSON.parse(

            localStorage.getItem("orders")

        ) || [];


   /* ------------------------------------------------------
      Keep only Active Orders
   
   ------------------------------------------------------ */
   
   const activeOrders =
   
       orders.filter(function(order){
   
           return(
   
               order.status !== "Delivered"
   
               &&
   
               order.status !== "Cancelled"
   
           );
   
       });
   
   
   /* ==========================================================
      SORT ACTIVE ORDERS
   
      PURPOSE:
      Sorts the dashboard table according to the
      selected column.
   
   ========================================================== */
   
   activeOrders.sort(function(a, b){
   
       let valueA;
   
       let valueB;
   
       switch(attentionOrderSort.column){
   
           /* -----------------------------------------
              ORDER NUMBER
           ----------------------------------------- */
   
           case "orderId":
   
               valueA = a.orderId || "";
   
               valueB = b.orderId || "";
   
               break;
   
   
           /* -----------------------------------------
              CUSTOMER NAME
           ----------------------------------------- */
   
           case "customer":
   
               valueA = (a.customer?.name || "").toLowerCase();
   
               valueB = (b.customer?.name || "").toLowerCase();
   
               break;
   
   
           /* -----------------------------------------
              PHONE NUMBER
           ----------------------------------------- */
   
           case "phone":
   
               valueA = a.customer?.mobile || "";
   
               valueB = b.customer?.mobile || "";
   
               break;
   
   
           /* -----------------------------------------
              ORDER TYPE
           ----------------------------------------- */
   
           case "type":
   
               valueA = (a.orderType || "").toLowerCase();
   
               valueB = (b.orderType || "").toLowerCase();
   
               break;
   
   
           /* -----------------------------------------
              PICKUP / SERVE DATE & TIME
   
              Default sorting column.
   
           ----------------------------------------- */
   
           default:
   
               valueA = new Date(
   
                   (a.pickupServeDate || "") +
   
                   " " +
   
                   (a.pickupServeTime || "")
   
               ).getTime();
   
               valueB = new Date(
   
                   (b.pickupServeDate || "") +
   
                   " " +
   
                   (b.pickupServeTime || "")
   
               ).getTime();
   
       }
   
   
       if(valueA < valueB){
   
           return attentionOrderSort.direction === "asc"
   
               ? -1
   
               : 1;
   
       }
   
   
       if(valueA > valueB){
   
           return attentionOrderSort.direction === "asc"
   
               ? 1
   
               : -1;
   
       }
   
   
       return 0;
   
   });
   
   
   
   
   /* ------------------------------------------------------
      PROJECT 3 - STEP 3C.1
   
      DEFAULT SORT
   
      PURPOSE:
   
      Automatically display the earliest
      Pickup / Serve Date & Time first.
   
      This helps the kitchen immediately know
      which order needs attention next.
   
   ------------------------------------------------------ */
   
   activeOrders.sort(function(a,b){
   
       /* ------------------------------------------
          Build DateTime for Order A
       ------------------------------------------ */
   
       const dateTimeA = new Date(
   
           (a.pickupServeDate || "9999-12-31")
   
           +
   
           "T"
   
           +
   
           convertTo24Hour(
   
               a.pickupServeTime || "11:59 PM"
   
           )
   
       );
   
   
       /* ------------------------------------------
          Build DateTime for Order B
       ------------------------------------------ */
   
       const dateTimeB = new Date(
   
           (b.pickupServeDate || "9999-12-31")
   
           +
   
           "T"
   
           +
   
           convertTo24Hour(
   
               b.pickupServeTime || "11:59 PM"
   
           )
   
       );
   
   
       return dateTimeA - dateTimeB;
   
   });


    /* ------------------------------------------------------
       No Active Orders

    ------------------------------------------------------ */

    if(activeOrders.length === 0){

        tableBody.innerHTML =

        `
        <tr>

            <td colspan="6" style="text-align:center;">

                🎉 No orders require attention.

            </td>

        </tr>
        `;

        return;

    }


    /* ------------------------------------------------------
       Build Table

    ------------------------------------------------------ */

    let html = "";


    activeOrders.forEach(function(order){

        html += `

        <tr>

            <!-- ==========================================================
                 CLICKABLE ORDER NUMBER
            
                 PURPOSE:
                 Allows the administrator to click the
                 Order Number to immediately open the
                 complete order in Order Management.
            
            ========================================================== -->
            
            <td>
            
                <a
            
                    href="#"
            
                    onclick="openDashboardOrder('${order.orderId}')"
            
                    class="dashboard-order-link"
            
                >
            
                    ${order.orderId}
            
                </a>
            
            </td>

            <td>

                ${order.customer?.name || "-"}

            </td>

            <td>

                ${order.customer?.mobile || "-"}

            </td>

            <td>

                ${order.orderType || "-"}

            </td>

            <td>

                ${(order.pickupServeDate || "-")}

                <br>

                ${(order.pickupServeTime || "-")}

            </td>

            <td>
            
                ${getDashboardOrderItems(order)}
            
            </td>

        </tr>

        `;

    });


    tableBody.innerHTML = html;

}

/* ==========================================================
   PROJECT 3
   STEP 3B

   DASHBOARD ORDER ITEMS

   PURPOSE:
   Builds a compact description of every item in
   the order.

   Example:

   Burger x2 (Main Course)

   ||

   Fries x1 (Starter)

   ||

   Coke x2 (Beverage)

========================================================== */

function getDashboardOrderItems(order){

    /* ------------------------------------------------------
       Load Restaurant Menu

       Used to determine each item's category.

    ------------------------------------------------------ */

    const restaurantMenu =

        JSON.parse(

            localStorage.getItem("restaurantMenu")

        ) || [];


    /* ------------------------------------------------------
       Safety Check

    ------------------------------------------------------ */

    if(!order.items || order.items.length === 0){

        return "-";

    }


    /* ------------------------------------------------------
       Build Item List

    ------------------------------------------------------ */

    const itemList =

        order.items.map(function(item){

            let category = "-";


            /* ----------------------------------------------
               Find Category

            ---------------------------------------------- */

            restaurantMenu.forEach(function(menuCategory){

                menuCategory.items.forEach(function(menuItem){

                    if(Number(menuItem.id) === Number(item.id)){

                        category = menuCategory.category;

                    }

                });

            });


            return `${item.name} x${item.quantity} (${category})`;

        });


    /* ------------------------------------------------------
       Return Final Text

    ------------------------------------------------------ */

    return itemList.join("<br>||<br>");

}

/* ==========================================================
   PROJECT 3
   STEP 3C.1

   CONVERT 12-HOUR TIME TO 24-HOUR TIME

   PURPOSE:

   Converts times such as

   2:30 PM

   into

   14:30

   so JavaScript can correctly sort
   Pickup / Serve Time.

========================================================== */

function convertTo24Hour(time){

    if(!time){

        return "23:59";

    }


    const parts =

        time.split(" ");


    let clock =

        parts[0].split(":");


    let hour =

        Number(clock[0]);


    let minute =

        clock[1];


    const ampm =

        parts[1];


    if(ampm === "PM" && hour !== 12){

        hour += 12;

    }


    if(ampm === "AM" && hour === 12){

        hour = 0;

    }


    return String(hour).padStart(2,"0")

        +

        ":"

        +

        minute;

}

/* ==========================================================
   OPEN DASHBOARD ORDER

   PURPOSE:
   Saves the selected Order ID so that
   Order Management can automatically
   open the correct invoice.

========================================================== */

function openDashboardOrder(orderId){

    /* ------------------------------------------------------
       SAVE SELECTED ORDER

       PURPOSE:
       Remember which order the admin
       clicked on.

    ------------------------------------------------------ */

    localStorage.setItem(

        "dashboardSelectedOrder",

        orderId

    );


    /* ------------------------------------------------------
       OPEN ORDER MANAGEMENT

    ------------------------------------------------------ */

    window.location.href =

        "admin-orders.html";

}
