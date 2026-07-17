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


const adminContainer =

document.getElementById(

    "admin-menu-container"

);

/* ==========================================================
   EDIT MODE

   PURPOSE:
   Stores which row is currently
   being edited.

   -1 means no row is being edited.
   ========================================================== */

let editIndex = -1;

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



        table += `

<tr>





<td>


<button

onclick="editMenuItem(${categoryIndex}, ${itemIndex})"

>

✏️

</button>

<button>

🗑️

</button>

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

${item.name}

</td>


<td>

${category.category}

</td>


<td>

₹${item.price}

</td>


<td>

${item.discount}%

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

}




/* ==========================================================
   EDIT MENU ITEM

   PURPOSE:
   Stores the selected menu item using
   Category Index and Item Index.

   FUTURE:
   This will enable editing of the selected row.
   ========================================================== */

function editMenuItem(categoryIndex, itemIndex){

    editIndex = {

        categoryIndex: categoryIndex,

        itemIndex: itemIndex

    };


    alert(

        "Category : " +

        categoryIndex +

        "\nItem : " +

        itemIndex

    );

}



