/* ==========================================================
   INVENTORY MANAGEMENT

   PURPOSE:
   Handles:

   1. Purchase Entry Popup
   2. Purchase Register
   3. Ingredient Stock
   4. Recipes
   5. Low Stock Alerts

========================================================== */



/* ==========================================================
   ADD INGREDIENT BUTTON

   PURPOSE:
   Opens the Purchase Entry popup.

   Also creates the first purchase row.

========================================================== */

document
.getElementById(
"addIngredientButton"
)
.addEventListener(
"click",
function(){

    /* ------------------------------------------
       Display Purchase Popup
    ------------------------------------------ */

    document
    .getElementById(
    "purchaseModal"
    )
    .style.display =
    "block";


    /* ------------------------------------------
       Create First Purchase Row

       (Will be implemented
       in the next step.)

    ------------------------------------------ */

    createPurchaseRow();

});



/* ==========================================================
   CLOSE BUTTON ( × )

   PURPOSE:
   Closes the Purchase Entry popup.

========================================================== */

document
.getElementById(
"closePurchaseModal"
)
.addEventListener(
"click",
function(){

    closePurchaseModal();

});



/* ==========================================================
   CANCEL BUTTON

   PURPOSE:
   Closes the Purchase Entry popup without
   saving anything.

========================================================== */

document
.getElementById(
"cancelPurchaseButton"
)
.addEventListener(
"click",
function(){

    closePurchaseModal();

});



/* ==========================================================
   CLOSE PURCHASE MODAL

   PURPOSE:
   Hides the Purchase Entry popup and resets it.

========================================================== */

function closePurchaseModal(){

    document
    .getElementById(
    "purchaseModal"
    )
    .style.display =
    "none";


   /* ------------------------------------------
      Clear all purchase rows
   ------------------------------------------ */
   
   document
   .getElementById(
   "purchaseEntryBody"
   )
   .innerHTML = "";

}


/* ==========================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE

========================================================== */

window.addEventListener(
"click",
function(event){

    const modal =

    document.getElementById(
    "purchaseModal"
    );

    if(event.target === modal){

        closePurchaseModal();

    }

});

/* ==========================================================
   CLOSE MODAL WITH ESC KEY

========================================================== */

document.addEventListener(
"keydown",
function(event){

    if(event.key === "Escape"){

        const modal =

        document.getElementById(
        "purchaseModal"
        );

        if(modal.style.display === "block"){

            closePurchaseModal();

        }

    }

});


/* ==========================================================
   CREATE PURCHASE ROW

   PURPOSE:
   Placeholder.

   In the next step this function will create
   the first editable purchase row.

========================================================== */

function createPurchaseRow(){

    // Code will be added
    // in the next step.

}
