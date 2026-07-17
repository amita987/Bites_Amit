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

const restaurantMenu =

JSON.parse(

    localStorage.getItem("restaurantMenu")

);

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



<!-- ==========================================================
     ACTION BUTTONS

     PURPOSE:
     Displays Edit and Delete buttons.

     FUTURE:
     - Edit button will enable editing.
     - Delete button will remove menu item.
     ========================================================== -->

<td>

<button onclick="editMenuItem(${item.id})">

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




/* ==========================================================
   EDIT MENU ITEM

   PURPOSE:
   Stores which menu item is being edited.

   CURRENT:
   Displays the selected Item ID.

   FUTURE:
   Opens the selected row in edit mode.
   ========================================================== */

function editMenuItem(itemId){

    editIndex = itemId;

    alert(

        "Edit Item ID : " + itemId

    );

}





