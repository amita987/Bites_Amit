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
   GLOBAL VARIABLES

   PURPOSE:
   Stores values used across multiple
   Inventory Management functions.

========================================================== */

/* ------------------------------------------
   Purchase Being Updated

   PURPOSE:
   Holds the ID of the purchase currently
   being edited.

------------------------------------------ */

let purchaseBeingUpdated = null;


/* ------------------------------------------
   Purchase Register Sorting

   PURPOSE:
   Stores the currently selected sort column
   and sort direction.

------------------------------------------ */

let purchaseSortColumn = "";

let purchaseSortDirection = "ascending";

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

      /* ------------------------------------------
         Update Existing Purchase
      ------------------------------------------ */
      
      if(purchaseBeingUpdated !== null){
      
          const purchaseIndex =
      
          purchaseRegister.findIndex(function(purchase){
      
              return purchase.id === purchaseBeingUpdated;
      
          });
      
      
          if(purchaseIndex !== -1){
      
              purchaseRegister[purchaseIndex] = {
      
                  id: purchaseBeingUpdated,
      
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
      
              };
      
          }
      
      }
      
      
      /* ------------------------------------------
         Save New Purchase
      ------------------------------------------ */

      else{
      
          /* ------------------------------------------
             Check for Duplicate Purchase
      
             PURPOSE:
             Prevents saving an identical purchase
             more than once.
      
          ------------------------------------------ */
      
          if(
      
              isDuplicatePurchase(
      
                  inputFields[0].value,
      
                  inputFields[1].value,
      
                  inputFields[2].value,
      
                  Number(
                      inputFields[3].value
                  )
      
              )
      
          ){
      
              alert(
      
                  "This purchase already exists.\n\nPlease update the existing record instead."
      
              );
      
              return;
      
          }
      
      
          /* ------------------------------------------
             Save New Purchase
          ------------------------------------------ */
      
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
      
      }

    });


      /* ------------------------------------------
         Reset Update Mode
      
         PURPOSE:
         Prepare for the next Add Ingredient
         operation.
      
      ------------------------------------------ */
      
      purchaseBeingUpdated = null;
   

   
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
      Refresh Purchase Register
   ------------------------------------------ */
   
   displayPurchaseRegister();
   
   
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


/* ==========================================================
   DISPLAY PURCHASE REGISTER

   PURPOSE:
   Reads all saved purchase records from
   Local Storage and displays them in the
   Purchase Register table.

========================================================== */

function displayPurchaseRegister(

    searchText = ""

){

    /* ------------------------------------------
       Get Purchase Register Table Body
    ------------------------------------------ */

    const purchaseRegisterBody =

    document.getElementById(
    "purchaseRegisterBody"
    );


    /* ------------------------------------------
       Clear Existing Table
    ------------------------------------------ */

    purchaseRegisterBody.innerHTML = "";


    /* ------------------------------------------
       Read Purchase Register
    ------------------------------------------ */

    const purchaseRegister =

    JSON.parse(

        localStorage.getItem(
        "purchaseRegister"
        )

    ) || [];


    /* ------------------------------------------
       No Purchase Records
    ------------------------------------------ */

    if(purchaseRegister.length === 0){

        purchaseRegisterBody.innerHTML =

        `
        <tr>

            <td
            colspan="5"
            style="text-align:center;">

            No purchase records found.

            </td>

        </tr>
        `;

        return;

    }


   /* ------------------------------------------
      Filter Purchase Records
   
      PURPOSE:
      Filters the Purchase Register based on
      the search text entered by the user.
   
   ------------------------------------------ */
   
   const filteredPurchases =
   
   purchaseRegister.filter(function(purchase){
   
       const searchValue =
   
       searchText
       .toLowerCase()
       .trim();
   
       return(
   
           purchase.purchaseDate
           .toLowerCase()
           .includes(searchValue)
   
           ||
   
           purchase.ingredientName
           .toLowerCase()
           .includes(searchValue)
   
           ||
   
           purchase.unit
           .toLowerCase()
           .includes(searchValue)
   
       );
   
   });

      /* ------------------------------------------
      Sort Purchase Records
   
      PURPOSE:
      Sorts the filtered purchase records
      before displaying them.
   
   ------------------------------------------ */
   
   if(purchaseSortColumn !== ""){
   
       filteredPurchases.sort(function(a,b){
   
           let valueA = a[purchaseSortColumn];
   
           let valueB = b[purchaseSortColumn];
   
   
           if(purchaseSortColumn === "totalCost"){
   
               valueA = Number(valueA);
   
               valueB = Number(valueB);
   
           }
   
           else{
   
               valueA = String(valueA).toLowerCase();
   
               valueB = String(valueB).toLowerCase();
   
           }
   
   
           if(valueA < valueB){
   
               return purchaseSortDirection === "ascending"
   
               ?
   
               -1
   
               :
   
               1;
   
           }
   
   
           if(valueA > valueB){
   
               return purchaseSortDirection === "ascending"
   
               ?
   
               1
   
               :
   
               -1;
   
           }
   
   
           return 0;
   
       });
   
   }
   
   /* ------------------------------------------
      Display Purchase Records
   ------------------------------------------ */
   
   filteredPurchases.forEach(function(purchase){

        const row =

        document.createElement(
        "tr"
        );


        row.innerHTML =

        `
        <td>

        ${purchase.purchaseDate}

        </td>

        <td>

        ${purchase.ingredientName}

        </td>

        <td>

        ${purchase.unit}

        </td>

        <td>

        ₹${purchase.totalCost}

        </td>

         <td>
         
         <button
         onclick="updatePurchase(${purchase.id})">
         
         ✏️ Update
         
         </button>
         
         &nbsp;&nbsp;
         
         <button
         onclick="deletePurchase(${purchase.id})">
         
         🗑️ Delete
         
         </button>
         
         </td>
        `;


        purchaseRegisterBody.appendChild(
        row
        );

    });

}

