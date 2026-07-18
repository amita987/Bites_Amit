

/* ==========================================================
   LOAD RESTAURANT MENU

   PURPOSE:
   Loads restaurant menu from Local Storage.

   If Local Storage is empty,
   it falls back to menu-data.js.
   ========================================================== */

const menuContainer =

document.getElementById(

    "menu-container"

);


const restaurantMenu =

JSON.parse(

    localStorage.getItem("restaurantMenu")

)

||

menuData;



restaurantMenu.forEach(category => {


    /*
    ==========================================================
    FILTER UNAVAILABLE ITEMS

    PURPOSE:
    Hide menu items from customers when admin marks
    them as unavailable.

    LOGIC:
    available:false  = Hide item
    available:true   = Show item
    No available field = Show item (old items)
    ==========================================================
    */

    const availableItems = category.items.filter(item => {

        return item.available !== false;

    });


    /*
    ==========================================================
    SKIP EMPTY CATEGORIES

    PURPOSE:
    If all items in a category are unavailable,
    don't show the category heading.
    ==========================================================
    */

    if(availableItems.length === 0){

        return;

    }



    let html = `
        <h2>${category.category}</h2>

        <table border="1" cellpadding="10" cellspacing="0" width="100%">

            <tr>
                <th>S.No</th>
                <th>Image</th>
                <th>Item</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Final Price</th>
                <th>Quantity</th>
                <th>Add to Cart</th>
            </tr>
    `;

   
   availableItems.forEach(item => {

        const finalPrice =
            item.price - (item.price * item.discount / 100);

        html += `

        <tr>

            <td>${item.id}</td>

            <td>
                <img src="${item.image}" width="80">
            </td>

            <td>${item.name}</td>

            <td>₹${item.price}</td>

            <td>
                <span class="discount-badge">
                    ${item.discount}% OFF
                </span>
            </td>

            <td>₹${finalPrice}</td>

            <td>

                <button class="qty-btn" onclick="decreaseMenuQuantity(this)">−</button>

                <span class="quantity">1</span>

                <button class="qty-btn" onclick="increaseMenuQuantity(this)">+</button>

            </td>

            <td>

                <button
                   class="cart-btn"
                   onclick="addToCart(this)">
               
                   🛒 Add to Cart
               
               </button>

            </td>

        </tr>

        `;

    });

    html += "</table><br><br>";

    menuContainer.innerHTML += html;

});


/* ==========================================================
   QUANTITY FUNCTIONS

   Handles the + and − quantity buttons.
   ========================================================== */

function increaseMenuQuantity(button){

    const quantity =
        button.parentElement.querySelector(".quantity");

    quantity.textContent =
        Number(quantity.textContent) + 1;

}


function decreaseMenuQuantity(button){

    const quantity =
        button.parentElement.querySelector(".quantity");

    let value = Number(quantity.textContent);

    if(value > 1){

        quantity.textContent = value - 1;

    }

}


/* ==========================================================
   SEARCH CUSTOMER MENU

   PURPOSE:
   Searches menu items while typing.

   ========================================================== */

function searchCustomerMenu(){

    const searchValue =
    document.getElementById("menuSearch")
    .value
    .trim()
    .toLowerCase();

    const categoryHeadings =
    document.querySelectorAll("#menu-container h2");

    categoryHeadings.forEach(function(heading){

        const table = heading.nextElementSibling;

        const rows = table.querySelectorAll("tr");

        let foundItem = false;

        /* Keep table header visible */
        rows[0].style.display = "";

        for(let i = 1; i < rows.length; i++){

            const text =
            rows[i].textContent.toLowerCase();

            if(text.includes(searchValue)){

                rows[i].style.display = "";
                foundItem = true;

            }
            else{

                rows[i].style.display = "none";

            }

        }

        if(foundItem || searchValue === ""){

            heading.style.display = "";
            table.style.display = "";

        }
        else{

            heading.style.display = "none";
            table.style.display = "none";

        }

    });

}

   





