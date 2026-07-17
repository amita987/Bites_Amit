/* ==========================================================
   FILE : admin-menu.js

   PURPOSE:
   Displays restaurant menu for administrator.

   CURRENT FEATURES

   ✓ View Menu

   FUTURE FEATURES

   - Edit Item
   - Delete Item
   - Add Item

   ========================================================== */




/* ==========================================================
   LOAD MENU

   PURPOSE:
   Initializes restaurant menu if needed,
   then loads it from Local Storage.
   ========================================================== */

initializeRestaurantMenu();

/* ==========================================================
   DEBUG

   PURPOSE:
   Confirms admin-menu.js has loaded.
   ========================================================== */

console.log("admin-menu.js loaded");


const adminContainer =

document.getElementById(

    "admin-menu-container"

);

/* ==========================================================
   ADD ITEM MODE

   PURPOSE:
   Controls whether Add New Item form is visible.
   ========================================================== */

let addItemMode = false;

/* ==========================================================
   EDIT MODE

   PURPOSE:
   Stores the currently edited row.

   categoryIndex
       Category being edited.

   itemIndex
       Item being edited.

   NULL means no row is being edited.
   ========================================================== */

let editIndex = null;

/* ==========================================================
   INITIALIZE ADMIN MENU

   PURPOSE:
   Displays the menu table when the page loads.
   ========================================================== */

displayAdminMenu();


/* ==========================================================
   DISPLAY ADMIN MENU

   PURPOSE:
   Builds and displays the complete menu table.

   WHY?
   This function can be called again after
   Add, Edit, Delete, or Cancel.
   ========================================================== */


function displayAdminMenu(){

    /* ==========================================================
       LOAD LATEST RESTAURANT MENU

       PURPOSE:
       Reads the latest menu from Local Storage
       every time the table is displayed.
       ========================================================== */

    const restaurantMenu =

    JSON.parse(

        localStorage.getItem("restaurantMenu")

    );


   let table = `
   
   
   <button
   
   onclick="showAddItemForm()"
   
   >
   
   ➕ Add New Item
   
   </button>
   
   
   <br><br>
   
   
   <table border="1" width="100%">
   
   <tr>
   
   <th>Action</th>
   
   <th>S.No</th>
   
   <th>Image</th>
   
   <th>Item</th>
   
   <th>Category</th>
   
   <th>Price</th>
   
   <th>Discount</th>
   
   <th>Final Price</th>
   
   </tr>
   
   `;





/* ==========================================================
   LOOP THROUGH MENU CATEGORIES

   PURPOSE:
   Reads every category and every menu item.

   categoryIndex
       Position of the category.

   itemIndex
       Position of the item inside that category.

   These indexes uniquely identify every menu item.
   ========================================================== */

restaurantMenu.forEach(function(category, categoryIndex){


    category.items.forEach(function(item, itemIndex){


        let finalPrice =

        item.price -

        (item.price * item.discount / 100);

       /* ==========================================================
         CHECK EDIT MODE
      
         PURPOSE:
         Checks whether the current row
         is the row selected for editing.
      
         TRUE
             Current row is being edited.
      
         FALSE
             Current row is displayed normally.
         ========================================================== */
      
      let isEditing =
      
      editIndex !== null
      
      &&
      
      editIndex.categoryIndex === categoryIndex
      
      &&
      
      editIndex.itemIndex === itemIndex;



        table += `

<tr>



<td>

${

isEditing

?

`

<button

onclick="saveMenuItem()"

>

💾

</button>

<button

onclick="cancelEdit()"

>

❌

</button>

`

:

`


<button
type="button"
onclick="editMenuItem(${categoryIndex}, ${itemIndex})"
>
✏️
</button>

<button>

🗑️

</button>

`

}

</td>


<td>

${item.id}

</td>


<td>

<img

src="${item.image}"

width="60">

</td>


<td>

${

isEditing

?

`

<input

type="text"

id="edit-name"

value="${item.name}"

>

`

:

item.name

}

</td>


<td>

${category.category}

</td>


<td>

${

isEditing

?

`

<input

type="number"

id="edit-price"

value="${item.price}"

min="0"

>

`

:

`₹${item.price}`

}

</td>


<td>

${

isEditing

?

`

<input

type="number"

id="edit-discount"

value="${item.discount}"

min="0"

max="100"

>

`

:

`${item.discount}%`

}

</td>


<td>

₹${finalPrice}

</td>

</tr>

`;


    });


});



table +=

"</table>";



adminContainer.innerHTML =

table;

console.log("Table Rendered");
   
}




