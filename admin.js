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







