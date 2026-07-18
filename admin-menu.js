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
   ADD DEFAULT AVAILABILITY

   PURPOSE:
   Older menu items created before availability
   feature should automatically get:

   available: true

   so they work with customer menu filtering.

   ========================================================== */

let restaurantMenu = JSON.parse(
    localStorage.getItem("restaurantMenu")
);


restaurantMenu.forEach(function(category){

    category.items.forEach(function(item){

        if(item.available === undefined){

            item.available = true;

        }

    });

});


localStorage.setItem(
    "restaurantMenu",
    JSON.stringify(restaurantMenu)
);

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
   TABLE SORTING

   PURPOSE:
   Stores which column is currently sorted.

   direction

   asc  = Ascending

   desc = Descending

   ========================================================== */

let menuSort = {

    column: "",

    direction: "asc"

};

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
   
   
/* ==========================================================
   PREPARE MENU FOR DISPLAY

   PURPOSE:
   Menu items will be sorted after creating
   a single flat list of all menu items.

   ========================================================== */


   /* ==========================================================
      CREATE FLAT MENU LIST
   
      PURPOSE:
      Creates one list containing every menu item
      along with its category information.
   
      ========================================================== */
   
   let allMenuItems = [];
   

   restaurantMenu.forEach(function(category, categoryIndex){
   
       /* ======================================================
          EMPTY CATEGORY
   
          PURPOSE:
          Add a placeholder row so that an empty
          category is still displayed and can be
          deleted.
   
          ====================================================== */
   
       if(category.items.length === 0){
   
           allMenuItems.push({
   
               categoryIndex: categoryIndex,
   
               itemIndex: -1,
   
               category: category.category,
   
               item: null
   
           });
   
       }
   
       else{
   
           category.items.forEach(function(item, itemIndex){
   
               allMenuItems.push({
   
                   categoryIndex: categoryIndex,
   
                   itemIndex: itemIndex,
   
                   category: category.category,
   
                   item: item
   
               });
   
           });
   
       }
   
   });
   
   
   /* ==========================================================
      SORT FLAT LIST
   
      ========================================================== */
   
   allMenuItems.sort(compareMenuItems);
   

   let table = `
   
   
   <button
   
   onclick="showAddItemForm()"
   
   >
   
   ➕ Add New Item
   
   </button>
   
   
   <br><br>
   
   
   <!-- ==========================================================
        MENU SEARCH
   
        PURPOSE:
        Allows admin to quickly find menu items.
   
        Searches:
        - Item name
        - Category
        - Availability
        - Price
   
        ========================================================== -->
   
   <label>
   
   🔍 Search Menu:
   
   </label>
   
   
   <input
   
   type="text"
   
   id="menuSearch"
   
   placeholder="Search item, category, price..."
   
   onkeyup="searchAdminMenu()"
   
   >
   
   
   <br><br>
   
   <table border="1" width="100%">
   
   <tr>
   
   <th>Action</th>
   
   <th>S.No</th>
   
   <th>Image</th>
   

   <th
   style="cursor:pointer;"
   onclick="sortMenu('name')"
   >
   
   Item ▲▼
   
   </th>
   
   <th
   style="cursor:pointer;"
   onclick="sortMenu('category')"
   >
   
   Category ▲▼
   
   </th>
   
   <th>Category Action</th>
   
   <th>
   
   Available
   
   </th>
   
   <th
   style="cursor:pointer;"
   onclick="sortMenu('price')"
   >
   
   Price ▲▼
   
   </th>
   
   <th
   style="cursor:pointer;"
   onclick="sortMenu('discount')"
   >
   
   Discount ▲▼
   
   </th>

   <th
   style="cursor:pointer;"
   onclick="sortMenu('finalPrice')"
   >
   
   Final Price ▲▼
   
   </th>
   
   </tr>
   
   `;






/* ==========================================================
   DISPLAY ALL CATEGORIES

   PURPOSE:

   Shows every category.

   If a category has menu items,
   display one row for each item.

   If a category has NO menu items,
   display a single empty row so that
   the category can still be deleted.

   ========================================================== */

/* ==========================================================
   DISPLAY SORTED MENU ITEMS

   PURPOSE:
   Displays all menu items from the flat list.

   ========================================================== */

