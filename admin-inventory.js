/* ==========================================================
   INVENTORY MANAGEMENT

   PURPOSE:
   Handles Ingredient Master List,
   Recipes,
   Stock Management,
   Low Stock Alerts,
   Stock Refills.

========================================================== */


/* ==========================================================
   ADD INGREDIENT BUTTON

   PURPOSE:
   Displays the Purchase Entry Form when the
   "➕ Add Ingredient" button is clicked.

   Also creates the first purchase row.

========================================================== */

document
.getElementById(
"addIngredientBtn"
)
.addEventListener(
"click",
function(){

    /* ------------------------------------------
       Display the Purchase Entry Form
    ------------------------------------------ */

    document
    .getElementById(
    "purchaseEntrySection"
    )
    .style.display =
    "block";


    /* ------------------------------------------
       Create the First Purchase Row

       (Functionality will be added
       in the next step.)

    ------------------------------------------ */

    createPurchaseRow();

});



/* ==========================================================
   CREATE PURCHASE ROW

   PURPOSE:
   Creates one purchase entry row inside the
   Purchase Entry table.

   This is currently a placeholder.

   In the next step this function will create:

   • Today's Date
   • Ingredient Name
   • Unit
   • Total Cost
   • Save Button
   • Update Button
   • Cancel Button

========================================================== */

function createPurchaseRow(){

    // Code will be added in the next step.

}
