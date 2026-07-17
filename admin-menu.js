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



menuData.forEach(function(category){


    category.items.forEach(function(item){


        let finalPrice =

        item.price -

        (item.price * item.discount / 100);



        table += `

<tr>

<td>

✏️

🗑️

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
