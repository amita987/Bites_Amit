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

        document.getElementById("username").value;


    let password =

        document.getElementById("password").value;



    if(

        username === "admin"

        &&

        password === "admin123"

    ){

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