/* ==========================================================
   EDIT MENU ITEM

   PURPOSE:
   Stores the selected row and refreshes
   the Admin Menu in Edit Mode.
   ========================================================== */

function editMenuItem(categoryIndex, itemIndex){

    console.log("Edit button clicked");

    console.log(categoryIndex);

    console.log(itemIndex);

    editIndex = {

        categoryIndex: categoryIndex,

        itemIndex: itemIndex

    };

    console.log(editIndex);

    displayAdminMenu();

}

/* ==========================================================
   SAVE MENU ITEM

   PURPOSE:
   Saves the edited values into Local Storage
   and refreshes the Admin Menu.
   ========================================================== */

function saveMenuItem(){
   /* ==========================================================
      DEBUG
   
      PURPOSE:
      Checks whether Save button is calling
      saveMenuItem().
      ========================================================== */
   
   console.log("Save button clicked");

    /* ======================================================
       LOAD LATEST MENU
       ====================================================== */

    const restaurantMenu =

    JSON.parse(

        localStorage.getItem("restaurantMenu")

    );


    /* ======================================================
       GET EDITED VALUES
       ====================================================== */

    const itemName =

    document.getElementById("edit-name").value;


    const price =

    Number(

        document.getElementById("edit-price").value

    );


    const discount =

    Number(

        document.getElementById("edit-discount").value

    );


/* ======================================================
   VALIDATE INPUT

   PURPOSE:
   Prevent invalid values from being saved.
   ====================================================== */

if(itemName.trim() === ""){

    alert("Item Name cannot be empty.");

    return;

}


if(price < 0){

    alert("Price cannot be negative.");

    return;

}


if(discount < 0 || discount > 100){

    alert("Discount must be between 0 and 100.");

    return;

}


/* ======================================================
   FIND SELECTED ITEM

   PURPOSE:
   Finds the selected menu item that
   is currently being edited.
   ====================================================== */

const item =

restaurantMenu

[editIndex.categoryIndex]

.items

[editIndex.itemIndex];


    /* ======================================================
       UPDATE ITEM
       ====================================================== */

    item.name = itemName;

    item.price = price;

    item.discount = discount;


    /* ======================================================
       SAVE TO LOCAL STORAGE
       ====================================================== */

    localStorage.setItem(

        "restaurantMenu",

        JSON.stringify(restaurantMenu)

    );


    /* ======================================================
       EXIT EDIT MODE
       ====================================================== */

    editIndex = null;


    /* ======================================================
       REFRESH TABLE
       ====================================================== */

    displayAdminMenu();

}




/* ==========================================================
   CANCEL EDIT

   PURPOSE:
   Exits edit mode without saving any changes.

   The original values remain unchanged because
   nothing is written to Local Storage.
   ========================================================== */

function cancelEdit(){

    /* ======================================================
       EXIT EDIT MODE
       ====================================================== */
    console.log("Cancel button clicked");
    editIndex = null;


    /* ======================================================
       REFRESH TABLE

       PURPOSE:
       Reloads the original values from
       Local Storage.
       ====================================================== */

    displayAdminMenu();

}





/* ==========================================================
   SHOW ADD NEW ITEM FORM
   ========================================================== */