/* ==========================================================
   PAGE INITIALIZATION

   PURPOSE:
   Displays all previously saved purchase
   records when the Inventory Management
   page loads.

========================================================== */

displayPurchaseRegister();


/* ==========================================================
   UPDATE PURCHASE

   PURPOSE:
   Opens the Purchase Entry popup and loads
   the selected purchase for editing.

========================================================== */

function updatePurchase(purchaseId){

    /* ------------------------------------------
       Store Purchase ID
    ------------------------------------------ */

    purchaseBeingUpdated = purchaseId;


    /* ------------------------------------------
       Read Purchase Register
    ------------------------------------------ */

    const purchaseRegister =

    JSON.parse(

        localStorage.getItem(
        "purchaseRegister"
        )

    ) || [];


    /* ------------------------------------------
       Find Selected Purchase
    ------------------------------------------ */

    const selectedPurchase =

    purchaseRegister.find(function(purchase){

        return purchase.id === purchaseId;

    });


    if(!selectedPurchase){

        alert(
        "Purchase record not found."
        );

        return;

    }


    /* ------------------------------------------
       Clear Existing Purchase Rows
    ------------------------------------------ */

    document
    .getElementById(
    "purchaseEntryBody"
    )
    .innerHTML = "";


    /* ------------------------------------------
       Open Purchase Popup
    ------------------------------------------ */

    document
    .getElementById(
    "purchaseModal"
    )
    .style.display =
    "block";


    /* ------------------------------------------
       Create Editable Row
    ------------------------------------------ */

    createPurchaseRow();


    /* ------------------------------------------
       Load Purchase Values
    ------------------------------------------ */

    const editRow =

    document
    .querySelector(
    "#purchaseEntryBody tr"
    );


    const inputFields =

    editRow.querySelectorAll(
    "input"
    );


    inputFields[0].value =
    selectedPurchase.purchaseDate;

    inputFields[1].value =
    selectedPurchase.ingredientName;

    inputFields[2].value =
    selectedPurchase.unit;

    inputFields[3].value =
    selectedPurchase.totalCost;


    /* ------------------------------------------
       Mark Row as Saved

       This allows Save Purchase to process
       the row in the next step.

    ------------------------------------------ */

    editRow.dataset.saved = "true";

}


/* ==========================================================
   DELETE PURCHASE

   PURPOSE:
   Deletes the selected purchase record
   after user confirmation.

========================================================== */