allMenuItems.forEach(function(menuRow){

    const categoryIndex = menuRow.categoryIndex;

    const itemIndex = menuRow.itemIndex;

    const category = restaurantMenu[categoryIndex];

   const item = menuRow.item;
   
   
   /* ======================================================
      EMPTY CATEGORY
   
      PURPOSE:
      Display a placeholder row so the category
      can still be deleted.
   
      ====================================================== */
   
   if(item === null){
   
       table += `
   
   <tr>
   
   <td>-</td>
   
   <td>-</td>
   
   <td>-</td>
   
   <td><i>No Items</i></td>
   
   <td>${category.category}</td>
   
   <td>
   
   <button
   type="button"
   onclick="deleteCategory(${categoryIndex})">
   
   🗑️
   
   </button>
   
   </td>
   
   <td>-</td>
   
   <td>-</td>
   
   <td>-</td>
   
   </tr>
   
   `;
   
       return;
   
   }
   
   
   let finalPrice =
   
   item.price -
   
   (item.price * item.discount / 100);
   
   let isEditing =
   
   editIndex !== null &&
   
   editIndex.categoryIndex === categoryIndex &&
   
   editIndex.itemIndex === itemIndex;
   
   table += `

<tr>

<td>

${

isEditing

?

`

<button onclick="saveMenuItem()">💾</button>

<button onclick="cancelEdit()">❌</button>

`

:

`

<button
type="button"
onclick="editMenuItem(${categoryIndex},${itemIndex})">

✏️

</button>

<button
type="button"
onclick="deleteMenuItem(${categoryIndex},${itemIndex})">

🗑️

</button>

`

}

</td>

<td>${item.id}</td>

<td>

<img src="${item.image}" width="60">

</td>

<td>

${

isEditing

?

`<input type="text" id="edit-name" value="${item.name}">`

:

item.name

}

</td>

<td>

${

isEditing

?

(() => {

let categoryOptions = "";

restaurantMenu.forEach(function(cat){

categoryOptions += `

<option value="${cat.category}"

${cat.category === category.category ? "selected" : ""}>

${cat.category}

</option>

`;

});

return `

<select id="edit-category">

${categoryOptions}

</select>

`;

})()

:

category.category

}

</td>


<td>

${

allMenuItems.findIndex(function(row){

    return row.categoryIndex === categoryIndex;

})

===

allMenuItems.indexOf(menuRow)

?

`

<button
type="button"
onclick="deleteCategory(${categoryIndex})">

🗑️

</button>

`

:

``

}

</td>


<td>

${

isEditing

?

`

<label>

<input
type="checkbox"
id="edit-available"

${item.available !== false ? "checked" : ""}

>

Available

</label>

`

:

item.available !== false

?

"✅ Available"

:

"❌ Unavailable"

}

</td>

<td>

${

isEditing

?

`<input type="number" id="edit-price" value="${item.price}">`

:

`₹${item.price}`

}

</td>

<td>

${

isEditing

?

`<input type="number" id="edit-discount" value="${item.discount}">`

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
table +=

"</table>";



adminContainer.innerHTML =

table;

console.log("Table Rendered");
   
}


/* ==========================================================
   SORT MENU

   PURPOSE:
   Sorts the menu based on the selected column.

   Clicking the same column again changes
   Ascending ↔ Descending.

   ========================================================== */

function sortMenu(column){

    if(menuSort.column === column){

        menuSort.direction =

        menuSort.direction === "asc"

        ?

        "desc"

        :

        "asc";

    }

    else{

        menuSort.column = column;

        menuSort.direction = "asc";

    }

    displayAdminMenu();

}



/* ==========================================================
   COMPARE MENU ITEMS

   PURPOSE:
   Used by JavaScript sort() to compare
   two menu items.

   ========================================================== */

function compareMenuItems(a, b){

    if(menuSort.column === ""){

        return 0;

    }

    let valueA;

    let valueB;

     switch(menuSort.column){
   
       case "name":
   
           valueA = a.item.name.toLowerCase();
   
           valueB = b.item.name.toLowerCase();
   
           break;
   
       case "category":
   
           valueA = a.category.toLowerCase();
   
           valueB = b.category.toLowerCase();
   
           break;
   
       case "price":
   
           valueA = a.item.price;
   
           valueB = b.item.price;
   
           break;
   
       case "discount":
   
           valueA = a.item.discount;
   
           valueB = b.item.discount;
   
           break;
   
       case "finalPrice":
   
           valueA =
   
           a.item.price -
   
           (a.item.price * a.item.discount / 100);
   
           valueB =
   
           b.item.price -
   
           (b.item.price * b.item.discount / 100);
   
           break;
   
       default:
   
           return 0;
   
   }

    if(valueA < valueB){

        return menuSort.direction === "asc"

            ? -1

            : 1;

    }

    if(valueA > valueB){

        return menuSort.direction === "asc"

            ? 1

            : -1;

    }

    return 0;

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

   const newCategory =

   document.getElementById("edit-category").value;
   const available =
   
   document.getElementById("edit-available").checked;


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
   CHECK CATEGORY CHANGE

   PURPOSE:

   If admin selects a different category,
   move the item to the new category.

   ====================================================== */


if(newCategory !== restaurantMenu[editIndex.categoryIndex].category){


    /* Remove item from old category */

    restaurantMenu

    [editIndex.categoryIndex]

    .items

    .splice(

        editIndex.itemIndex,

        1

    );


    /* Find new category */

    const targetCategory =

    restaurantMenu.find(function(cat){

        return cat.category === newCategory;

    });


    /* Add item to new category */

    targetCategory.items.push(item);


}



/* ======================================================
   UPDATE ITEM DETAILS

   ====================================================== */


item.name = itemName;

item.price = price;


item.discount = discount;

item.available = available;


    /* ======================================================
       UPDATE ITEM
       ====================================================== */

    item.name = itemName;

    item.price = price;

   item.discount = discount;
   
   item.available = available;


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
   




   <select 
   id="itemCategory"
   onchange="checkNewCategory()"
   >
   
   <option value="">
   Select Category
   </option>
   
   ${categoryOptions}
   
   <option value="NEW_CATEGORY">
   ➕ Add New Category
   </option>
   
   </select>
   
   
   <br><br>
   
   
   <div id="newCategoryBox"
   style="display:none;"
   >
   
   
   <label>
   New Category Name:
   </label>
   
   
   <br>
   
   
   <input
   type="text"
   id="newCategoryName"
   placeholder="Enter new category"
   >
   
   
   <br><br>
   
   
   <button
   type="button"
   onclick="saveNewCategory()"
   >
   💾 Save Category
   </button>
   
   
   </div>

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



    <button 
      type="button"
      onclick="displayAdminMenu()"
      >
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
   
       image: itemImage,
   
       /* ======================================================
          ITEM AVAILABILITY
   
          PURPOSE:
          Every newly added item is available
          by default.
   
          ====================================================== */
   
       available: true
   
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


/* ==========================================================
   DELETE MENU ITEM

   PURPOSE:

   Deletes a selected menu item.

   PROCESS:

   1. Ask admin for confirmation.
   2. Load current menu.
   3. Remove selected item.
   4. Save updated menu.
   5. Refresh admin table.

   ========================================================== */


function deleteMenuItem(categoryIndex, itemIndex){


    console.log(
        "Delete button clicked",
        categoryIndex,
        itemIndex
    );



    /* ======================================================
       LOAD CURRENT MENU

       PURPOSE:

       Gets latest menu data from Local Storage.

       ====================================================== */


    const restaurantMenu =

    JSON.parse(

        localStorage.getItem("restaurantMenu")

    );




    /* ======================================================
       GET ITEM NAME

       PURPOSE:

       Shows item name in confirmation message.

       ====================================================== */


    const itemName =

    restaurantMenu

    [categoryIndex]

    .items

    [itemIndex]

    .name;




    /* ======================================================
       CONFIRM DELETE

       PURPOSE:

       Prevent accidental deletion.

       ====================================================== */


    const confirmDelete =

    confirm(

        "Are you sure you want to delete " 
        + 
        itemName 
        +
        "?"

    );



    if(confirmDelete === false){


        return;


    }




    /* ======================================================
       DELETE ITEM

       PURPOSE:

       Removes item from category array.

       ====================================================== */


    restaurantMenu

    [categoryIndex]

    .items

    .splice(

        itemIndex,

        1

    );




    /* ======================================================
       SAVE UPDATED MENU

       ====================================================== */


    localStorage.setItem(

        "restaurantMenu",

        JSON.stringify(restaurantMenu)

    );




    /* ======================================================
       REFRESH TABLE

       ====================================================== */


    alert(
        itemName + " deleted successfully"
    );


    displayAdminMenu();



}



/* ==========================================================
   CHECK NEW CATEGORY SELECTION

   PURPOSE:

   Shows or hides the new category input box.

   When admin selects:

   ➕ Add New Category

   the input box becomes visible.

   ========================================================== */


function checkNewCategory(){


    const selectedCategory =

    document.getElementById("itemCategory").value;



    const newCategoryBox =

    document.getElementById("newCategoryBox");



    if(selectedCategory === "NEW_CATEGORY"){


        newCategoryBox.style.display = "block";


    }

    else{


        newCategoryBox.style.display = "none";


    }


}





/* ==========================================================
   SAVE NEW CATEGORY

   PURPOSE:

   Creates a new category and saves it.

   PROCESS:

   1. Read category name.
   2. Check empty name.
   3. Check duplicate category.
   4. Create category object.
   5. Save Local Storage.
   6. Reload Add Item form.

   ========================================================== */


function saveNewCategory(){



    console.log("Save New Category clicked");



    /* ======================================================
       GET CATEGORY NAME

       ====================================================== */


    const newCategoryName =

    document.getElementById("newCategoryName")
    .value
    .trim();




    if(newCategoryName === ""){


        alert("Please enter category name");


        return;


    }




    /* ======================================================
       LOAD MENU

       ====================================================== */


    const restaurantMenu =

    JSON.parse(

        localStorage.getItem("restaurantMenu")

    );




    /* ======================================================
       CHECK DUPLICATE CATEGORY

       ====================================================== */


    const categoryExists =

    restaurantMenu.some(function(category){


        return category.category.toLowerCase()

        ===

        newCategoryName.toLowerCase();


    });





    if(categoryExists){


        alert("Category already exists");


        return;


    }




    /* ======================================================
       CREATE NEW CATEGORY

       ====================================================== */


    restaurantMenu.push({

        category:newCategoryName,

        items:[]

    });





    /* ======================================================
       SAVE UPDATED MENU

       ====================================================== */


    localStorage.setItem(

        "restaurantMenu",

        JSON.stringify(restaurantMenu)

    );






   alert(
       "New Category Added Successfully"
   );
   
   /* ======================================================
      RELOAD FORM
      ====================================================== */
   
   showAddItemForm();
   
   /* ======================================================
      AUTO SELECT NEW CATEGORY
      ====================================================== */
   
   document.getElementById("itemCategory").value = newCategoryName;
   
   /* ======================================================
      HIDE NEW CATEGORY BOX
      ====================================================== */
   
   document.getElementById("newCategoryBox").style.display = "none";


}

/* ==========================================================
   DELETE CATEGORY

   PURPOSE:
   Deletes an empty category only.

   ========================================================== */

function deleteCategory(categoryIndex){

    const restaurantMenu =

    JSON.parse(

        localStorage.getItem("restaurantMenu")

    );
   console.log("Before delete:", restaurantMenu);
    console.log("Category Index:", categoryIndex);
    console.log("Category:", restaurantMenu[categoryIndex]);

    const category =

    restaurantMenu[categoryIndex];

    /* ======================================================
       CATEGORY HAS ITEMS
       ====================================================== */

    if(category.items.length > 0){

        let message =

        "Cannot delete category.\n\n";

        message +=

        "Category: " +

        category.category +

        "\n\n";

        message +=

        "This category contains:\n\n";

        category.items.forEach(function(item){

            message +=

            item.name +

            "\n";

        });

        alert(message);

        return;

    }

    /* ======================================================
       CONFIRM DELETE
       ====================================================== */

    if(

        confirm(

            'Delete category "' +

            category.category +

            '" ?'

        ) === false

    ){

        return;

    }

    /* ======================================================
       DELETE CATEGORY
       ====================================================== */

    restaurantMenu.splice(

        categoryIndex,

        1

    );

    localStorage.setItem(

        "restaurantMenu",

        JSON.stringify(restaurantMenu)

    );

    alert("Category deleted successfully.");

    displayAdminMenu();

}


/* ==========================================================
   SEARCH ADMIN MENU

   PURPOSE:
   Filters menu table rows while typing.

   ========================================================== */


function searchAdminMenu(){


    const searchValue =

    document.getElementById("menuSearch")

    .value

    .toLowerCase();



    const table =

    document.querySelector(

        "#admin-menu-container table"

    );



    const rows =

    table.getElementsByTagName("tr");



    for(let i = 1; i < rows.length; i++){


        const rowText =

        rows[i]

        .innerText

        .toLowerCase();



        if(

            rowText.includes(searchValue)

        ){

            rows[i].style.display = "";

        }

        else{

            rows[i].style.display = "none";

        }


    }


}