function showAddItemForm(){

   /* ==========================================================
      LOAD EXISTING CATEGORIES
   
      PURPOSE:
   
      Creates dropdown options from existing menu categories.
   
      ========================================================== */
   
   const restaurantMenu =
   
   JSON.parse(
   
       localStorage.getItem("restaurantMenu")
   
   );
   
   
   let categoryOptions = "";
   
   
   restaurantMenu.forEach(function(category){
   
       categoryOptions += `
   
       <option value="${category.category}">
   
       ${category.category}
   
       </option>
   
       `;
   
   });


    
    document.getElementById("admin-menu-container").innerHTML = `


    <h3>Add New Menu Item</h3>


    <label>
    Item Name:
    </label>

    <br>

    <input 
    type="text"
    id="itemName"
    placeholder="Enter item name"
    >


    <br><br>




    <label>
   Category:
   </label>
   
   <br>
   

   <select id="itemCategory">
   
   <option value="">
   Select Category
   </option>
   
   ${categoryOptions}
   
   </select>


    <br><br>


    <label>
    Price:
    </label>

    <br>

    <input 
    type="number"
    id="itemPrice"
    placeholder="Enter price"
    >


    <br><br>


    <label>
    Image URL:
    </label>

    <br>

    <input 
    type="text"
    id="itemImage"
    placeholder="Enter image URL"
    >


    <br><br>


    <button onclick="saveNewItem()">
    💾 Save Item
    </button>


    <button onclick="loadMenu()">
    ❌ Cancel
    </button>


    `;


}

/* ==========================================================
   SAVE NEW MENU ITEM

   PURPOSE:

   Saves a new menu item created from
   the Add New Item form.

   PROCESS:

   1. Read values entered by admin.
   2. Validate input.
   3. Find selected category.
   4. Add new item into that category.
   5. Save updated menu into Local Storage.
   6. Refresh admin menu table.

   ========================================================== */


function saveNewItem(){


    console.log("Save New Item button clicked");



    /* ======================================================
       GET VALUES FROM ADD ITEM FORM

       PURPOSE:

       Reads the values entered by administrator.

       ====================================================== */


    const itemName =

    document.getElementById("itemName").value.trim();



    const itemCategory =

    document.getElementById("itemCategory").value;



    const itemPrice =

    Number(

        document.getElementById("itemPrice").value

    );



    const itemImage =

    document.getElementById("itemImage").value.trim();




    /* ======================================================
       VALIDATION

       PURPOSE:

       Prevent empty or invalid data.

       ====================================================== */


    if(itemName === ""){


        alert("Please enter item name");


        return;


    }



    if(itemCategory === ""){


        alert("Please select category");


        return;


    }



    if(itemPrice <= 0){


        alert("Please enter valid price");


        return;


    }




    /* ======================================================
       LOAD EXISTING MENU

       PURPOSE:

       Gets latest menu data from Local Storage.

       ====================================================== */


    const restaurantMenu =

    JSON.parse(

        localStorage.getItem("restaurantMenu")

    );




    /* ======================================================
       FIND SELECTED CATEGORY

       PURPOSE:

       Finds where the new item should be added.

       ====================================================== */


    const selectedCategory =

    restaurantMenu.find(function(category){


        return category.category === itemCategory;


    });




    /* ======================================================
       CREATE NEW ITEM OBJECT

       PURPOSE:

       Creates the structure of a menu item.

       ====================================================== */


    const newItem = {


        id: Date.now(),


        name: itemName,


        price: itemPrice,


        discount: 0,


        image: itemImage


    };




    /* ======================================================
       ADD ITEM TO CATEGORY

       ====================================================== */


    selectedCategory.items.push(newItem);




    /* ======================================================
       SAVE UPDATED MENU

       PURPOSE:

       Stores new menu permanently.

       ====================================================== */


    localStorage.setItem(

        "restaurantMenu",

        JSON.stringify(restaurantMenu)

    );




    /* ======================================================
       RETURN TO ADMIN MENU TABLE

       ====================================================== */


    alert("New Item Added Successfully");


    displayAdminMenu();



}