function deletePurchase(purchaseId){

    /* ------------------------------------------
       Confirm Delete
    ------------------------------------------ */

    const confirmDelete =

    confirm(

        "Are you sure you want to delete this purchase record?"

    );


    if(!confirmDelete){

        return;

    }


    /* ------------------------------------------
       Read Purchase Register
    ------------------------------------------ */

    let purchaseRegister =

    JSON.parse(

        localStorage.getItem(
        "purchaseRegister"
        )

    ) || [];


    /* ------------------------------------------
       Remove Selected Purchase
    ------------------------------------------ */

    purchaseRegister =

    purchaseRegister.filter(function(purchase){

        return purchase.id !== purchaseId;

    });


    /* ------------------------------------------
       Save Updated Purchase Register
    ------------------------------------------ */

    localStorage.setItem(

        "purchaseRegister",

        JSON.stringify(
        purchaseRegister
        )

    );


    /* ------------------------------------------
       Refresh Purchase Register
    ------------------------------------------ */

    displayPurchaseRegister();

         /* ==========================================================
         SEARCH PURCHASE REGISTER
      
         PURPOSE:
         Filters the Purchase Register as the
         administrator types.
      
      ========================================================== */
      
      document
      .getElementById(
      "searchPurchaseInput"
      )
      .addEventListener(
      "input",
      function(){
      
          displayPurchaseRegister(
      
              this.value
      
          );
      
      });


/* ==========================================================
   PURCHASE REGISTER SORTING

   PURPOSE:
   Attaches click events to the Purchase
   Register table headers.

========================================================== */

document
.getElementById(
"sortPurchaseDate"
)
.addEventListener(
"click",
function(){

    sortPurchaseRegister(
    "purchaseDate"
    );

});


document
.getElementById(
"sortIngredientName"
)
.addEventListener(
"click",
function(){

    sortPurchaseRegister(
    "ingredientName"
    );

});


document
.getElementById(
"sortUnit"
)
.addEventListener(
"click",
function(){

    sortPurchaseRegister(
    "unit"
    );

});


document
.getElementById(
"sortTotalCost"
)
.addEventListener(
"click",
function(){

    sortPurchaseRegister(
    "totalCost"
    );

});
   
    /* ------------------------------------------
       Notify User
    ------------------------------------------ */

    alert(

        "Purchase record deleted successfully."

    );

}


/* ==========================================================
   SORT PURCHASE REGISTER

   PURPOSE:
   Updates the selected sort column and
   toggles the sort direction.

========================================================== */

function sortPurchaseRegister(column){

    /* ------------------------------------------
       Toggle Sort Direction
    ------------------------------------------ */

    if(purchaseSortColumn === column){

        purchaseSortDirection =

        purchaseSortDirection === "ascending"

        ?

        "descending"

        :

        "ascending";

    }

    else{

        purchaseSortColumn = column;

        purchaseSortDirection = "ascending";

    }


    /* ------------------------------------------
       Refresh Purchase Register
    ------------------------------------------ */

    displayPurchaseRegister(

        document
        .getElementById(
        "searchPurchaseInput"
        )
        .value

    );

}


/* ==========================================================
   CHECK DUPLICATE PURCHASE

   PURPOSE:
   Checks whether a purchase with the same
   Date, Ingredient Name, Unit and Total Cost
   already exists in the Purchase Register.

   RETURNS:
   true  -> Duplicate found
   false -> No duplicate found

========================================================== */

function isDuplicatePurchase(

    purchaseDate,
    ingredientName,
    unit,
    totalCost

){

    /* ------------------------------------------
       Read Purchase Register
    ------------------------------------------ */

    const purchaseRegister =

    JSON.parse(

        localStorage.getItem(
        "purchaseRegister"
        )

    ) || [];


    /* ------------------------------------------
       Check for Duplicate
    ------------------------------------------ */

    return purchaseRegister.some(function(purchase){

        return(

            purchase.purchaseDate === purchaseDate

            &&

            purchase.ingredientName
            .toLowerCase()
            .trim()

            ===

            ingredientName
            .toLowerCase()
            .trim()

            &&

            purchase.unit
            .toLowerCase()
            .trim()

            ===

            unit
            .toLowerCase()
            .trim()

            &&

            Number(
                purchase.totalCost
            )

            ===

            Number(
                totalCost
            )

        );

    });

}





