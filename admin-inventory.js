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
   ADD ANOTHER PURCHASE ROW BUTTON

   PURPOSE:
   Creates another editable purchase row
   in the Purchase Entry table.

========================================================== */

document
.getElementById(
"addPurchaseRowButton"
)
.addEventListener(
"click",
function(){

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
   Creates one editable purchase row in the
   Purchase Entry table.

========================================================== */

function createPurchaseRow(){

    /* ------------------------------------------
       Get Purchase Entry Table Body
    ------------------------------------------ */

    const purchaseEntryBody =

    document.getElementById(
    "purchaseEntryBody"
    );


    /* ------------------------------------------
       Create New Table Row
    ------------------------------------------ */

    const newRow =

    document.createElement(
    "tr"
    );


    /* ------------------------------------------
       Set Today's Date
    ------------------------------------------ */

    const today =

    new Date()
    .toISOString()
    .split("T")[0];


    /* ------------------------------------------
       Create Editable Row
    ------------------------------------------ */

    newRow.innerHTML = `

    <td>

        <input
        type="date"
        value="${today}">

    </td>

    <td>

        <input
        type="text"
        placeholder="Ingredient Name">

    </td>

    <td>

        <input
        type="text"
        placeholder="Example: 25 kg">

    </td>

    <td>

        <input
        type="number"
        min="0"
        placeholder="Total Cost">

    </td>

    <td>

        <button
        class="saveRowButton">

        💾 Save Row

        </button>

        <button
        class="removeRowButton">

        ❌ Remove Row

        </button>

    </td>

    `;


   /* ------------------------------------------
      Add Row to Table
   ------------------------------------------ */
   
   purchaseEntryBody
   .appendChild(
   newRow
   );
   

   /* ------------------------------------------
      SAVE ROW BUTTON
   
      PURPOSE:
      Validates the row and marks it as saved.
   
   ------------------------------------------ */
   
   newRow
   .querySelector(
   ".saveRowButton"
   )
   .addEventListener(
   "click",
   function(){
   
       /* --------------------------------------
          Get all input fields
       -------------------------------------- */
   
       const inputFields =
   
       newRow.querySelectorAll(
       "input"
       );
   
   
       /* --------------------------------------
          Validate inputs
       -------------------------------------- */
   
       for(const inputField of inputFields){
   
           if(inputField.value.trim() === ""){
   
               alert(
               "Please complete all fields before saving the row."
               );
   
               inputField.focus();
   
               return;
   
           }
   
       }
   /* ==========================================================
   SAVE PURCHASE BUTTON

   PURPOSE:
   Saves all validated purchase rows into
   Local Storage.

========================================================== */

document
.getElementById(
"savePurchaseButton"
)
.addEventListener(
"click",
function(){

    savePurchaseRegister();

});



/* ==========================================================
   SAVE PURCHASE REGISTER

   PURPOSE:
   Saves all validated purchase rows into
   Local Storage.

========================================================== */

function savePurchaseRegister(){

    /* ------------------------------------------
       Get all purchase rows
    ------------------------------------------ */

    const purchaseRows =

    document
    .querySelectorAll(
    "#purchaseEntryBody tr"
    );


    /* ------------------------------------------
       Read existing purchases
    ------------------------------------------ */

    const purchaseRegister =

    JSON.parse(

        localStorage.getItem(
        "purchaseRegister"
        )

    ) || [];


    /* ------------------------------------------
       Process each saved row
    ------------------------------------------ */

    purchaseRows.forEach(function(row){

        if(row.dataset.saved !== "true"){

            return;

        }

        const inputFields =

        row.querySelectorAll(
        "input"
        );

        purchaseRegister.push({

            id: Date.now() + Math.random(),

            purchaseDate:
            inputFields[0].value,

            ingredientName:
            inputFields[1].value,

            unit:
            inputFields[2].value,

            totalCost:
            Number(
            inputFields[3].value
            )

        });

    });


    /* ------------------------------------------
       Save to Local Storage
    ------------------------------------------ */

    localStorage.setItem(

        "purchaseRegister",

        JSON.stringify(
        purchaseRegister
        )

    );


    /* ------------------------------------------
       Notify User
    ------------------------------------------ */

    alert(
    "Purchase saved successfully."
    );


    /* ------------------------------------------
       Close Popup
    ------------------------------------------ */

    closePurchaseModal();

}
   
       /* --------------------------------------
          Mark row as saved
       -------------------------------------- */
   
       newRow.dataset.saved = "true";
   
       alert(
       "Purchase row saved successfully."
       );
   
   });
   
   
   
   /* ------------------------------------------
      REMOVE ROW BUTTON
   
      PURPOSE:
      Removes only the selected purchase row.
   
   ------------------------------------------ */
   
   newRow
   .querySelector(
   ".removeRowButton"
   )
   .addEventListener(
   "click",
   function(){
   
       newRow.remove();
   
   });

}
